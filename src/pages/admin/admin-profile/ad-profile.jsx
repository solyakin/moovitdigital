import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import caretDown from '../../../assets/CaretDown.svg';
import AdminTags from '../../../components/adminTags/adminTags';
import profileImage from '../../../assets/Userprofile.svg';
import axios from 'axios';

const AdminProfile = () => {

    const [file_, setFile_] = useState(null);
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
    const id = localStorage.getItem("auth_id");

    const updateFormSubmit = (e) => {
        e.preventDefault();

        const data = {
            firstName : profile_update.firstName,
            lastName : profile_update.lastName,
            phone : profile_update.phone,
            // image : file_.name
        }
        console.log(data.image)

        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("phone", data.phone);
        // newForm.append("image", file_);

        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.put(`/api/admin/edit-profile/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&image=${"image.png"}`, newForm)
        .then(res => {
            if(res.status === 200){
                console.log(res.data);
            }
        })
        .catch(error => console.log(error));
    }

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
                        <AdminTags />
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

export default AdminProfile;
