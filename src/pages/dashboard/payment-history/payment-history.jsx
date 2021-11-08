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

const PaymentHistory = () => {
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
                                <h4>Payment History</h4>
                            </div>
                            <div className="history-wrapper">
                                <div className="text-right">
                                    <button>
                                        <Link to='/create-ads'>+ <span>Create Ads</span></Link>
                                    </button>
                                </div>
                            
                            <div className="text-left">
                                <input type="text"  placeholder="search"/>
                            </div>
                            
                        </div> 
                        <div className="history-table">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Payment Link</th>
                                    <th scope="col">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>21/10/2021</td>
                                        <td>50,000</td>
                                        <td>Paid</td>
                                        <td></td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>18/10/2021</td>
                                        <td>50,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input type="checkbox" name="" id="" />
                                        </th>
                                        <td>11/10/2021</td>
                                        <td>10,000</td>
                                        <td>Paid</td>
                                        <td>-</td>
                                        <td className="invoice">view now</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                        </div>              
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory;
