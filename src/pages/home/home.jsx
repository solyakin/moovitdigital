import React, {useEffect} from 'react'
import '../homepage/homepage.scss';
import Faq from '../../components/FAQ/faq'
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import Heroscreen from '../../components/heroScreen/heroscreen';

const Home = () => {
    useEffect(() => {
        document.querySelector(".header").style.display = "flex";
    },[])
    return (
        <div className="homepage">
                <Heroscreen /> 
                <Services />
                <Steps />
                <Faq />
                <Hero/>
        </div>
    )
}

export default Home;
