import React from 'react'
import '../homepage/homepage.scss';
import Faq from '../../components/FAQ/faq'
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import Heroscreen from '../../components/heroScreen/heroscreen';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Homepage = () => {

    return (
        <div className="homepage">
                <LoadingScreen />
                <Header />
                <Heroscreen /> 
                <Services />
                <Steps />
                <Faq />
                <Hero/>
                <Footer/>
        </div>
    )
}

export default Homepage;
