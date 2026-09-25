import Reveal from './Reveal'

type Service = {
  n: string
  title: string
  desc: string
  tags: string[]
}

const SERVICES: Service[] = [
  {
    n: '01',
    title: 'Cinematic product films',
    desc: 'Studio-grade light, macro detail and impossible camera moves — a whole world built around your product.',
    tags: ['Hero product film', 'Launch teaser', 'Amazon/listing video'],
  },
  {
    n: '02',
    title: 'Property walkthroughs',
    desc: 'One fluid camera gliding through every room — a tour that feels like a film.',
    tags: ['Full walkthrough', 'Exterior reveal', 'Room highlights'],
  },
  {
    n: '03',
    title: 'AI UGC ads',
    desc: 'Realistic creator-style ads with natural performances — made for the feed.',
    tags: ['Testimonial style', 'Unboxing', 'Hook variations'],
  },
]

export default function Services() {
  return (
    <section className="section section--tint" id="services" aria-labelledby="services-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">What we make</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section__title" id="services-title">
            Three formats. One <em>cinematic</em> standard.
          </h2>
        </Reveal>

        <div className="services">
          {SERVICES.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <article className="service-row">
                <span className="service-row__num" aria-hidden="true">
                  {s.n}
                </span>
                <div className="service-row__body">
                  <h3 className="service-row__title">{s.title}</h3>
                  <p className="service-row__desc">{s.desc}</p>
                  <ul className="tag-list" aria-label={`Deliverables for ${s.title}`}>
                    {s.tags.map((t) => (
                      <li key={t} className="tag">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
