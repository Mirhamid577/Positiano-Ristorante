import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import Reservation from './components/Reservation'
import Footer from './components/Footer'
import Particles from './components/Particles'
import useScrollReveal from './hooks/useScrollReveal'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Particles />
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </>
  )
}
