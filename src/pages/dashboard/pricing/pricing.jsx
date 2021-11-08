import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import check from '../../../assets/Progress Tick Done.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';


const Pricing = () => {

    const initialValue = () => {
        const value = "Abia";
        return value;
      };
    const [value, setValue] = useState(initialValue);
    const [location, setLocation] = useState([]);
    const [getState, setGetState] = useState([]);
    const [lga, setLga] = useState([]);    

    useEffect( () => {
        const url = 'http://locationsng-api.herokuapp.com/api/v1/states';
        axios.get(url)
        .then(res => {
            const stateList = res.data;
            setGetState(stateList);
        })

        const url2 = `http://locationsng-api.herokuapp.com/api/v1/states/${value}/lgas`;
        axios.get(url2)
        .then(res => {
            const lgas = res.data;
            setLga(lgas)
        })
    }, [value])
    const handleChange = (e) => {
        const targetLocation = e.target.value;
        setValue(targetLocation);
        setLocation(prevState => [...prevState, targetLocation])
    }
    console.log(location)
    return (
            <div className="dashboard create-ads">
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
                        <div className="pages-link">
                            <Link>Home</Link>
                            <img src={caretRight} alt="caret right"/>
                            <Link>Create an Ad</Link>
                        </div>
                        <div className="page-progress">
                            <div className="item first">
                                <img src={check} alt="ellipse1" />
                                <p>Ads details</p>
                            </div>
                            <div className="item">
                                <img src={ellipse1} alt="ellipse1" />
                                <p>Select a budget</p>
                            </div>
                            <div className="item">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Have a call</p>
                            </div>
                            <div className="item last">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Make payment</p>
                            </div>
                        </div>
                        <div className="content-form">
                            <div className="row">
                                <form>
                                    <h5>Select a budget</h5>
                                    <div className="price-list">
                                        <div className="tier">
                                            <p>Tier 1</p>
                                            <h4>#10,000</h4>
                                            <ul>
                                                <li>Realtime analytics</li>
                                                <li>Get 1-on-1 advice from a marketer</li>
                                                <li>Post ads on social media platforms</li>
                                                <li>One location only</li>
                                                <button>Choose budget</button>
                                            </ul>
                                        </div>
                                        <div className="tier">
                                            <p>Tier 2</p>
                                            <h4>#50,000</h4>
                                            <ul>
                                                <li>Realtime analytics</li>
                                                <li>Get 1-on-1 advice from a marketer</li>
                                                <li>Post ads on social media platforms</li>
                                                <li>Post ads on blogs</li>
                                                <li>Two location only</li>
                                                <button>Choose budget</button>
                                            </ul>
                                        </div>
                                        <div className="tier">
                                            <p>Tier 3</p>
                                            <h4>#100,000</h4>
                                            <ul>
                                                <li>Realtime analytics</li>
                                                <li>Get 1-on-1 advice from a marketer</li>
                                                <li>Post ads on social media platforms</li>
                                                <li>Post ads on blogs</li>
                                                <li>Post ads on news sites</li>
                                                <li>Three location only</li>
                                                <button>Choose budget</button>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="target-area">
                                        <div className="target-form">
                                
                                            <div className="form-group">
                                                <label htmlFor="">Target area</label><br></br>
                                                <select value={value} onChange={handleChange}>
                                                    {
                                                        getState.map(({ name }) => {
                                                            return(
                                                                <option key={name} value={name}>{name}</option>
                                                            )   
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="form-group">
                                            <label htmlFor="">Pick location</label><br></br>
                                                <select>
                                                    {
                                                        lga.map((result, index) => {
                                                            return(
                                                                <option key={index} value={result}>{result}</option>
                                                            )   
                                                        })
                                                    }
                                                </select>
                                                <p>You can pick up to three locations</p>
                                            </div>
                                            <div className="picked-locations">
                                                <h5>Picked Locations</h5>
                                                <div className="location-list">
                                                    {
                                                        location.map(place => {
                                                            return(
                                                                <p>{place}</p>
                                                            )   
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lower-btn">
                                        <p>Back</p>
                                        <button>
                                            <Link to='/request-call'>Save and continue</Link>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pricing;
