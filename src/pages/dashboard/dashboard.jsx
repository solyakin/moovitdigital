import React from 'react';
import '../dashboard/dashboard.scss';
import caretDown from '../../assets/CaretDown.svg';
import caretDown2 from '../../assets/CaretDown2.svg';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import signout from '../../assets/SignOut.svg';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    const current_user = localStorage.getItem("user");
    console.log(current_user)
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <p>Dashboard</p>
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
                            <Link to='/support'>Support</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p>Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main">
                        <div className="main-heading">
                            <div className="welcome">
                                <p>Welcome Back</p>
                                <h4>{current_user}</h4>
                            </div>
                            <div className="smm">
                                <Link>Purchase SMM Package</Link>
                            </div>
                        </div>
                        <div className="main-records">
                            <div className="funds-wrapper">
                                <div className="fund-balance">
                                    <p>Available Funds</p>
                                    <h3>#00.00 <span>TOP-UP</span></h3>
                                </div>
                                <div className="create-ads-btn">
                                    <button>
                                        <span>+</span>
                                        <Link to='/create-ads'>Create an Ad</Link>
                                    </button>
                                </div>
                            </div>

                            <div className="ads-records">
                                <div className="total">
                                    <h4>0</h4>
                                    <p>Total Ads</p>
                                </div>
                                <div className="impression">
                                    <h4>0</h4>
                                    <p>Impressions recieved</p>
                                </div>
                                <div className="clicks">
                                    <h4>0</h4>
                                    <p>Total Clicks</p>
                                </div>
                                <div className="clicks">
                                    <h4>0</h4>
                                    <p>Total Clicks</p>
                                </div>
                            </div>
                        </div>

                        <div className="ads-stats">
                            <div className="ads-graph">
                                <div className="graph-heading">
                                    <p>Ads chart</p>
                                    <p><span></span>RUNNING</p>
                                </div>
                                <div className="graph-view"></div>
                            </div>
                            <div className="smm-package">
                                <div className="smm-heading">
                                    <div className="item">
                                        <p>SMM Package</p>
                                        <h5>Premium <span>View details</span></h5>
                                    </div>
                                    <div className="cancel-plan">
                                        <p>Cancel plan</p>
                                    </div>
                                </div>
                                <div className="running-smm">
                                    <p>Instagram Account- the_Brand_Hub</p>
                                    <p>Twitter Account- TheBrandHubng</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
