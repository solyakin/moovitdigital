import React from 'react';
import '../hero/hero.scss';
import arrow from '../../assets/ArrowCircleRight.svg';

const Hero = () => {
    return (
        <div className="hero">
            <div className="container-fluid">
                <div className="container">
                    <div className="hero-text">
                        <h1>Boost your business <span>visibility</span> and reach your target customers</h1>
                        <p>Grow your conversions and engagement using our vast affilations, digital marketing insights and in-depth analytics</p>
                        <div className="btns">
                            <button>
                                <span>Request a Call now</span>
                                <img src={arrow} alt="arrow right" />
                            </button>
                            <button>
                                <span>Get started now</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
 