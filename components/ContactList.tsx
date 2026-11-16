import { Icon } from "./Icons";
import { site, telHref } from "@/lib/site";

/** Contact rows used in form asides; rows with no configured value are omitted. */
export function ContactList() {
  return (
    <ul className="contact-list">
      <li><Icon name="pin" /><span><small>Based in</small>Reno, Nevada — serving Northern Nevada, Tahoe &amp; destination events</span></li>
      {site.phoneDisplay && <li><Icon name="phone" /><span><small>Call / Text</small><a href={telHref()}>{site.phoneDisplay}</a></span></li>}
      {site.email && <li><Icon name="mail" /><span><small>Email</small><a href={`mailto:${site.email}`}>{site.email}</a></span></li>}
      {site.instagramEvents && (
        <li><Icon name="ig" /><span><small>Instagram</small><a href={site.instagramEvents} target="_blank" rel="noopener">Biggest Little Events Co</a></span></li>
      )}
      <li><Icon name="clock" /><span><small>Response Time</small>Custom proposals within 24–48 hours</span></li>
    </ul>
  );
}
