import React from 'react';
import { Link } from 'react-router-dom';
import '../hero/hero.scss';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container">
                <div className="hero-text">
                    <h1>Your ads go across multiple networks and reach millions.</h1>
                    <p>Grow your conversions and engagement using our vast affilations, digital marketing insights and in-depth analytics</p>
                    <div className="btns">
                        <button>
                            <Link to='/register'>Get started now</Link>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Hero;
 