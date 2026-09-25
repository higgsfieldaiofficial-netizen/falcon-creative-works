import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Brands from './components/Brands'
import Services from './components/Services'
import Work from './components/Work'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Brands />
        <Services />
        <div className="film-strip" aria-hidden="true" />
        <Work />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
