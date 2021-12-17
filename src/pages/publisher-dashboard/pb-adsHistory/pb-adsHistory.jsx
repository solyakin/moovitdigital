import React, {useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import logo from '../../../assets/image 1.png';

const PublisherAdHistory = () => {

    const history = useHistory();
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://test.canyousing.com.ng/api/user/logout')
        .then(res => {
            if(res.status === 200){
                localStorage.clear();
                history.push('/home');
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/home'>
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
                        <div className="tab-item">
                        <img src={squares} alt="" />
                            <Link to='/dashboard/publisher'>Dashboard</Link>
                        </div>
                        <div className="tab-ads">
                            <div className="tab-item">
                                <img src={megaphone} alt="" />
                                <p>
                                    <Link to='/publisher-ads-history'>Ads History</Link>
                                </p>
                            </div>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='/publisher/adcode'>Adcodes</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <p>
                                <Link to='/publisher/notifications'>Notifications</Link>
                            </p>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/publisher-payment-history'>Finance</Link>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/publisher/withdraw'>Request Withdrawal</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/publisher/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/publisher/support'>Support</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p onClick={handleLogout} className="logout">Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main">
                        <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Ads History</h4>
                            </div>
                            <div className="history-wrapper">
                                <div className="text-right">
                                    {/* <button>
                                        <Link to='/create-ads'>+ <span>Create Ads</span></Link>
                                    </button> */}
                                </div>
                            
                            <div className="text-left mt-4">
                                <input type="text"  placeholder="search"/>
                            </div>
                            
                        </div> 
                        <div className="history-table">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Campaign Type</th>
                                    <th scope="col">Ad type</th>
                                    <th scope="col">Views</th>
                                    <th scope="col">Clicks</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Spent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <th scope="row">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <td>The Brand...</td>
                                    <td>Conversion</td>
                                    <td>Tier 1</td>
                                    <td>700</td>
                                    <td>60</td>
                                    <td>Running</td>
                                    <td>10,000</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <td>The Brand...</td>
                                    <td>Conversion</td>
                                    <td>Tier 1</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>Pending</td>
                                    <td>0.00</td>
                                    </tr>
                                    <tr>
                                    <th scope="row">
                                        <input type="checkbox" name="" id="" />
                                    </th>
                                    <td>The Brand...</td>
                                    <td>Conversion, sales</td>
                                    <td>Tier 1</td>
                                    <td>700</td>
                                    <td>60</td>
                                    <td>Running</td>
                                    <td>10,000</td>
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

export default PublisherAdHistory;
