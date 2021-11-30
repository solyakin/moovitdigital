import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import Tags from '../../../components/Tags/Tags';
import caretDown from '../../../assets/CaretDown.svg';
import profileImage from '../../../assets/Userprofile.svg';
import logo from '../../../assets/image 1.png';

const Profile = () => {

    const [profile, setProfile] = useState({
        firstName : '',
        lastName : '',
        number : '',
        image : '',
    })

    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    const handleChange = (e) => {
        e.persist();
        setProfile({...profile, [e.target.name] : e.target.value});
    }
    const id = localStorage.getItem("auth_id")
    const token = localStorage.getItem("auth_token")

    useEffect(() => {
        document.querySelector(".header").style.display = "none";
    }, [])
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : 'multipart/form-data'
        },
        withCredentials: false
    })
    
    const formSubmit = async (e) => {
        e.preventDefault();
        const data = {
            firstName : profile.firstName,
            lastName : profile.lastName,
            phone : profile.number,
            image : profile.image
        }

        const newData = new FormData();
        newData.append('firstName', data.firstName);
        newData.append('lastName', data.lastName);
        newData.append('phone', data.phone);
        newData.append('image', data.image);

        const postingData = await authAxios.put(`user/edit-profile/${id}`, newData);
        const response = postingData.data;
        console.log(response);

        // axios({
        //     url : `https://api.moovitdigital.com/api/`,
        //     method : 'PUT',
        //     data : newData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        // .then(res => {
        //     if(res.status == 200){
        //         console.log(res.data)
        //     }
        // })
        // .catch(err => console.log(err))
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
                        <Tags style={style} handleClick={handleClick}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="ads-wrapper">
                            <div className="ads-heading">
                                <h4>Profile</h4>
                            </div>
                            <div className="user-detail">
                                <div className="profile-img">
                                    <img src={profileImage} alt="avatar" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <form onSubmit={formSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">First Name</label>
                                                <input type="text" placeholder="Doe" name="firstName" value={profile.firstName} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Last Name</label>
                                                <input type="text" placeholder="John" name="lastName" value={profile.lastName} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Phone Number</label>
                                                <input type="text" placeholder="+234 8169 1140 01" name="number" value={profile.number} onChange={handleChange}/>
                                            </div>
                                            <div className="password">
                                                <p>Password</p>
                                                <Link>Change password</Link>
                                            </div>
                                            <button type="submit" className="btn btn-lg mt-4">Submit</button>
                                        </form>
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
