import React from 'react';
import '../hero/hero.scss';

const Hero = () => {
    return (
        <div className="hero">
            {/* <div className="container-fluid"> */}
                <div className="container">
                    <div className="hero-text">
                        <h1>Boost your business visibility and reach your target customers</h1>
                        <p>Grow your conversions and engagement using our vast affilations, digital marketing insights and in-depth analytics</p>
                        <div className="btns">
                            <button>
                                <span>Get started now</span>
                            </button>
                        </div>
                    </div>
                </div>
            {/* </div> */}
        </div>
    )
}

export default Hero
 