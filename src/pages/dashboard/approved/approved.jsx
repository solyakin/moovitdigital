import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import '../approved/approved.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import check from '../../../assets/Progress Tick Done.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';


const Approved = () => {

    return (
            <div className="dashboard create-ads">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="" />
                </div>
                <div className="dashboard-main-wrapper">
                <div className="tabs">
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <Link to='/dashboard'>Dashboard</Link>
                        </div>
                        <div className="tab-ads">
                            <div className="tab-item">
                                <img src={megaphone} alt="" />
                                <p>Ads Management</p>
                                <img src={caretDown2} alt="" />
                            </div>
                            <div className="sub-track">
                                <Link to='/create-ads'>Create an Ad</Link>
                                <Link to='/ads-history'>Ad History</Link>
                            </div>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <p>Packages</p>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/payment-history'>Payment History</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/support'>Support</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p>Logout</p>
                        </div>
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
                                <img src={check} alt="ellipse1" />
                                <p>Have a call</p>
                            </div>
                            <div className="item last">
                                <img src={ellipse1} alt="ellipse1" />
                                <p>Make payment</p>
                            </div>
                        </div>
                        <div className="call-card">
                            <div className="call-heading">
                                <h5>Have a call</h5>
                            </div>
                            <div className="call-content">
                                <h3>Your request has been approved</h3>
                                <p>We have completed our review and your ad is ready to go.</p>
                                
                                <div className="btn">
                                    <button>
                                        <Link to='/payment'>Make Payment</Link>
                                    </button><br></br>
                                    <Link to='/dashboard'>Back to dashboard</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Approved;
