'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from './Icon';

type Props = {
  products: { name: string; flagship: boolean }[];
  email: string;
  // Optional form backend (Formspree, Getform, ...). Without it the form opens a pre-filled email.
  endpoint: string;
};

const NEEDS = [
  { id: 'Quotation', label: 'Quotation', icon: 'payments', desc: 'Pricing & commercial terms' },
  { id: 'COA', label: 'COA', icon: 'verified', desc: 'Certificate of Analysis' },
  { id: 'Sample', label: 'Evaluation Sample', icon: 'science', desc: 'Lab testing sample' },
  { id: 'Specification sheet', label: 'Specification Sheet', icon: 'description', desc: 'Technical data sheet' },
  { id: 'Technical dossier', label: 'Technical Dossier', icon: 'folder_zip', desc: 'Regulatory & quality pack' },
];

export default function EnquiryForm({ products, email, endpoint }: Props) {
  const [product, setProduct] = useState(products.find((p) => p.flagship)?.name ?? products[0]?.name);
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(['Quotation']);
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [sending, setSending] = useState(false);

  // Pre-select the product passed from a "Request quote" link (?product=...).
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('product');
    if (requested && products.some((p) => p.name === requested)) setProduct(requested);
  }, [products]);

  const toggleNeed = (id: string) => {
    setSelectedNeeds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setStatus(null);
    const form = ev.currentTarget;
    const data = new FormData(form);
    if (data.get('website')) return; // honeypot

    if (endpoint) {
      setSending(true);
      try {
        const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        setSelectedNeeds(['Quotation']);
        setStatus({
          kind: 'ok',
          text: 'Thank you! We have received your enquiry. Our sales and regulatory team will reply within one working day.',
        });
      } catch {
        setStatus({
          kind: 'err',
          text: `Sorry, the form could not be submitted. Please email directly to ${email} instead.`,
        });
      } finally {
        setSending(false);
      }
      return;
    }

    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company') || '-'}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || '-'}`,
      `Country: ${data.get('country') || '-'}`,
      `Product: ${data.get('product')}`,
      `Quantity: ${data.get('quantity') || '-'}`,
      `Requesting: ${data.getAll('needs').join(', ') || '-'}`,
      '',
      String(data.get('message') || ''),
    ].join('\n');
    const subject = `Enquiry: ${data.get('product')} (${data.get('company') || data.get('name')})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({
      kind: 'ok',
      text: `Your default email app will now open with this inquiry pre-filled. You can also write directly to ${email}.`,
    });
  }

  return (
    <div className="form-wrapper">
      <form className="inquiry-form-card" onSubmit={onSubmit} aria-label="Quotation and Sample Request Form">
        <div className="form-card-header">
          <div className="form-title-wrap">
            <span className="form-kicker">Fast Response Guaranteed</span>
            <h2 className="form-heading">Request a Quotation & Samples</h2>
            <p className="form-subheading">
              Complete the details below to receive factory pricing, batch COA, or laboratory evaluation samples.
            </p>
          </div>
        </div>

        {/* Section 1: Contact Details */}
        <div className="form-section">
          <div className="section-title">
            <span className="section-num">1</span>
            <span>Your Contact Information</span>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="f-name">
                Full Name <span className="req" aria-hidden="true">*</span>
              </label>
              <div className="input-wrap">
                <input
                  id="f-name"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-company">
                Company / Organization
              </label>
              <div className="input-wrap">
                <input
                  id="f-company"
                  name="company"
                  placeholder="e.g. NutraHealth Labs"
                  autoComplete="organization"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-email">
                Work Email <span className="req" aria-hidden="true">*</span>
              </label>
              <div className="input-wrap">
                <input
                  id="f-email"
                  name="email"
                  type="email"
                  required
                  placeholder="e.g. name@company.com"
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-phone">
                Phone / WhatsApp
              </label>
              <div className="input-wrap">
                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  placeholder="e.g. +1 (555) 019-2834"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-country">
                Destination Country
              </label>
              <div className="input-wrap">
                <input
                  id="f-country"
                  name="country"
                  placeholder="e.g. United States, Germany, India"
                  autoComplete="country-name"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="f-qty">
                Required Quantity
              </label>
              <div className="input-wrap">
                <input
                  id="f-qty"
                  name="quantity"
                  placeholder="e.g. 500 kg, 2 MT, 20ft FCL"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Product & Documentation Needs */}
        <div className="form-section">
          <div className="section-title">
            <span className="section-num">2</span>
            <span>Product & Documentation Needed</span>
          </div>

          <div className="form-field full-width">
            <label htmlFor="f-product">
              Selected Magnesium Compound <span className="req" aria-hidden="true">*</span>
            </label>
            <div className="select-wrap">
              <select
                id="f-product"
                name="product"
                required
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name} {p.flagship ? '★ (Flagship Chelated Grade)' : ''}
                  </option>
                ))}
                <option value="Other / several products">Multiple Products / Other Specification</option>
              </select>
              <span className="select-arrow" aria-hidden="true">
                <Icon name="expand_more" />
              </span>
            </div>
          </div>

          <div className="form-field full-width">
            <span className="field-group-label">Please provide me with:</span>
            <div className="chips-grid" role="group" aria-label="Requested documents and samples">
              {NEEDS.map((n) => {
                const isChecked = selectedNeeds.includes(n.id);
                return (
                  <label
                    key={n.id}
                    className={`chip-toggle ${isChecked ? 'is-checked' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleNeed(n.id);
                    }}
                  >
                    <input
                      type="checkbox"
                      name="needs"
                      value={n.id}
                      checked={isChecked}
                      onChange={() => {}}
                      className="hp-check"
                    />
                    <span className="chip-indicator" aria-hidden="true">
                      {isChecked ? <Icon name="check" /> : <Icon name={n.icon} />}
                    </span>
                    <span className="chip-text">
                      <span className="chip-label">{n.label}</span>
                      <span className="chip-desc">{n.desc}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section 3: Additional Notes */}
        <div className="form-section">
          <div className="section-title">
            <span className="section-num">3</span>
            <span>Specifications & Project Details</span>
          </div>

          <div className="form-field full-width">
            <label htmlFor="f-msg">
              Additional Details / Application Requirements
            </label>
            <div className="textarea-wrap">
              <textarea
                id="f-msg"
                name="message"
                rows={4}
                placeholder="Mention formulation application (tablets, capsules, drinks), preferred particle mesh size, custom packaging (fiber drums vs bags), target delivery port, or compliance requirements."
              />
            </div>
          </div>
        </div>

        {/* Honeypot field for bot protection */}
        <input className="hp" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        {/* Submit Bar */}
        <div className="form-submit-row">
          <button className="submit-btn" type="submit" disabled={sending}>
            <span className="submit-btn-text">
              {sending ? 'Processing Request…' : 'Submit Quotation Request'}
            </span>
            <span className="submit-btn-icon" aria-hidden="true">
              <Icon name="send" />
            </span>
          </button>
          
          <div className="privacy-note">
            <span className="privacy-icon" aria-hidden="true">
              <Icon name="lock" />
            </span>
            <span>Your information is strictly protected. Mutual NDA signed on request. No spam.</span>
          </div>
        </div>

        {status && (
          <div className={`form-feedback-banner ${status.kind}`} role="status" aria-live="polite">
            <span className="feedback-icon" aria-hidden="true">
              <Icon name={status.kind === 'ok' ? 'check_circle' : 'error'} />
            </span>
            <div className="feedback-body">
              <p className="feedback-text">{status.text}</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
