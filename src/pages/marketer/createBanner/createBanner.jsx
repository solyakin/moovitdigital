import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import '../../marketer/createBanner/createbanner.scss';
import logo from '../../../assets/image 1.png';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';
import signout from '../../../assets/SignOut.svg';
import axios from 'axios';
import swal from 'sweetalert';

const CreateBanner = () => {

    const history = useHistory()
    const [loading, setLoading] = useState(false); 
    const [notification, setNotification] = useState([]);
    const [file, setFile] = useState(null);
    const [banner, setBanner] = useState({
        name : '',
        banner : '',
        width : '',
        height : '',
        description : '',
        url : ''
    })

    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const auth_name = localStorage.getItem("auth_name");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const handleChange = (e) => {
        e.persist();
        setBanner({...banner, [e.target.name] : e.target.value});
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const newData = new FormData();
        newData.append('name', banner.name);
        newData.append('banner', file);
        newData.append('width', banner.width);
        newData.append('height', banner.height);
        newData.append('description', banner.description);
        newData.append('url', banner.url);

        authAxios.post('https://test.canyousing.com.ng/api/admin/banners', newData)
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                swal("Great!", "Banner created successfully!", "success");
                setLoading(false)
                setBanner({name : '',
                banner : '',
                width : '',
                height : '',
                description : '',
                url : ''})
            }
        })
        .catch(err => console.log(err))
    }
    
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://test.canyousing.com.ng/api/admin/logout')
        .then(res => {
            if(res.status === 200){
                localStorage.clear();
                history.push('/home');
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
    let notification_count = notification.length;
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/home'>
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
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <Link to='/marketer/dashboard'>Dashboard</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='#'>Message</Link>
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
                                <h4>Upload new banner</h4>
                            </div> 
                             <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form onSubmit={formSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Title</label>
                                                <input type="text" name="name" value={banner.name} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Banner</label>
                                                <input type="file" name="image" 
                                                        onChange={(e) => setFile( e.target.files[0])}
                                                        onClick={(event)=> { 
                                                            event.target.value = null
                                                    }}
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <div className="form-group">
                                                        <label htmlFor="">width</label>
                                                        <input type="text" name="width" value={banner.width} onChange={handleChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="">Height</label>
                                                        <input type="text" name="height" value={banner.height} onChange={handleChange} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Description</label>
                                                <textarea name="description" id="" cols="10" rows="3" placeholder="enter message here" value={banner.description} onChange={handleChange}></textarea>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">URL</label>
                                                <input type="text"  name="url" value={banner.url} onChange={handleChange}/>
                                            </div>
                                            <button type="submit">Send</button>
                                            <div className="spinner" style={{display : loading ? "block" : "none"}}>
                                                <Loader type="TailSpin" color="#EE315D" height={30} width={30} />
                                            </div>
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

export default CreateBanner;
