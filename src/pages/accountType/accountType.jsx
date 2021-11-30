import React, { useState } from 'react';
import '../accountType/accountType.scss';
import image from '../../assets/image 1.png';
import {Link} from 'react-router-dom';
import axios from 'axios';

const AccountType = () => {

    // const [Ads, SetAds] = useState();
    // const token = localStorage.getItem("auth_token");

    // axios({
    //     url : 'https://api.moovitdigital.com/api/user/user-ads',
    //     method : 'GET',
    //     config: { headers: {
    //         'Content-Type': 'multipart/form-data',
    //         'Authorization' : `Bearer ${token}`
    //         }
    //     }
    // })
    // .then(res => {
    //     if(res.status == 200){
    //         console.log(res.data)
    //         // history.push('/');
    //     }
    // })
    // .catch(err => console.log(err))

    return (
        <div className="account-type">
            <div className="small-wrapper">
                <img src={image} alt="logo" className="mb-2"/>
                <p>Choose an account type</p>

                <button>
                    <Link to='/user-registration'>Continue as an advertiser</Link>
                </button>
                <button className="thin">
                    <Link to='/publisher-form'>Continue as an publisher</Link>
                </button>

                <p>Don’t know yet? <span>Request a call now!</span></p>
            </div>
        </div>
    )
}

export default AccountType;
