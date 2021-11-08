import React from 'react';
import '../../dashboard/dashboard.scss';
import '../notifications/notifications.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import avatar from '../../../assets/Ellipse 51.png';
import Trash from '../../../assets/Trash.svg';
import { Link } from 'react-router-dom';

const Notifications = () => {
    return (
        <div className="dashboard notification">
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
                    <div className="dashboard-main ">
                        <div className="notification-wrapper">
                            <h3>Notifications</h3>
                            <div className="notification-list">
                                <div className="notification-card">
                                    <img src={avatar} alt="" />
                                    <div className="list-text">
                                        <h5>Jon Bellion requested to put up an ad</h5>
                                        <p>2 hours ago</p>
                                    </div>
                                </div>
                                <div className="actions">
                                    <Link>view details</Link>
                                    <img src={Trash} alt="" />
                                </div>
                            </div>
                            <div className="notification-list">
                                <div className="notification-card">
                                    <img src={avatar} alt="" />
                                    <div className="list-text">
                                        <h5>Jon Bellion requested to put up an ad</h5>
                                        <p>2 hours ago</p>
                                    </div>
                                </div>
                                <div className="actions">
                                    <Link>view details</Link>
                                    <img src={Trash} alt="" />
                                </div>
                            </div>
                            <div className="notification-list">
                                <div className="notification-card">
                                    <img src={avatar} alt="" />
                                    <div className="list-text">
                                        <h5>Jon Bellion requested to put up an ad</h5>
                                        <p>2 hours ago</p>
                                    </div>
                                </div>
                                <div className="actions">
                                    <Link>view details</Link>
                                    <img src={Trash} alt="" />
                                </div>
                            </div>
                            <div className="notification-list">
                                <div className="notification-card">
                                    <img src={avatar} alt="" />
                                    <div className="list-text">
                                        <h5>Jon Bellion requested to put up an ad</h5>
                                        <p>2 hours ago</p>
                                    </div>
                                </div>
                                <div className="actions">
                                    <Link>view details</Link>
                                    <img src={Trash} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications;
