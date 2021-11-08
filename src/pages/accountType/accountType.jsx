import React, { useState } from 'react';
import '../accountType/accountType.scss';
import axios from 'axios';


const AccountType = () => {

    const [Ads, SetAds] = useState();
    const token = localStorage.getItem("auth_token");

    axios({
        url : 'https://api.moovitdigital.com/api/user/user-ads',
        method : 'GET',
        config: { headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization' : `Bearer ${token}`
            }
        }
    })
    .then(res => {
        if(res.status == 200){
            console.log(res.data)
            // history.push('/user-registration');
        }
    })
    .catch(err => console.log(err))

    return (
        <div className="account-type">
            <div className="small-wrapper">
                <h4>MoovIT</h4>
                <p>Choose an account type</p>

                <button>Continue as an advertiser</button>
                <button className="thin">Continue as an publisher</button>

                <p>Don’t know yet? <span>Learn more</span></p>
            </div>
        </div>
    )
}

export default AccountType;
