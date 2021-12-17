import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import Tags from '../../../components/Tags/Tags';
import logo from '../../../assets/image 1.png';

const Profile = () => {
    const history = useHistory();
    const [profile, setProfile] = useState([])

    const id = localStorage.getItem("auth_id")
    const token = localStorage.getItem("auth_token")

    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        },
        withCredentials: false
    })
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    useEffect(()=> {
        const fetching = async () => {
            const profileData = await authAxios.get('/api/user/profile');
            const result = profileData.data;
            setProfile(result);
        }
        fetching()
    },[])
    console.log(profile.firstName)
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
                        {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <Tags style={style} handleClick={handleClick}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Profile</h4>
                            </div>
                            <div className="user-detail">
                                <div className="row justify-content-between align-item-top">
                                    <div className="col-md-5">
                                        <div className="content">
                                            <div className="row">
                                                <div className="col">
                                                    <h5>First Name</h5>
                                                    <p>{profile.firstName}</p>
                                                </div>
                                                <div className="col">
                                                    <h5>Last Name</h5>
                                                    <p>{profile.lastName}</p>
                                                </div>
                                            </div>  
                                        </div>
                                        <div className="content">
                                            <h5>Email</h5>
                                            <p>{profile.email}</p>
                                        </div>
                                        <div className="content">
                                            <h5>Account Type</h5>
                                            <p>{profile.role}</p>
                                        </div>
                                        <div className="content">
                                            <h5>Phone Number</h5>
                                            <p>{profile.phone}</p>
                                        </div>
                                        <div className="content">
                                            <h5>Company Name</h5>
                                            <p>{profile.company}</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 text-right">
                                        <button>
                                            <Link to='/advertiser/edit-profile'>Edit Profile</Link>
                                        </button>
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

export default Profile;
