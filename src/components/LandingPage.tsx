import React from 'react'
import { Header } from './LandingPageComponents/Header'
import { Hero } from './LandingPageComponents/Hero'
import { Features } from './LandingPageComponents/Features'
import { HowItWorks } from './LandingPageComponents/HowItWorks'
import {Stats} from './LandingPageComponents/Stats';
import { Testimonials } from './LandingPageComponents/Testimonials'
import { CTA } from './LandingPageComponents/CTA'
import { Footer } from './LandingPageComponents/Footer'

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Stats />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default LandingPage
