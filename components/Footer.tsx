import Link from "next/link";
import { Icon } from "./Icons";
import { site, telHref } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src="/assets/img/logo-badge.jpg" alt="Biggest Little Events Co badge logo" width={120} height={120} loading="lazy" />
            <p>
              Premium event decor rentals, tables &amp; chairs, professional DJ entertainment and white-glove hospitality —
              flawlessly synchronized under one roof in Reno, Nevada.
            </p>
            <div className="socials">
              {site.instagramEvents && (
                <a href={site.instagramEvents} target="_blank" rel="noopener" aria-label="Biggest Little Events Co on Instagram"><Icon name="ig" /></a>
              )}
              <a href={site.instagramDj} target="_blank" rel="noopener" aria-label="DJ Weezy on Instagram"><Icon name="ig" /></a>
              <a href={site.soundcloudDj} target="_blank" rel="noopener" aria-label="WEEZYBEATS on SoundCloud"><Icon name="sc" /></a>
              <a href={site.yelp} target="_blank" rel="noopener" aria-label="Biggest Little Events Co reviews on Yelp" title="Read our reviews on Yelp"><Icon name="star" /></a>
              <a href={site.tiktok} target="_blank" rel="noopener" aria-label="DJ Weezy (@theweezy) on TikTok" title="Follow @theweezy on TikTok"><Icon name="note" /></a>
            </div>
          </div>
          <div>
            <h4>Experiences</h4>
            <ul>
              <li><Link href="/services#rentals">Rentals &amp; Decor</Link></li>
              <li><Link href="/services#tables-chairs">Tables &amp; Chairs</Link></li>
              <li><Link href="/dj">Professional DJ</Link></li>
              <li><Link href="/services#bartending">Bartending Staff</Link></li>
              <li><Link href="/services#catering">Catering Coordination</Link></li>
              <li><Link href="/#vip">VIP Black Table Service</Link></li>
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li><Link href="/#lookbook">Lookbook</Link></li>
              <li><Link href="/#process">How It Works</Link></li>
              <li><Link href="/#faq">FAQ</Link></li>
              <li><Link href="/contact">Request a Proposal</Link></li>
              <li><Link href="/contact#dj">Book a DJ</Link></li>
            </ul>
          </div>
          <div>
            <h4>Reach Us</h4>
            <ul>
              <li>Reno, Nevada</li>
              <li>Serving Reno · Sparks · Lake Tahoe · Carson City &amp; beyond</li>
              {site.phoneDisplay && <li><a href={telHref()}>{site.phoneDisplay}</a></li>}
              {site.email && <li><a href={`mailto:${site.email}`}>{site.email}</a></li>}
            </ul>
            <Link className="btn mt-[1.2rem]" href="/contact">Request My Proposal</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} Biggest Little Events Co · Reno, NV</span>
          <span>Tables · Chairs · Events</span>
        </div>
      </div>
    </footer>
  );
}
