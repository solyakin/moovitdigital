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
import profileImage from '../../../assets/Userprofile.svg';

const Profile = () => {
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
                        <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Profile</h4>
                            </div>
                            <div className="user-detail">
                                <div className="profile-img">
                                    <img src={profileImage} alt="avatar" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <form action="">
                                            <div className="form-group">
                                                <label htmlFor="">Name</label>
                                                <input type="text" placeholder="John Doe" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Email</label>
                                                <input type="email" placeholder="John@Doe.com" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Phone Number</label>
                                                <input type="text" placeholder="+234 8169 1140 01" />
                                            </div>
                                            <div className="password">
                                                <p>Password</p>
                                                <Link>Change password</Link>
                                            </div>
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

export default Profile;
