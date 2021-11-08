import React from 'react'
import Advertiser from '../../components/advertiser/advertiser'
import Affilations from '../../components/affilations/affilations'
import Analytics from '../../components/Analytics/analytics'
import Faq from '../../components/FAQ/faq'
import Header from '../../components/header/header';
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import Testimonials from '../../components/testimonials/testimonials'

const Homepage = () => {
    return (
        <div className="homepage">
            <Header />
            <Hero/>
            <Affilations />
            <Services />
            <Advertiser />
            <Analytics />
            <Steps />
            <Testimonials />
            <Faq />
        </div>
    )
}

export default Homepage
