const PHRASE = 'Product films \u2726 AI UGC ads \u2726 Property walkthroughs \u2726 Cinematic grade \u2726 '
const CHUNK = PHRASE.repeat(3)

export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        <span className="marquee__chunk">{CHUNK}</span>
        <span className="marquee__chunk" aria-hidden="true">
          {CHUNK}
        </span>
      </div>
    </div>
  )
}
