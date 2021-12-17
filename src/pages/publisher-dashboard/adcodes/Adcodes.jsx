import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import '../../dashboard/dashboard.scss';
import '../../marketer/adcode/adcode.scss';
import axios from 'axios';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import logo from '../../../assets/image 1.png';

const PublisherAdcode = () => {

    const [adcodes, setAdcodes] = useState([]);

    const history = useHistory();
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    useEffect(() => {
        const dataFetching = async() => {
            const fetching_all_adcodes = await authAxios.get('/api/user/scripts');
            const fetched_data = fetching_all_adcodes.data;
            console.log(fetched_data)
            if(fetched_data !== null){
                setAdcodes(fetched_data.data);
            }
        }
        dataFetching();
    }, []);
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
    console.log(adcodes)
    return(
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
                        <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>My Adcode</h4>
                            </div> 
                            <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="form-group">
                                            
                                            {
                                                adcodes ?
                                                <div className="code-wrapper">
                                                    <div className="title">
                                                        <p>Title</p>
                                                    </div>
                                                    <textarea  name="" id="" cols="30" rows="10" style={{width: "100%", border : "1px solid #e5e5e5"}} defaultValue={adcodes.script}>
                                                        {adcodes.script}
                                                    </textarea>
                                                </div> : <></>
                                                   
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