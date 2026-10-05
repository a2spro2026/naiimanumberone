import { Header, CartDrawer } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import { Hero } from '@/components/sections/Hero'
import { MenuGrid } from '@/components/sections/MenuGrid'
import { Events } from '@/components/sections/Events'
import { WhyUs } from '@/components/sections/WhyUs'
import { Testimonials } from '@/components/sections/Testimonials'
import { Gallery } from '@/components/sections/Gallery'
import { Process } from '@/components/sections/Process'
import { Contact } from '@/components/sections/Contact'

export function HomePage() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main>
        <Hero />
        <MenuGrid />
        <Events />
        <WhyUs />
        <Testimonials />
        <Gallery />
        <Process />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
