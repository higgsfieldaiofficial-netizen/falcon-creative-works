import Reveal from './Reveal'
import { useCountUp, useInViewOnce } from '../hooks'

type Brand = {
  name: string
  handle: string
  category: string
  /** follower count in thousands, e.g. 43 -> "43K" */
  followersK: number
  file: string
}

const BRANDS: Brand[] = [
  { name: 'Arctic Cool', handle: '@arcticcoolgear', category: 'cooling apparel', followersK: 43, file: 'arcticcoolgear.jpg' },
  { name: 'Vibriance', handle: '@vibriance', category: 'skincare', followersK: 13, file: 'vibriance.jpg' },
  { name: 'SpotOn Fence', handle: '@spotonfence', category: 'pet GPS fence', followersK: 24, file: 'spotonfence.jpg' },
  { name: 'Bumzzy Co', handle: '@bumzzy.co', category: "men's grooming", followersK: 24, file: 'bumzzy.co.jpg' },
  { name: 'Gateron Switch', handle: '@gateron.switch', category: 'gaming keyboards', followersK: 31, file: 'gateron.switch.jpg' },
  { name: 'Lettoria', handle: '@lettoria.handbags', category: 'leather handbags', followersK: 49, file: 'lettoria.handbags.jpg' },
  { name: 'Breescape', handle: '@breescapehome', category: 'cooling bedding', followersK: 19, file: 'breescapehome.jpg' },
  { name: 'Scentify', handle: '@scentifynyc', category: 'home fragrance diffusers', followersK: 18, file: 'scentifynyc.jpg' },
  { name: 'Spin360 Fan', handle: '@spin360_fan', category: 'airflow fan', followersK: 30, file: 'spin360_fan.jpg' },
  { name: 'Emmafy', handle: '@emmafy.official', category: 'quilted bags', followersK: 30, file: 'emmafy.official.jpg' },
]

function BrandCard({ brand, index }: { brand: Brand; index: number }) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.3)
  const count = useCountUp(brand.followersK, inView)

  return (
    <div
      ref={ref}
      className={`brand-card${inView ? ' is-visible' : ''}`}
      style={{ transitionDelay: `${(index % 5) * 70}ms` }}
    >
      <img
        className="brand-card__pic"
        src={`/trusted-by/${brand.file}`}
        alt={`${brand.name} — ${brand.category} brand profile photo`}
        loading="lazy"
        width={88}
        height={88}
      />
      <h3 className="brand-card__name">{brand.name}</h3>
      <p className="brand-card__handle">{brand.handle}</p>
      <p className="brand-card__category">{brand.category}</p>
      <p className="brand-card__followers" aria-label={`${brand.followersK}K followers`}>
        <span aria-hidden="true">
          {count}K
        </span>
      </p>
    </div>
  )
}

export default function Brands() {
  return (
    <section className="section" id="brands" aria-labelledby="brands-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow">The proof</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="section__title" id="brands-title">
            Trusted by brands that <em>sell.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="section__sub">Real brands, real products, real scroll-stopping films.</p>
        </Reveal>

        <div className="brands-grid">
          {BRANDS.map((b, i) => (
            <BrandCard key={b.handle} brand={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
