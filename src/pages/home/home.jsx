import React from 'react'
import '../homepage/homepage.scss';
import Faq from '../../components/FAQ/faq'
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import Heroscreen from '../../components/heroScreen/heroscreen';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

const Home = ({navBackground}) => {
    
    return (
        <div className="homepage">
                <Header navBackground={navBackground}/>
                <Heroscreen /> 
                <Services />
                <Steps />
                <Faq />
                <Hero/>
                <Footer />
        </div>
    )
}

export default Home;
