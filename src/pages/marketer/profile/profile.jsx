import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import caretDown from '../../../assets/CaretDown.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import profileImage from '../../../assets/Userprofile.svg';
import axios from 'axios';

const MarketerProfile = () => {

    const history = useHistory;
    const [file_, setFile_] = useState(null);
    const [notification, setNotification] = useState([]);
    const [profile_update, setProfile_update] = useState({
        firstName : "",
        lastName : "",
        phone : ""
    })
    const handleChange = (e) => {
        e.persist();
        setProfile_update({...profile_update, [e.target.name] : e.target.value})
    }

    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const auth_name = localStorage.getItem("auth_name");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const updateFormSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName : profile_update.firstName,
            lastName : profile_update.lastName,
            phone : profile_update.phone,
        }

        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("phone", data.phone);
        newForm.append("image", file_.name);

        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.put(`/api/admin/edit-profile/${auth_id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&image=${file_.name}`)
        .then(res => {
            if(res.status === 200){
                console.log(res.data);
            }
        })
        .catch(error => console.log(error));
    }
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://api.moovitdigital.com/api/admin/logout')
        .then(res => {
            if(res.status === 200){
                localStorage.clear();
                history.push('/home');
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
    useEffect( () => {
        document.querySelector(".header").style.display = "none";
    })
    let notification_count = notification.length;
    console.log(profile_update);
    return (
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
                            <Link to='/marketer/dashboard'>Dashboard</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='/message'>Message</Link>
                        </div>
                        <div className="tab-item">
                            <img src={plus} alt="" />
                            <Link to='/marketer/tickets'>My Ticket</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/marketer/notification'>Notification <span style={{display
                 : notification_count < 1 ? "none" : "flex"}}>{notification_count}</span></Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/create-adcode'>Create Adcode</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/create-banner'>Create Banner</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/marketer/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p onClick={handleLogout} className="logout">Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main">
                        <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>Profile</h4>
                            </div>
                            <div className="user-detail">
                                <div className="profile-img">
                                    <img src={profileImage} alt="avatar" />
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <form onSubmit={updateFormSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">First Name</label>
                                                <input type="text" placeholder="John" name="firstName" onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Last Name</label>
                                                <input type="text" placeholder="Doe" name="lastName" onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Phone Number</label>
                                                <input type="text" placeholder="+234 8169 1140 01" name="phone" onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Upload profile image</label>
                                                <input type="file" name="image" 
                                                        onChange={(e) => setFile_( e.target.files[0])}
                                                        onClick={(event)=> { 
                                                            event.target.value = null
                                                    }}
                                                />
                                            </div>
                                            <div className="password">
                                                <p>Password</p>
                                                <Link>Change password</Link>
                                            </div>
                                            <button type="submit">Submit</button>
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

export default MarketerProfile;
