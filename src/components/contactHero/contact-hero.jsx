import React from 'react';
import arrow from "../../assets/rafik.svg";
import '../contactHero/contact-hero.scss';

const ContactHero = () => {
    return (
        <div className="contact-hero">
            <div className="container">
                <div className="row align-center">
                    <div className="col left">
                        <h1 className="get-in">Get in</h1>
                        <h1 className="touch">touch.</h1>
                        <p>Your feedback is important to us. Reach our representatives on our social media platforms</p>
                    </div>
                    <div className="col right">
                        <img src={arrow} alt="" />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default ContactHero;
