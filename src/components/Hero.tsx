import { useRef, useState } from 'react'
import Reveal from './Reveal'

const WHATSAPP = 'https://wa.me/917835941665'

const STATS = [
  { value: '10+', label: 'brands' },
  { value: '3', label: 'signature formats' },
  { value: '100%', label: 'AI-crafted' },
]

function Showreel() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [muted, setMuted] = useState(true)

  const toggleMute = () => {
    const next = !muted
    setMuted(next)
    if (videoRef.current) videoRef.current.muted = next
  }

  return (
    <figure className="showreel">
      <div className="showreel__screen">
        <video
          ref={(v) => {
            videoRef.current = v
            if (v) v.muted = true
          }}
          className="showreel__video"
          src="/videos/product/product-05.mp4"
          poster="/posters/product-05.jpg"
          autoPlay
          muted
          loop
          playsInline
          aria-label="Falcon Creative Works showreel"
        />
        <span className="showreel__grain" aria-hidden="true" />
        <button
          type="button"
          className="showreel__mute"
          onClick={toggleMute}
          aria-label={muted ? 'Unmute showreel' : 'Mute showreel'}
          aria-pressed={!muted}
        >
          {muted ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M4 9v6h4l5 4V5L8 9H4Z"
                fill="currentColor"
              />
              <path
                d="m16.5 9.5 5 5m0-5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 9v6h4l5 4V5L8 9H4Z" fill="currentColor" />
              <path
                d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
        <span className="showreel__stamp" aria-hidden="true">
          Falcon Creative Works · Showreel
        </span>
      </div>
      <figcaption className="showreel__caption">Showreel — Falcon Creative Works</figcaption>
    </figure>
  )
}

const FLOATERS = [
  {
    src: '/videos/product/product-03.mp4',
    poster: '/posters/product-03.jpg',
    label: 'Product films',
    cls: 'float-card--a',
  },
  {
    src: '/videos/ugc/ugc-03.mp4',
    poster: '/posters/ugc-03.jpg',
    label: 'AI UGC',
    cls: 'float-card--b',
  },
  {
    src: '/videos/ugc/ugc-01.mp4',
    poster: '/posters/ugc-01.jpg',
    label: 'UGC ads',
    cls: 'float-card--c',
  },
]

function Collage() {
  return (
    <div className="hero__collage" aria-hidden="true">
      {FLOATERS.map((f) => (
        <div key={f.src} className={`float-card ${f.cls}`}>
          <video
            src={f.src}
            poster={f.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            tabIndex={-1}
          />
          <span className="float-card__tag">{f.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero__top">
          <div className="hero__copy">
            <Reveal>
              <p className="eyebrow">AI Video Studio — for brands that move</p>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="hero__mega" id="hero-title">
                <span className="mega-line">Scroll-stopping</span>
                <span className="mega-line mega-outline">AI films</span>
                <span className="mega-line mega-accent">that sell.</span>
              </h1>
            </Reveal>

            <Reveal delay={170}>
              <p className="hero__sub">
                Falcon Creative Works crafts cinematic product films, property walkthroughs and AI
                UGC ads — made to make people stop.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="hero__ctas">
                <a className="btn btn--large" href="#work">
                  See the work
                </a>
                <a
                  className="btn btn--large btn--outline"
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener"
                >
                  WhatsApp us
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <Collage />
          </Reveal>
        </div>

        <Reveal delay={300}>
          <Showreel />
        </Reveal>

        <Reveal delay={120}>
          <div className="hero__stats">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <span className="stat__value">{s.value}</span>
                <span className="stat__label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
