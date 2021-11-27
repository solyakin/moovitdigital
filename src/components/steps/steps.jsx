import React, { useState } from 'react';
import '../steps/steps.scss';                                 
import AdvertiserSteps from './advertiser/advertiser';
import PublisherSteps from './publisher/publisher';

const Steps = () => {

    const [show, setShow] = useState("block");
    const [show1, setShow1] = useState("none");
    const [active, setActive] = useState({
        advertiser : true,
        publisher : false
    });

    const handleClick = (e) => {
        e.preventDefault();
        setShow("block");
        setShow1("none");
        setActive({advertiser : true, publisher : false})
    }
    const handleClick1 = (e) => {
        e.preventDefault();
        setShow("none");
        setShow1("block");
        setActive({advertiser : false, publisher : true})
        // setIndicator(150);
    }
    return (
        <div className="steps">
            <div className="container">
                <h1 className="text-center">Quick Steps</h1> 
                <div className="headings justify-content-center">
                    <h5 onClick={handleClick} style={{border : active.advertiser ? " 1px solid grey"  : "none"}} >Advertiser</h5>
                    <h5 onClick={handleClick1} style={{border : active.publisher ? " 1px solid grey"  : "none"}}>Publisher</h5>
                    {/* <div className="indicator" style={{ left : `${indicator}px` }}></div> */}
                </div>
                <AdvertiserSteps show={show}/>
                <PublisherSteps show1={show1}/>
            </div>
        </div>
    )
}

export default Steps
