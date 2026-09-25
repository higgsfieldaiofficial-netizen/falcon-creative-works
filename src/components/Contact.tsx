import Reveal from './Reveal'

const PHONE_DISPLAY = '+91 78359 41665'
const PHONE_TEL = 'tel:+917835941665'
const EMAIL = 'falconmotionmediaofficial1@gmail.com'
const WHATSAPP = 'https://wa.me/917835941665'

export default function Contact() {
  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">Say hello</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="contact__title" id="contact-title">
            Let&rsquo;s make your product <em>famous.</em>
          </h2>
        </Reveal>

        <div className="contact-cards">
          <Reveal delay={120}>
            <a className="contact-card" href={PHONE_TEL}>
              <span className="contact-card__label">Call</span>
              <span className="contact-card__value">{PHONE_DISPLAY}</span>
              <span className="contact-card__hint">Mon–Sat, 10am–8pm IST</span>
            </a>
          </Reveal>
          <Reveal delay={200}>
            <a className="contact-card" href={`mailto:${EMAIL}`}>
              <span className="contact-card__label">Email</span>
              <span className="contact-card__value contact-card__value--small">{EMAIL}</span>
              <span className="contact-card__hint">Replies within a day</span>
            </a>
          </Reveal>
          <Reveal delay={280}>
            <a
              className="contact-card contact-card--accent"
              href={WHATSAPP}
              target="_blank"
              rel="noopener"
            >
              <span className="contact-card__label">WhatsApp</span>
              <span className="contact-card__value">Chat now</span>
              <span className="contact-card__hint">Fastest way to start</span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <p className="contact__owner">Falcon Creative Works — Naitik Kumar Sharma</p>
        </Reveal>
      </div>
    </section>
  )
}
