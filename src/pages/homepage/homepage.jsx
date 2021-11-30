import React from 'react'
import '../homepage/homepage.scss';
import Faq from '../../components/FAQ/faq'
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import Heroscreen from '../../components/heroScreen/heroscreen';

const Homepage = () => {
    return (
        <div className="homepage">
                <LoadingScreen />
                <Heroscreen /> 
                <Services />
                <Steps />
                <Faq />
                <Hero/>
        </div>
    )
}

export default Homepage;
