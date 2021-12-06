import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import '../../dashboard/payment/payment.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import check from '../../../assets/Progress Tick Done.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import fluttericon from '../../../assets/Frame 180.svg';
import { Link } from 'react-router-dom';
import Tags from '../../../components/Tags/Tags';
import logo from '../../../assets/image 1.png';
import hamburger from '../../../assets/hamburger.png';
import MobileTags from '../../../components/MobileTags/mobileTags';

const Payment = () => {

    const token = localStorage.getItem("auth_token")
    const [data, setData] = useState({
        name : '',
        email : '',
        phone : '',
        amount : 50000
    })
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
    }, [])

    const handleChange = (e) => {
        e.persist();
        setData({...data, [e.target.name] : e.target.value});
    }
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        newForm.append("name" , data.name);
        newForm.append("email" , data.email);
        newForm.append("phone" , data.phone);
        newForm.append("amount" , data.amount);

        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
                contentType : "application/json",
            }
        })

        authAxios.post('/pay')
        .then(res => {
            res.header("Access-Control-Allow-Headers","*");
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    }
    return (
            <div className="dashboard create-ads">
                <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <img src={hamburger} alt="hamburger" width="25px" className="hamburger" onClick={toggler}/>
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
                        <Tags style={style} handleClick={handleClick} />
                    </div>
                    <div className="mobile-tag">
                        <MobileTags style={style} handleClick={handleClick} ham={ham}/>
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
                                <img src={check} alt="ellipse1" />
                                <p>Select a budget</p>
                            </div>
                            <div className="item">
                                <img src={check} alt="ellipse1" />
                                <p>Have a call</p>
                            </div>
                            <div className="item last">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Make payment</p>
                            </div>
                        </div>
                        <div className="payment">
                            <div className="pay-heading">
                                <h5>Make payment</h5>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <form onSubmit={handleSubmit}>
                                        <p>Payment method</p>
                                        <img src={fluttericon} alt="icon" />
                                        <div className="form-group">
                                            <label htmlFor=""> Full Name</label><br></br>
                                            <input type="text" placeholder="John doe" name="name" value={data.name} onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=""> Email-address</label><br></br>
                                            <input type="email" placeholder="John@doe.com"  name="email" value={data.email} onChange={handleChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor=""> Phone Number</label><br></br>
                                            <input type="text" placeholder="081 345 667 231"  name="phone" value={data.phone} onChange={handleChange}/> 
                                        </div>

                                        <button type="submit">Pay Now</button>
                                    </form>
                                </div>
                                <div className="col">
                                    <div className="content-form">
                                        <h5>Price List</h5>
                                        <div className="price">
                                            <div className="tier">
                                                <p>Tier 2</p>
                                                <h4>#50,000</h4>
                                                <ul>
                                                    <li>Realtime analytics</li>
                                                    <li>Get 1-on-1 advice from a marketer</li>
                                                    <li>Post ads on social media platforms</li>
                                                    <li>Post ads on blogs</li>
                                                    <li>Two location only</li>
                                                    <button>Change budget</button>
                                                </ul>
                                            </div>
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

export default Payment;
