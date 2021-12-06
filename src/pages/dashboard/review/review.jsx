import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import check from '../../../assets/Progress Tick Done.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import logo from '../../../assets/image 1.png';
import hamburger from '../../../assets/hamburger.png';
import { Link } from 'react-router-dom';
import Tags from '../../../components/Tags/Tags';
import MobileTags from '../../../components/MobileTags/mobileTags';

const Review = () => {

    const [style, setStyle] = useState({
        hide : false, 
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    }
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    }
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
    }, [])
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
                        <p>The Brand Hub</p>
                        <img src={caretDown} alt="" />
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
                            <Link>Home</Link>
                            <img src={caretRight} alt="caret right"/>
                            <Link>Create an Ad</Link>
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
                                <h3>Your request is under review</h3>
                                <p>We ensure that contents are up to standard and is not misleading. This will only take a few moment.</p>
                                
                                <div className="btns">
                                    <button>
                                        <Link to='/dashboard'>Back to dashboard</Link>
                                    </button>
                                    <button>
                                        <Link to='/dashboard'>Create another ad</Link>
                                    </button>
                                </div>

                                <div className="notice">
                                    <p>Your ad has been saved and can be viewed in ads history</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review;
