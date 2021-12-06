import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import '../../dashboard/dashboard.scss';
import '../../marketer/adcode/adcode.scss';
import axios from 'axios';
import caretDown from '../../../assets/CaretDown.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';

const PublisherAdcode = () => {

    const [adcodes, setAdcodes] = useState([]);
    const handleLogout = (e) => {
        e.preventDefault();
    }
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    useEffect(() => {
        document.querySelector('.header').style.display = "none";
        const dataFetching = async() => {
            const fetching_all_adcodes = await authAxios.get('/api/user/scripts');
            const fetched_data = fetching_all_adcodes.data;
            console.log(fetched_data)
            setAdcodes(fetched_data.data);
        }
        dataFetching();
    }, []);
    console.log(adcodes)
    return(
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
                            <Link to='/publisher/adcodes'>Adcodes</Link>
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
                        <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>My Adcode</h4>
                            </div> 
                            <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            <div className="title">
                                                <p>Title</p>
                                            </div>
                                            {
                                                <div className="code-wrapper">
                                                    <textarea  name="" id="" cols="30" rows="10" style={{width: "100%", border : "1px solid #e5e5e5"}} defaultValue={adcodes.script}>
                                                        {adcodes.script}
                                                    </textarea>
                                                </div>
                                                   
                                                // adcodes.map(({id, script}) => {
                                                //     return <div className="code-wrapper" key={id}>
                                                //         <textarea  name="" id="" cols="30" rows="10" defaultValue={script}>
                                                //             {script}
                                                //         </textarea>
                                                //     </div>
                                                // })
                                            }   
                                        </div>
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

export default PublisherAdcode;