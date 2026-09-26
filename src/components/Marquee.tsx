const WORDS = ['Product films', 'AI UGC ads', 'Property walkthroughs', 'Cinematic grade']

function Chunk({ hidden = false }: { hidden?: boolean }) {
  return (
    <span className="marquee__chunk" aria-hidden={hidden || undefined}>
      {Array.from({ length: 3 }).flatMap((_, r) =>
        WORDS.map((w, i) => (
          <span key={`${r}-${i}`}>
            {w} <i>✦</i>
          </span>
        )),
      )}
    </span>
  )
}

export default function Marquee() {
  return (
    <div className="marquee" role="presentation">
      <div className="marquee__track">
        <Chunk />
        <Chunk hidden />
      </div>
    </div>
  )
}
