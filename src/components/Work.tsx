import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

type VideoItem = {
  id: string
  title: string
  /** true → tall 9:16 reels-style; false → 16:9 landscape */
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

function Stage({ item, dir, num }: { item: VideoItem; dir: string; num: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    videoRef.current?.play().catch(() => {
      /* autoplay with sound blocked — user presses play */
    })
  }, [item.id])

  return (
    <div className="work-stage">
      <div className={`work-stage__screen${item.vertical ? ' is-vertical' : ' is-wide'}`}>
        <video
          ref={videoRef}
          className="work-stage__video"
          src={`/videos/${dir}/${item.id}.mp4`}
          poster={`/posters/${item.id}.jpg`}
          preload="metadata"
          playsInline
          controls
          aria-label={item.title}
        />
      </div>
      <div className="work-stage__meta">
        <span className="work-stage__num" aria-hidden="true">
          {num}
        </span>
        <span className="work-stage__title">{item.title}</span>
        <span className="work-stage__badge" aria-hidden="true">
          {item.vertical ? '9:16' : '16:9'}
        </span>
      </div>
    </div>
  )
}

export default function Work() {
  const [catKey, setCatKey] = useState('product')
  const [activeId, setActiveId] = useState<string>(CATEGORIES[0].items[0].id)

  const category = CATEGORIES.find((c) => c.key === catKey)
  if (!category) return null

  const selectCategory = (key: string) => {
    const next = CATEGORIES.find((c) => c.key === key)
    if (!next) return
    setCatKey(key)
    setActiveId(next.items[0].id)
  }

  const activeIndex = Math.max(
    0,
    category.items.findIndex((i) => i.id === activeId),
  )
  const activeItem = category.items[activeIndex]

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
          <p className="section__sub">Real films, crafted with AI — tap a film to play it big.</p>
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

        <div className="work-showcase">
          <Stage
            key={`${catKey}-${activeItem.id}`}
            item={activeItem}
            dir={category.dir}
            num={String(activeIndex + 1).padStart(2, '0')}
          />

          <Reveal delay={120} className="work-thumbs-wrap">
            <div
              className="work-thumbs"
              role="listbox"
              aria-label={`${category.label} — pick a film`}
            >
              {category.items.map((item, i) => {
                const selected = item.id === activeItem.id
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={`work-thumb${item.vertical ? ' work-thumb--tall' : ''}${
                      selected ? ' work-thumb--active' : ''
                    }`}
                    onClick={() => setActiveId(item.id)}
                  >
                    <span className="work-thumb__screen">
                      <img
                        src={`/posters/${item.id}.jpg`}
                        alt=""
                        loading="lazy"
                        aria-hidden="true"
                      />
                      <span className="work-thumb__num" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="work-thumb__play" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
                        </svg>
                      </span>
                    </span>
                    <span className="work-thumb__title">{item.title}</span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
