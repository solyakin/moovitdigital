import React from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';

const Support = () => {
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
                            <Link to='/profile'>Support</Link>
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
                        <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Support</h4>
                            </div> 
                            <div className="support">
                                <h3>Create a ticket</h3>
                                <p>Having an issues using our services? We are all ears.</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form action="">
                                            <div className="form-group">
                                                <label htmlFor="">Subject</label>
                                                <input type="text"  />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Description</label>
                                                <textarea name="" id="" cols="10" rows="3" placeholder="enter message here"></textarea>
                                            </div>
                                            <button>Send</button>
                                        </form>
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

export default Support;
