import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretRight from '../../../assets/CaretRight.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';


const Pricing = ({createAds, budget_id, setCreateAds, showNext, setShowNext, setShowNext2}) => {

    const [select, setSelect] = useState(false);
    const [select1, setSelect1] = useState(false);
    const [select2, setSelect2] = useState(false);
    
    const handleClick = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id)
        setCreateAds({...createAds, budget_id : targetId});
        // const parent = e.target.parentElement.parentElement;
        // parent.classList.add("styling");
    } 

    const nextPage = (e) => {
        e.preventDefault();
        setShowNext("none");
        setShowNext2("block")
    }
    return (
            <div style={{display : showNext}}>
                <div className="pages-link">
                    <Link>Home</Link>
                    <img src={caretRight} alt="caret right"/>
                    <Link>Create an Ad</Link>
                </div>
                <div className="page-progress">
                <div className="item first">
                        <img src={ellipse1} alt="ellipse1" />
                        <p>Select a budget</p>
                    </div>
                    <div className="item">
                        <img src={ellipse2} alt="ellipse1" />
                        <p>Ads details</p>
                    </div>
                    <div className="item">
                        <img src={ellipse2} alt="ellipse1" />
                        <p>Pick a template</p>
                    </div>
                    <div className="item">
                        <img src={ellipse2} alt="ellipse1" />
                        <p>Have a call</p>
                    </div>
                    <div className="item last">
                        <img src={ellipse2} alt="ellipse1" />
                        <p>Make payment</p>
                    </div>
                </div>
                <div className="content-form">
                    <div className="row justify-content-center">
                        <h5>Select a budget</h5>
                        <div className="price-list">
                            <div className="tier" style={{background : select ? "#F0F0F0" : "white"}}>
                                <p>Tier 1</p>
                                <h4>#10,000</h4>
                                <ul>
                                    <li>Realtime analytics</li>
                                    <li>Get 1-on-1 advice from a marketer</li>
                                    <li>Post ads on social media platforms</li>
                                    <li>One location only</li>
                                    <button id="1" onClick={handleClick}>Choose budget</button>
                                </ul>
                            </div>
                            <div className="tier" style={{background : select1 ? "#F0F0F0" : "white"}}>
                                <p>Tier 2</p>
                                <h4>#50,000</h4>
                                <ul>
                                    <li>Realtime analytics</li>
                                    <li>Get 1-on-1 advice from a marketer</li>
                                    <li>Post ads on social media platforms</li>
                                    <li>Post ads on blogs</li>
                                    <li>Two location only</li>
                                    <button id="2" onClick={handleClick}>Choose budget</button>
                                </ul>
                            </div>
                            <div className="tier" style={{background : select2 ? "#F0F0F0" : "white"}}>
                                <p>Tier 3</p>
                                <h4>#100,000</h4>
                                <ul>
                                    <li>Realtime analytics</li>
                                    <li>Get 1-on-1 advice from a marketer</li>
                                    <li>Post ads on social media platforms</li>
                                    <li>Post ads on blogs</li>
                                    <li>Post ads on news sites</li>
                                    <li>Three location only</li>
                                    <button id="3" onClick={handleClick}>Choose budget</button>
                                </ul>
                            </div>
                        </div>    
                    </div>
                    <div className="lower_btn text-center mt-5">
                        <button className="btn btn-large"onClick={nextPage}>Proceed</button>
                        <p>Not sure yet? Get help</p>
                    </div>
                </div>
        </div>
    )
}

export default Pricing;
