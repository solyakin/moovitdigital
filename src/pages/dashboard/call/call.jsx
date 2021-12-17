import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import check from '../../../assets/Progress Tick Done.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';
import Tags from '../../../components/Tags/Tags';
import logo from '../../../assets/image 1.png';
import hamburger from '../../../assets/hamburger.png';
import MobileTags from '../../../components/MobileTags/mobileTags';

const Call = () => {
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    }
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    }
    return (
            <div className="dashboard create-ads">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <img src={hamburger} alt="hamburger" width="25px" className="hamburger" onClick={toggler}/>
                        <Link to='/'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
                        {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <Tags style={style} handleClick={handleClick} />
                    </div>
                    <div className="mobile-tag">
                        <MobileTags style={style} handleClick={handleClick} ham={ham}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="pages-link">
                            <Link to='#'>Home</Link>
                            <img src={caretRight} alt="caret right"/>
                            <Link to='#'>Create an Ad</Link>
                        </div>
                        <div className="page-progress">
                            <div className="item first">
                                <img src={check} alt="ellipse1" />
                                <p>Ads details</p>
                            </div>
                            <div className="item">
                                <img src={check} alt="ellipse1" />
                                <p>Select a budget</p>
                            </div>
                            <div className="item">
                                <img src={ellipse1} alt="ellipse1" />
                                <p>Have a call</p>
                            </div>
                            <div className="item last">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Make payment</p>
                            </div>
                        </div>
                        <div className="call-card">
                            <div className="call-heading">
                                <h5>Have a call</h5>
                            </div>
                            <div className="call-content">
                                <h3>Speak with a digital marketer</h3>
                                <p>You’ll receive a call from our representative to discuss your choices and provide further guidiance</p>
                                <div className="phone-wrapper">
                                    <p>Confirm your phone number</p>
                                    <input type="text" placeholder="081 344 354 432"/>
                                </div>
                                <button>
                                    <Link to='/review'>Proceed to call</Link>
                                </button>
                                <p>Not ready yet? <span>schedule for later</span></p>

                                <div className="notice">
                                    <p>Beware of scammers. Our representative will not ask for your bank details, password or any confidential information.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Call;
