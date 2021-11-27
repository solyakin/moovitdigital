import React, {useState} from 'react'
import '../homepage/homepage.scss';
import Advertiser from '../../components/advertiser/advertiser'
import Affilations from '../aboutPage/affilations/affilations'
import Analytics from '../../components/Analytics/analytics'
import Faq from '../../components/FAQ/faq'
import Header from '../../components/header/header';
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import Services from '../../components/services/services'
import Testimonials from '../../components/testimonials/testimonials';
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import Heroscreen from '../../components/heroScreen/heroscreen';

const Homepage = () => {
    // const data = () => {
    //     const token = "EAAF1mWqxrTMBAMi1jZCEbwYYyiTvkYQYNfTl9rWdon8aFZCZA6O0hgxQZBrwAbYKKWDmHoXEPFdxLVa75EUukhvXHeJSWMLxNjM7pWqWuxtXUtOHrP2Bqy9ThMhb9Y674tFvrTgP0SXEhQPXCC4vPWwtGyUTPGntENZAZANOyFZAllR5wSHcFXprtKu8XyKZCxtnFXH75J786nJOQZCZBuJmlkrObGaC6tdh4R6ZA8hMwhCvq2nUyvPw2He";
    //     const id = "act_623647998983895";
    //     const version = "v12"
    //     fetch(`https://graph.facebook.com/${version}/${id}/campaigns`)
    //     .then(res => {
    //         console.log(res);
    //     })
    // }
    // data()
    
    return (
        <div className="homepage">
                <LoadingScreen />
                {/* <Header /> */}
                <Heroscreen /> 
                <Services />
                <Steps />
                <Faq />
                <Hero/>
        </div>
    )
}

export default Homepage;
