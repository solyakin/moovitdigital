import React from 'react';
import '../../steps/steps.scss';                     
import card from '../../../assets/card.svg';                      
import publish from '../../../assets/publish.svg';                      
import banner from '../../../assets/cuate.svg'; 
import approved from '../../../assets/bro.svg';                     
import login from '../../../assets/Login.svg';
import line1  from '../../../assets/Vector 68.svg'; 
import line2 from '../../../assets/Vector 69.svg';  
import line3 from '../../../assets/Vector 70.svg';
import line4 from '../../../assets/Vector 71.svg';                 

const PublisherSteps = ({show1}) => {
    return (
        <div className="step-list publisher" style={{display : show1}}>
            <div className="step_1 mb-5">
                <div className="wrapper">
                    <img src={login} alt="" height="180px" className="login"/>
                    <div className="count">
                        <p>STEP 1</p>
                        <h5>Create an account</h5>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui</p>
                    </div>
                    <img src={line1} alt="" className="line1" />
                </div>
            </div>
            <div className="step_2 mb-5">
                <div className="wrapper">
                    <img src={approved} alt="" height="180px"/>
                    <div className="count">
                        <p>STEP 2</p>
                        <h5>Get approved</h5>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui</p>
                    </div>
                </div>
                <img src={line2} alt="" className="line2" />    
            </div>
            <div className="step_3 mb-5">
                <div className="wrapper">
                    <img src={banner} alt="" />
                    <div className="count">
                        <p>STEP 3</p>
                        <h5>Receive ads banners</h5>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui</p>
                    </div>
                    
                </div> 
                <img src={line3} alt="" className="line3" />  
            </div>
            <div className="step_4 mb-5">
                <div className="wrapper">
                    <img src={publish} alt="" />
                    <div className="count">
                        <p>STEP 4</p>
                        <h5>Publish ads on site</h5>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui</p>
                    </div>
                </div>
                <img src={line4} alt="" className="line4" />
            </div>
            <div className="step_5 mb-5">
                <div className="wrapper">
                    <img src={card} alt="" className="login"/>
                    <div className="count">
                        <p>STEP 5</p>
                        <h5>Get paid</h5>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PublisherSteps
