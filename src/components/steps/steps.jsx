import React from 'react';
import '../steps/steps.scss';
import one from '../../assets/Frame 22.svg';                      
import two from '../../assets/Frame 25.svg';                      
import three from '../../assets/Frame 26.svg';                      
import four from '../../assets/Frame 27.svg'; 
import line from '../../assets/Vector 4.svg';                     

const Steps = () => {
    return (
        <div className="steps">
            <div className="container">
                <h1>Quick Steps</h1>
                <p>Get an oversight of our process to help you set out quickly</p>
                <div className="headings">
                    <h5>Advertiser</h5>
                    <h5>Publisher</h5>
                </div>

                <div className="step-list">
                    <div className="step_1">
                        <div className="wrapper">
                            <div className="count">
                                <img src={one} alt="" />
                                {/* <img src={line} alt="" /> */}
                            </div>
                            <p>Create an account<br></br> for your company</p>
                        </div>
                    </div>
                    <div className="step_2">
                        <div className="wrapper">
                            <div className="liner">
                                <img src={line} alt="" />
                            </div>
                            <div className="count">
                                <img src={two} alt="" />
                            </div>
                            <p>Choose from our <br></br> templates</p>
                        </div>    
                    </div>
                    <div className="step_3">
                        <div className="wrapper">
                            <div className="liner">
                                <img src={line} alt="" />
                            </div>
                            <div className="count">
                                <img src={three} alt="" />
                            </div>
                            <p>Pick an ads <br></br>package</p>
                        </div>    
                    </div>
                    <div className="step_4">
                        <div className="wrapper">
                            <div className="count">
                                <img src={four} alt="" />
                            </div>
                            <p>Receive guidiances<br></br> from a marketer</p>
                        </div>
                    </div>
                </div>
            </div>
            

        </div>
    )
}

export default Steps
