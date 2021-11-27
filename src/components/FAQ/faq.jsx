import React, {useState} from 'react';
import '../FAQ/faq.scss';
import ArrowDown from '../../assets/ArrowDown.svg';

const Faq = () => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);
    const [show4, setShow4] = useState(false);

    return (
        <div className="faq">
            <div className="container">
                <h3>FAQs</h3>
                <div className="questions">
                    <div className="item">
                        <div className="text">
                            <h5>How do I activate my account?</h5>
                            <p style={{display : show ? "block" : "none"}}>We’ll send a verification to your mail with instructions </p>
                        </div>
                        <img src={ArrowDown} alt="Arrow Down"  onClick={() => setShow(!show) } style={{transform : show ? "rotate(180deg)" : "rotate(0deg)"}}/>
                    </div>
                    <div className="item">
                        <div className="text">
                            <h5>How can I use my remaining Account Credits?</h5>
                            <p style={{display : show1 ? "block" : "none"}}>We’ll send a verification to your mail with instructions </p>
                        </div>
                        <img src={ArrowDown} alt="Arrow Down" onClick={ () => setShow1(!show1)} style={{transform : show1 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                    </div>
                    <div className="item">
                        <div className="text">
                            <h5>What are the payment methods available?</h5>
                            <p style={{display : show2 ? "block" : "none"}}>We’ll send a verification to your mail with instructions </p>
                        </div>
                        <img src={ArrowDown} alt="Arrow Down" onClick={ () => setShow2(!show2)} style={{transform : show2 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                    </div>
                    <div className="item">
                        <div className="text">
                            <h5>Can I pay using Paypal without a Paypal account?</h5>
                            <p style={{display : show3 ? "block" : "none"}}>We’ll send a verification to your mail with instructions </p>
                        </div>
                        <img src={ArrowDown} alt="Arrow Down" onClick={ () => setShow3(!show3)} style={{transform : show3 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                    </div>
                    <div className="item">
                        <div className="text">
                            <h5>What are the payment methods available?</h5>
                            <p style={{display : show4 ? "block" : "none"}}>We’ll send a verification to your mail with instructions </p>
                        </div>
                        <img src={ArrowDown} alt="Arrow Down" onClick={ () => setShow4(!show4)} style={{transform : show4 ? "rotate(180deg)" : "rotate(0deg)"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faq;
