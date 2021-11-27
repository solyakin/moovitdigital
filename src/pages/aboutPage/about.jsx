import React from 'react';
import './about.scss';
import AboutHero from './aboutHero/aboutHero';
import Affilations from './affilations/affilations';
import Moovit from './moovit/moovit';
import Story from './story/story';

const About =( ) => {
    return(
        <div className="about">
            <AboutHero />
            <Story />
            <Moovit />
            <Affilations />
        </div>
    )
}

export default About;