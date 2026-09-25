import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

type VideoItem = {
  id: string
  title: string
  /** true → tall 9:16 reels-style card; false → 16:9 landscape card */
  vertical: boolean
}

type Category = {
  key: string
  label: string
  dir: string
  items: VideoItem[]
}

const CATEGORIES: Category[] = [
  {
    key: 'product',
    label: 'Product Films',
    dir: 'product',
    items: [
      { id: 'product-01', title: 'Yogabar — Visual Reimagine', vertical: true },
      { id: 'product-02', title: 'Product Launch Cut', vertical: true },
      { id: 'product-03', title: 'Studio Product Spot', vertical: true },
      { id: 'product-04', title: 'One-Image Product Film', vertical: true },
      { id: 'product-05', title: 'Ad With Behind-the-Scenes', vertical: false },
    ],
  },
  {
    key: 'property',
    label: 'Property Walkthroughs',
    dir: 'property',
    items: [
      { id: 'property-01', title: 'Weybridge Family Home', vertical: true },
      { id: 'property-02', title: 'AI Real-Estate Film', vertical: true },
      { id: 'property-03', title: 'Images to Moving House', vertical: true },
      { id: 'property-04', title: 'Listing Breakdown', vertical: true },
      { id: 'property-05', title: 'Standout Listing Video', vertical: true },
    ],
  },
  {
    key: 'ugc',
    label: 'AI UGC Ads',
    dir: 'ugc',
    items: [
      { id: 'ugc-01', title: 'AI UGC at Scale', vertical: false },
      { id: 'ugc-02', title: 'Product Visual Worlds', vertical: false },
      { id: 'ugc-03', title: 'Skincare UGC Ad', vertical: true },
      { id: 'ugc-04', title: 'Realism Engine v5.1', vertical: true },
      { id: 'ugc-05', title: 'AI UGC for Avocado AI', vertical: true },
    ],
  },
]

type VideoCardProps = {
  item: VideoItem
  dir: string
  index: number
  active: boolean
  onPlay: () => void
}

function VideoCard({ item, dir, index, active, onPlay }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const num = String(index + 1).padStart(2, '0')

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (active) {
      v.play().catch(() => {
        /* autoplay blocked — user can press play on native controls */
      })
    } else {
      v.pause()
    }
  }, [active])

  return (
    <figure className={`work-card${item.vertical ? ' work-card--tall' : ' work-card--wide'}`}>
      <div className="work-card__screen">
        <video
          ref={videoRef}
          className="work-card__video"
          src={`/videos/${dir}/${item.id}.mp4`}
          poster={`/posters/${item.id}.jpg`}
          preload="none"
          playsInline
          controls={active}
          aria-label={item.title}
        />
        {!active && (
          <button
            type="button"
            className="work-card__overlay"
            onClick={onPlay}
            aria-label={`Play ${item.title}`}
          >
            <span className="work-card__num" aria-hidden="true">
              {num}
            </span>
            <span className="work-card__play" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
              </svg>
            </span>
            <span className="work-card__badge" aria-hidden="true">
              {item.vertical ? '9:16' : '16:9'}
            </span>
          </button>
        )}
      </div>
      <figcaption className="work-card__meta">
        <span className="work-card__meta-num" aria-hidden="true">
          {num}
        </span>
        <span className="work-card__meta-title">{item.title}</span>
      </figcaption>
    </figure>
  )
}

export default function Work() {
  const [catKey, setCatKey] = useState('product')
  const [activeId, setActiveId] = useState<string | null>(null)

  const category = CATEGORIES.find((c) => c.key === catKey)
  if (!category) return null

  const selectCategory = (key: string) => {
    setCatKey(key)
    setActiveId(null)
  }

  return (
    <section className="section" id="work" aria-labelledby="work-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The work</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section__title" id="work-title">
            Selected <em>work.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="section__sub">
            Real films, crafted with AI — pick a format and press play.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="work-tabs" role="tablist" aria-label="Work categories">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={c.key === catKey}
                className={`work-tab${c.key === catKey ? ' work-tab--active' : ''}`}
                onClick={() => selectCategory(c.key)}
              >
                {c.label}
                <span className="work-tab__count" aria-hidden="true">
                  {c.items.length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="work-grid" key={catKey} role="tabpanel" aria-label={category.label}>
          {category.items.map((item, i) => (
            <Reveal
              key={item.id}
              delay={(i % 3) * 90}
              className={item.vertical ? '' : 'work-card--span'}
            >
              <VideoCard
                item={item}
                dir={category.dir}
                index={i}
                active={activeId === item.id}
                onPlay={() => setActiveId(item.id)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
