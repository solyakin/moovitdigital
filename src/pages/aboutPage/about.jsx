import React from 'react';
import './about.scss';
import AboutHero from './aboutHero/aboutHero';
import Affilations from './affilations/affilations';
import Moovit from './moovit/moovit';
import OurServices from './ourServices/OurServices';
import Story from './story/story';

const About =( ) => {
    return(
        <div className="about">
            <AboutHero />
            <Story />
            <Moovit />
            <OurServices />
            <Affilations />
        </div>
    )
}

export default About;