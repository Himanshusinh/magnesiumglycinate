import { Icon } from './Icon';
import type { Site } from '@/lib/data';

type Props = {
  site: Site;
};

export default function ContactSidebar({ site }: Props) {
  return (
    <aside className="contact-sidebar" aria-label="Contact information and facilities">
      {/* 1. Direct Sales & Technical Support Card */}
      <div className="contact-card">
        <div className="contact-card-head">
          <span className="contact-card-badge">Direct Communication</span>
          <h2 className="contact-card-title">Commercial & Tech Desk</h2>
          <p className="contact-card-desc">Reach out directly to our sales and technical team for prompt assistance.</p>
        </div>

        <div className="contact-channels">
          <a href={`tel:${site.phoneIntl}`} className="contact-channel-row" title="Call our sales office">
            <span className="channel-icon-wrap" aria-hidden="true">
              <Icon name="call" />
            </span>
            <div className="channel-info">
              <span className="channel-tag">Direct Phone</span>
              <span className="channel-text">{site.phone}</span>
              <span className="channel-sub">Mon to Sat · From 9:30 AM IST</span>
            </div>
            <span className="channel-arrow" aria-hidden="true">
              <Icon name="arrow_forward" />
            </span>
          </a>

          <a href={`mailto:${site.email}`} className="contact-channel-row" title="Email our sales team">
            <span className="channel-icon-wrap" aria-hidden="true">
              <Icon name="mail" />
            </span>
            <div className="channel-info">
              <span className="channel-tag">Direct Email</span>
              <span className="channel-text">{site.email}</span>
              <span className="channel-sub">Reply usually within 1 business day</span>
            </div>
            <span className="channel-arrow" aria-hidden="true">
              <Icon name="arrow_forward" />
            </span>
          </a>

          {site.whatsapp && (
            <a
              href={`https://wa.me/${site.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-channel-row whatsapp"
              title="Chat on WhatsApp"
            >
              <span className="channel-icon-wrap whatsapp-bg" aria-hidden="true">
                <Icon name="chat" />
              </span>
              <div className="channel-info">
                <span className="channel-tag">WhatsApp Business</span>
                <span className="channel-text">{site.whatsapp}</span>
                <span className="channel-sub">Quick instant messaging</span>
              </div>
              <span className="channel-arrow" aria-hidden="true">
                <Icon name="arrow_forward" />
              </span>
            </a>
          )}
        </div>
      </div>

      {/* 2. Global Locations & Warehouses */}
      <div className="contact-card">
        <div className="contact-card-head">
          <span className="contact-card-badge">Global Presence</span>
          <h2 className="contact-card-title">Facilities & Warehouses</h2>
        </div>

        <div className="facility-stack">
          {site.addresses.map((a) => {
            const isUS = a.label.toLowerCase().includes('usa');
            const isPlant = a.label.toLowerCase().includes('plant');
            const icon = isUS ? 'warehouse' : isPlant ? 'factory' : 'apartment';
            const badge = isUS ? 'USA Stock' : isPlant ? 'GMP Facility' : 'Headquarters';

            return (
              <div key={a.label} className={`facility-box ${isUS ? 'us-highlight' : ''}`}>
                <div className="facility-header">
                  <span className="facility-icon-wrap" aria-hidden="true">
                    <Icon name={icon} />
                  </span>
                  <div className="facility-title-group">
                    <span className="facility-label">{a.label}</span>
                    <span className={`facility-badge ${isUS ? 'badge-us' : ''}`}>{badge}</span>
                  </div>
                </div>
                <p className="facility-address">{a.text}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Manufacturer Assurance Card */}
      <div className="contact-card trust-card">
        <div className="trust-card-head">
          <span className="trust-icon" aria-hidden="true">
            <Icon name="verified_user" />
          </span>
          <div>
            <h3 className="trust-title">Why Source Direct From Us?</h3>
            <p className="trust-subtitle">Manufacturer of pure chelated minerals since 1992</p>
          </div>
        </div>

        <ul className="trust-checklist">
          <li>
            <span className="check-icon" aria-hidden="true">
              <Icon name="check_circle" />
            </span>
            <span>
              <strong>Guaranteed High Purity:</strong> USP / EP / FCC compliant with batch COA.
            </span>
          </li>
          <li>
            <span className="check-icon" aria-hidden="true">
              <Icon name="check_circle" />
            </span>
            <span>
              <strong>Fast Sample Dispatch:</strong> Evaluation samples for lab testing and qualification.
            </span>
          </li>
          <li>
            <span className="check-icon" aria-hidden="true">
              <Icon name="check_circle" />
            </span>
            <span>
              <strong>Flexible Logistics:</strong> Direct factory export or immediate stock from Florida, USA.
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
