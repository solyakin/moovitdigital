import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image 1.png';

const PublisherDashboard = () => {

    const current_user = localStorage.getItem("auth_name");
    const token = localStorage.getItem("auth_token");

    const history = useHistory();
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
    }, [])

    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://api.moovitdigital.com/api/user/logout')
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
                            <p>Notifications</p>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/publisher-payment-history'>Finance</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to=''>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to=''>Support</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p onClick={handleLogout} className="logout">Logout</p>
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
                                    <h3>#70,000.00</h3>
                                </div>
                            </div>
                            <div className="ads-records">
                                <div className="total">
                                    <h4>#90,000</h4>
                                    <p>Amount earned</p>
                                </div>
                                <div className="impression">
                                    <h4>#50,000</h4>
                                    <p>Amount recieved</p>
                                </div>
                                <div className="clicks">
                                    <h4>3</h4>
                                    <p>Running Ads</p>
                                </div>
                                <div className="clicks">
                                    <h4>12</h4>
                                    <p>Total Ads</p>
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

export default PublisherDashboard;
