import React, {useRef, useState} from 'react';
import '../templates/template.scss';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import size from '../../assets/Rectangle 80.svg';
import size2 from '../../assets/Rectangle 801.svg';
import size3 from '../../assets/Rectangle 812.svg';
import image2 from '../../assets/Frame 404.svg';

const Templates = ({showNext3, setShowNext2, setShowNext3, handleSubmit, setCreateAds, createAds, loading, Disabled, setDisabled}) => {
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false)
    const [show2, setShow2] = useState(false)
    const [show3, setShow3] = useState(false)
    const [styling, setStyling] = useState({
        style1 : true,
        style2 : false,
        style3 : false
    })
    // const [show4, setShow4] = useState(false)
    // const [show5, setShow5] = useState(false)
    // const [show6, setShow6] = useState(false)
    // const [show7, setShow7] = useState(false)
    // const [show8, setShow8] = useState(false)
    // const [show9, setShow9] = useState(false)
    // const [show10, setShow10] = useState(false)
    // const [show11, setShow11] = useState(false)
    const boxClick = (e) => {
        e.preventDefault();
        setStyling({style1 : true, style2 : false, style3 : false}) 
    }
    const boxClick1 = (e) => {
        e.preventDefault();
        setStyling({style2 : true, style1: false, style3: false}) 
    }
    const boxClick2 = (e) => {
        e.preventDefault();
        setStyling({style3 : true, style1 : false, style2 : false}) 
    }
    const handleClick = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setShow(true);
        setCreateAds({...createAds, graphic_id : targetId})
        setShow1(false)
        setShow2(false)
        setShow3(false)
        // setShow4(false)
    }
    const handleClick2 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setShow1(true);
        setCreateAds({...createAds, graphic_id : targetId})
        setShow(false)
        setShow2(false)
        setShow3(false)
    }
    const handleClick3 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setShow2(true);
        setCreateAds({...createAds, graphic_id : targetId})
        setShow1(false)
        setShow(false)
        setShow3(false)
    }
    const handleClick4 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setShow3(true);
        setCreateAds({...createAds, graphic_id : targetId})
        setShow1(false)
        setShow2(false)
        setShow(false)
    }
    const handleBack = (e) => {
        e.preventDefault();
        setShowNext2("block");
        setShowNext3("none");
    }
    console.log(show)
    return (
        <div style={{display : showNext3}}>
            <div className="pages-link">
                <Link to='#'>Home</Link>
                <img src={caretRight} alt="caret right"/>
                <Link to='#'>Create an Ad</Link>
            </div>
            <div className="page-progress">
            <div className="item first">
                    <img src={tick} alt="ellipse1" />
                    <p>Select a budget</p>
                </div>
                <div className="item">
                    <img src={tick} alt="ellipse1" />
                    <p>Ads details</p>
                </div>
                <div className="item">
                    <img src={ellipse1} alt="ellipse1" />
                    <p>Pick a template</p>
                </div>
                <div className="item ">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Make payment</p>
                </div>
                <div className="item last">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Have a call</p>
                </div>
                
            </div>
            <div className="content-form">
                <div className="row_">
                    <h5>Pick a graphic</h5>
                    <div className="template-fold mt-4">
                        <div className="template-tags">
                            <div className="tag-item" onClick={boxClick} style={{border : styling.style1 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size} alt="" />
                                <p>Square</p>
                            </div>
                            <div className="tag-item" onClick={boxClick1} style={{border : styling.style2 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size2} alt="" />
                                <p>Portrait</p>
                            </div>
                            <div className="tag-item" onClick={boxClick2} style={{border : styling.style3 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size3} alt="" />
                                <p>Landscape</p>
                            </div>
                        </div>
                        <div className="template-image mb-4 ">
                            <p className="text-center">Choose your favourite image</p>
                            <div className="bordering">
                                <div className="row mb-3">
                                    <div className="col">
                                        <img src={image2} alt="" id="1" onClick={handleClick} style={{border : show ? "3px solid #6060f3" : "none"}}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="2" onClick={handleClick2} style={{border : show1 ? "3px solid #6060f3" : "none"}}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="3"onClick={handleClick3 } style={{border : show2 ? "3px solid #6060f3" : "none"}}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="4" onClick={handleClick4 } style={{border : show3 ? "3px solid #6060f3" : "none"}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="direction-btn">
                                <p className="back" onClick={handleBack}>Back</p>
                                <div className="btn">
                                    <button type="submit" onClick={handleSubmit} disabled={Disabled}>Submit</button>
                                    <div className="spinner" style={{display : loading ? "block" : "none"}}>
                                        <Loader type="TailSpin" color="#EE315D" height={30} width={30} />
                                    </div>
                                </div>          
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
        </div>
    )
}

export default Templates
