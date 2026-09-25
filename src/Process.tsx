import Reveal from './Reveal'

const STEPS = [
  { n: '01', title: 'Brief', desc: 'You send the product and the goal.' },
  { n: '02', title: 'Direction', desc: 'We script every shot, light and move.' },
  { n: '03', title: 'Craft', desc: 'AI production, graded like cinema.' },
  { n: '04', title: 'Delivery', desc: 'Feed-ready films, fast turnaround.' },
]

export default function Process() {
  return (
    <section className="section section--tint" id="process" aria-labelledby="process-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">How it works</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section__title" id="process-title">
            From brief to <em>blockbuster</em> in four steps.
          </h2>
        </Reveal>

        <ol className="process-grid">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <li className="process-step">
                <span className="process-step__num" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="process-step__title">{s.title}</h3>
                <p className="process-step__desc">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
