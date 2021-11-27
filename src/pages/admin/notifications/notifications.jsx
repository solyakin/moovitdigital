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
import AdminTags from '../../../components/adminTags/adminTags';

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
                        <AdminTags />
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
