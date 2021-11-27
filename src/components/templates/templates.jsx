import React from 'react';
import '../templates/template.scss';
import { Link } from 'react-router-dom';
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import size from '../../assets/Rectangle 80.svg';
import size2 from '../../assets/Rectangle 801.svg';
import size3 from '../../assets/Rectangle 812.svg';
import image1 from '../../assets/Rectangle 80.svg';
import image2 from '../../assets/Rectangle 82.png';

const Templates = ({showNext3, handleSubmit, setCreateAds, createAds}) => {
    const handleClick = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setCreateAds({...createAds, graphic_id : targetId})
    }
    return (
        <div style={{display : showNext3}}>
            <div className="pages-link">
                <Link>Home</Link>
                <img src={caretRight} alt="caret right"/>
                <Link>Create an Ad</Link>
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
                <div className="row">
                    <h5>Pick a graphic</h5>
                    <div className="template-fold mt-4">
                        <div className="template-tags">
                            <div className="tag-item">
                                <img src={size} alt="" />
                                <p>Square</p>
                            </div>
                            <div className="tag-item">
                                <img src={size2} alt="" />
                                <p>Portrait</p>
                            </div>
                            <div className="tag-item">
                                <img src={size3} alt="" />
                                <p>Landscape</p>
                            </div>
                        </div>
                        <div className="template-image mb-4 ">
                            <p className="text-center">Choose your favourite image</p>
                            <div className="bordering">
                                <div className="row mb-3">
                                    <div className="col">
                                        <img src={image2} alt="" id="1" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="2" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="3" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="1" onClick={handleClick}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <img src={image2} alt="" id="2" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="3" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="4" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="5" onClick={handleClick}/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col">
                                        <img src={image2} alt="" id="6" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="7" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="8" onClick={handleClick}/>
                                    </div>
                                    <div className="col">
                                        <img src={image2} alt="" id="9" onClick={handleClick}/>
                                    </div>
                                </div>
                            </div>
                            <div className="direction-btn">
                                <p>Back</p>
                                <button type="submit" onClick={handleSubmit}>Next</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Templates
