import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import caretDown2 from '../../assets/CaretDown2.svg';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import signout from '../../assets/SignOut.svg';

const Tags = ({ style, handleClick }) => {

    const token = localStorage.getItem("auth_token");
    const history = useHistory();
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
        <div>
            <div className="tab-item">
                <img src={squares} alt="" />
                <Link to='/dashboard/advertiser'>Dashboard</Link>
            </div>
            <div className="tab-ads">
                <div className="tab-item mb-2">
                    <img src={megaphone} alt="" />
                    <p>Ads Management</p>
                    <img src={caretDown2} alt="" onClick={handleClick} 
                    style={{transform : style.transformArrow ? "rotate(180deg)" : "rotate(0deg)"}}/>
                </div>
                <div className="sub-track" style={{display : style.hide ? "block" : "none"}}>
                    <p className="mb-2"><Link to='/create-ads'>Create an Ad</Link></p>
                    <p className="mb-2"><Link to='/ads-history'>Ad History</Link></p>
                    <p className="mb-2"><Link to='/running-ads'>Running Ads</Link></p>
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
                <Link to='/support'>Support</Link>
            </div>
            <div className="tab-item">
                <img src={Handshake} alt="" />
                <Link to='/profile'>Profile</Link>
            </div>
            <div className="tab-item">
                <img src={signout} alt="" />
                <p onClick={handleLogout} className="logout">Logout</p>
            </div>
        </div>
    )
}

export default Tags
