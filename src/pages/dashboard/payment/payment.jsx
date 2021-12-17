import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import '../../dashboard/payment/payment.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import fluttericon from '../../../assets/Frame 180.svg';
import { Link } from 'react-router-dom';
import Tags from '../../../components/Tags/Tags';
import logo from '../../../assets/image 1.png';
import hamburger from '../../../assets/hamburger.png';
import MobileTags from '../../../components/MobileTags/mobileTags';
import tick from '../../../assets/Frame 338.svg';

const Payment = () => {

    const token = 'FLWSECK_TEST-1af20f6cb3c2d471fb0cd00e1864422b-X';
    const random_string = 'MV_'+Math.floor((Math.random()*100000000)+1);
    console.log(random_string);
    const budgetId = localStorage.getItem("bd_ix");
    const [data, setData] = useState({
        name : '',
        email : '',
        phone : '',
        amount : 50000
    })
    const [data_2, setData_2] = useState({
        redirect_url : "https://moovitdigital.com",
        card : "card",
        tx_ref : random_string
    })
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);

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
        newForm.append("phonenumber" , data.phone);
        newForm.append("amount" , data.amount);
        newForm.append("redirect_url", data_2.redirect_url);
        newForm.append("payment_options", data_2.card);
        newForm.append("tx_ref", data_2.tx_ref);

        const authAxios = axios.create({
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-Type" : "application/json",
            }
        })

        authAxios.post('https://api.flutterwave.com/v3/payments', newForm)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    }
    let budget = ''
    if(budgetId == 1){
        budget = <h4>#10,000</h4>
    }else if(budgetId == 2){
        budget = <h4>#50,000</h4>
    }else if(budgetId == 3){
        budget = <h4>#100,000</h4>
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
                        {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
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
                            <Link to='#'>Home</Link>
                            <img src={caretRight} alt="caret right"/>
                            <Link to='#'>Create an Ad</Link>
                        </div>
                        <div className="page-progress">
                            <div className="item first">
                                <img src={tick} alt="ellipse1" />
                                <p>Select a budget</p>
                            </div>
                            <div className="item">
                                <img src={tick} alt="ellipse1" />
                                <p>Ads details</p>
                            </div>
                            <div className="item">
                                <img src={tick} alt="ellipse1" />
                                <p>Pick a template</p>
                            </div>
                            <div className="item ">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Make payment</p>
                            </div>
                            <div className="item last">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Have a call</p>
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
                                                {budget}
                                                <ul>
                                                    <li>Realtime analytics</li>
                                                    <li>Get 1-on-1 advice from a marketer</li>
                                                    <li>Post ads on social media platforms</li>
                                                    <li>Post ads on blogs</li>
                                                    <li>Two location only</li>
                                                    {/* <button></button> */}
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
