import React from 'react';
import '../dashboard/dashboard.scss';
import '../admin/admin.scss';
import caretDown from '../../assets/CaretDown.svg';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import signout from '../../assets/SignOut.svg';

import { Link } from 'react-router-dom';

const AddStaff = () => {
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
                            <Link to='/admin'>Dashboard</Link>
                        </div>
                        <div className="tab-item">
                            <img src={megaphone} alt="" />
                            <Link to='/add-staff'>Add staff</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='/message'>Message</Link>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/new-ads-ticket'>New ads ticket</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/notification'>Notification</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/admin-profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p>Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main admin">
                    <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Add a new staff</h4>
                            </div> 
                            <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form action="">
                                            <div className="form-group">
                                                <label htmlFor="">Enter staff email</label>
                                                <input type="text" placeholder="jonbellion@gmail.com" />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Password</label>
                                                <input type="text"  />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Role</label>
                                                <input type="text" placeholder="Marketer" />
                                            </div>
                                            <button>Send invite</button>
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

export default AddStaff;
