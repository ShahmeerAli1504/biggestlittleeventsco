// Package mailer sends email through Gmail SMTP (or any STARTTLS/implicit-TLS
// SMTP server) using only the Go standard library.
//
// Gmail setup: turn on 2-Step Verification for the Google account, then create
// an App Password (Google Account → Security → App passwords) and use it as
// GMAIL_APP_PASSWORD. Your normal Google password will not work.
package mailer

import (
	"bytes"
	"crypto/rand"
	"crypto/tls"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"mime"
	"mime/quotedprintable"
	"net"
	"net/mail"
	"net/smtp"
	"os"
	"strings"
	"time"
)

// Config holds SMTP connection settings.
type Config struct {
	Host     string // smtp.gmail.com
	Port     string // 587 (STARTTLS) or 465 (implicit TLS)
	Username string // full Gmail address
	Password string // Gmail App Password
	FromName string // display name on outgoing mail
	Timeout  time.Duration
}

// FromEnv reads GMAIL_USER / GMAIL_APP_PASSWORD (+ optional SMTP_HOST, SMTP_PORT, MAIL_FROM_NAME).
func FromEnv() (Config, error) {
	c := Config{
		Host:     envOr("SMTP_HOST", "smtp.gmail.com"),
		Port:     envOr("SMTP_PORT", "587"),
		Username: strings.TrimSpace(os.Getenv("GMAIL_USER")),
		// Google displays app passwords in groups of four; spaces are not part of it.
		Password: strings.ReplaceAll(strings.TrimSpace(os.Getenv("GMAIL_APP_PASSWORD")), " ", ""),
		FromName: envOr("MAIL_FROM_NAME", "Biggest Little Events Co"),
		Timeout:  8 * time.Second, // stay well inside the serverless execution limit
	}
	if c.Username == "" || c.Password == "" {
		return c, errors.New("mailer: GMAIL_USER and GMAIL_APP_PASSWORD must be set")
	}
	return c, nil
}

// Message is a single email with a plain-text and HTML body.
type Message struct {
	To      []string
	ReplyTo string
	Subject string
	Text    string
	HTML    string
}

// Send delivers msg. The From address is always the authenticated account,
// which is what Gmail requires.
func Send(c Config, msg Message) error {
	if len(msg.To) == 0 {
		return errors.New("mailer: no recipients")
	}
	for _, addr := range append(append([]string{}, msg.To...), msg.ReplyTo) {
		if strings.ContainsAny(addr, "\r\n") {
			return errors.New("mailer: invalid address")
		}
	}

	raw, err := build(c, msg)
	if err != nil {
		return err
	}

	addr := net.JoinHostPort(c.Host, c.Port)
	dialer := &net.Dialer{Timeout: c.Timeout}
	tlsCfg := &tls.Config{ServerName: c.Host, MinVersion: tls.VersionTLS12}

	var conn net.Conn
	if c.Port == "465" {
		conn, err = tls.DialWithDialer(dialer, "tcp", addr, tlsCfg)
	} else {
		conn, err = dialer.Dial("tcp", addr)
	}
	if err != nil {
		return fmt.Errorf("mailer: dial: %w", err)
	}
	_ = conn.SetDeadline(time.Now().Add(c.Timeout))

	client, err := smtp.NewClient(conn, c.Host)
	if err != nil {
		conn.Close()
		return fmt.Errorf("mailer: client: %w", err)
	}
	defer client.Close()

	if c.Port != "465" {
		if ok, _ := client.Extension("STARTTLS"); !ok {
			return errors.New("mailer: server does not support STARTTLS")
		}
		if err := client.StartTLS(tlsCfg); err != nil {
			return fmt.Errorf("mailer: starttls: %w", err)
		}
	}
	if err := client.Auth(smtp.PlainAuth("", c.Username, c.Password, c.Host)); err != nil {
		return fmt.Errorf("mailer: auth (check GMAIL_USER / GMAIL_APP_PASSWORD): %w", err)
	}
	if err := client.Mail(c.Username); err != nil {
		return fmt.Errorf("mailer: MAIL FROM: %w", err)
	}
	for _, to := range msg.To {
		if err := client.Rcpt(to); err != nil {
			return fmt.Errorf("mailer: RCPT TO: %w", err)
		}
	}
	w, err := client.Data()
	if err != nil {
		return fmt.Errorf("mailer: DATA: %w", err)
	}
	if _, err := w.Write(raw); err != nil {
		return fmt.Errorf("mailer: write: %w", err)
	}
	if err := w.Close(); err != nil {
		return fmt.Errorf("mailer: close data: %w", err)
	}
	return client.Quit()
}

// build renders an RFC 5322 multipart/alternative message.
func build(c Config, msg Message) ([]byte, error) {
	boundary := "ble-" + randHex(12)
	from := mail.Address{Name: c.FromName, Address: c.Username}
	domain := "gmail.com"
	if i := strings.LastIndex(c.Username, "@"); i >= 0 {
		domain = c.Username[i+1:]
	}

	var b bytes.Buffer
	h := func(k, v string) { fmt.Fprintf(&b, "%s: %s\r\n", k, v) }
	h("From", from.String())
	h("To", strings.Join(msg.To, ", "))
	if msg.ReplyTo != "" {
		h("Reply-To", msg.ReplyTo)
	}
	h("Subject", mime.QEncoding.Encode("utf-8", msg.Subject))
	h("Date", time.Now().Format(time.RFC1123Z))
	h("Message-ID", fmt.Sprintf("<%s@%s>", randHex(16), domain))
	h("MIME-Version", "1.0")
	h("Content-Type", fmt.Sprintf(`multipart/alternative; boundary="%s"`, boundary))
	b.WriteString("\r\n")

	for _, part := range []struct{ ctype, body string }{
		{"text/plain; charset=UTF-8", msg.Text},
		{"text/html; charset=UTF-8", msg.HTML},
	} {
		if part.body == "" {
			continue
		}
		fmt.Fprintf(&b, "--%s\r\nContent-Type: %s\r\nContent-Transfer-Encoding: quoted-printable\r\n\r\n", boundary, part.ctype)
		qp := quotedprintable.NewWriter(&b)
		if _, err := qp.Write([]byte(part.body)); err != nil {
			return nil, err
		}
		if err := qp.Close(); err != nil {
			return nil, err
		}
		b.WriteString("\r\n")
	}
	fmt.Fprintf(&b, "--%s--\r\n", boundary)
	return b.Bytes(), nil
}

func randHex(n int) string {
	buf := make([]byte, n)
	if _, err := rand.Read(buf); err != nil {
		return base64.RawURLEncoding.EncodeToString([]byte(time.Now().String()))
	}
	return hex.EncodeToString(buf)
}

func envOr(k, def string) string {
	if v := strings.TrimSpace(os.Getenv(k)); v != "" {
		return v
	}
	return def
}
