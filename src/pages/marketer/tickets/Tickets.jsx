import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import '../../admin/ads-ticket/ads-ticket.scss';
import paperclip from '../../../assets/Paperclip.svg';
import userP from '../../../assets/Ellipse 48.png';
import usericon from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';
import logo from '../../../assets/image 1.png';

const Tickets = () => {

    const [state, setState] = useState({
        show : true,
        show1 : false,
        show2 : false,
        show3 : false
    })
    const [adsList, setAdsList] = useState([]);
    const [notification, setNotification] = useState([]);
    const [user, setUser] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
   
    const allClick = (e) => {
        e.preventDefault();
        setState({show : true, show1 : false, show2 : false, show3 : false})
    }
    const pendingClick = (e) => {
        e.preventDefault();
        setState({show : false, show1 : true, show2 : false, show3 : false})
    }
    const approvedClick =(e) => {
        e.preventDefault();
        setState({show : false, show1 : false, show2 : true, show3 : false})
    }
    const declineClick = (e) => {
        e.preventDefault();
        setState({show : false, show1 : false, show2 : false, show3 : true});
    }

    const newItems = adsList.filter(item => item.active !== null);
    console.log(newItems);
    const ApprovedList = adsList.filter(item => item.approved == 1);
    console.log(ApprovedList)
    const unassignedList = adsList.filter(item => item.approved == 0);
    console.log(unassignedList)

    useEffect( ()=> {    
        const fetchData = async () =>{
            const allAds = await authAxios.get('/api/admin/ads');
            const response = allAds.data;
            const adsListData = response.data.data;
            setAdsList(adsListData);

            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);

            const allUsers = await authAxios.get('/api/admin/users');
            const queryResponse = allUsers.data;
            const staffData = queryResponse.data.data;
            setUser(staffData);
        }
        fetchData();
    },[])
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
    const newArray = adsList.filter(ele => {
        return ele.assigned == auth_id;
    })

    const handleClick_ = (e) => {
        const targetId = e.target.id;
        const targetData = adsList.filter(ele => {
                return ele.id == targetId;
            })
        localStorage.setItem("targetData", JSON.stringify(targetData));
        localStorage.setItem("targetId", targetId);
    }
    return (
        <div className="dashboard ads-ticket">
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
                            <img src={usericon} alt="" />
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
                    <div className="dashboard-main admin">
                        <div className="ads-heading">
                            <p onClick={allClick} style={{color : state.show ? "#EE315D" : "#333333"}}>All</p>
                            <p onClick={pendingClick} style={{color : state.show1 ? "#EE315D" : "#333333"}}>Pending</p>
                            <p onClick={declineClick} style={{color : state.show3 ? "#EE315D" : "#333333"}}>Decline</p>
                            <p onClick={approvedClick} style={{color : state.show2 ? "#EE315D" : "#333333"}}>Approved</p>
                        </div>
                        <div className="ads-wrapper" style={{display : state.show ? "block" : "none"}}>
                            <div className="ads-ticket-list">
                                <div className="row">
                                    {
                                        newArray.map(({id, title, content, image, createdBy}) => {

                                            const getuser = user.filter(item => item.id == createdBy);
                                            let userValue = "";
                                            let user_email = "";
                                            let user_phone = "";
                                            getuser.map(({firstName, lastName, email, phone}) => {
                                                userValue = <span>{firstName} {lastName}</span>
                                                user_email = email;
                                                user_phone = phone;
                                            })
                                            return(
                                                <div className="col-lg-4" key={id}>
                                                    <div className="ads-card" id={id}>
                                                        <div className="card-title">
                                                            <h5>{title}</h5>
                                                            <div className="files">
                                                                <img src={paperclip} alt="" />
                                                                <span>2 files</span>
                                                            </div>
                                                        </div>
                                                        <h6>TIER 2</h6>
                                                        <p>{`${content} smet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim...`}</p>
                                                        <div className="user-profile" id={createdBy}>
                                                            <img src={userP} alt="" />
                                                            <p>Created by {userValue}</p>
                                                        </div>
                                                        <div className="instruct-btns">
                                                            <Link to={`/marketer/preview-advert/`} id={id} onClick={handleClick_}>Preview</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="assigned-list" style={{display
                         : state.show1 ? "block" : "none"}}>
                            <div className="ads-wrapper">
                                <div className="row">
                                    {
                                        newItems.map(({id, title, content, image, createdBy}) => {
                                            return(
                                                <div className="col-lg-4" key={id}>
                                                    <div className="ads-card" id={id}>
                                                        <div className="card-title">
                                                            <h5>{title}</h5>
                                                            <div className="files">
                                                                <img src={paperclip} alt="" />
                                                                <span>2 files</span>
                                                            </div>
                                                        </div>
                                                        <h6>TIER 2</h6>
                                                        <p>{`${content} smet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim...`}</p>
                                                        <div className="user-profile" id={createdBy}>
                                                            <img src={userP} alt="" />
                                                            <p>Created by <span>Jon Bellion</span></p>
                                                        </div>
                                                        <div className="instruct-btns">
                                                            <Link to={`/marketer/preview-advert/`} id={id} onClick={handleClick_}>Preview</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="approved-list" style={{display : state.show2 ? "block" : "none" }}>
                            <div className="ads-wrapper">
                                <div className="row">
                                    {
                                        ApprovedList.map(({id, title, content, image, createdBy}) => {
                                            return(
                                                <div className="col-lg-4" key={id}>
                                                    <div className="ads-card" id={id}>
                                                        <div className="card-title">
                                                            <h5>{title}</h5>
                                                            <div className="files">
                                                                <img src={paperclip} alt="" />
                                                                <span>2 files</span>
                                                            </div>
                                                        </div>
                                                        <h6>TIER 2</h6>
                                                        <p>{`${content} smet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim...`}</p>
                                                        <div className="user-profile" id={createdBy}>
                                                            <img src={userP} alt="" />
                                                            <p>Created by <span>Jon Bellion</span></p>
                                                        </div>
                                                        <div className="instruct-btns">
                                                            <Link to={`/marketer/preview-advert/`} id={id} onClick={handleClick_}>Preview</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="unassigned" style={{display : state.show3 ? "block" : "none"}}>
                            <div className="ads-wrapper">
                                <div className="row">
                                    {
                                        unassignedList.map(({id, title, content, image, createdBy}) => {
                                            return(
                                                <div className="col-lg-4" key={id}>
                                                    <div className="ads-card" id={id}>
                                                        <div className="card-title">
                                                            <h5>{title}</h5>
                                                            <div className="files">
                                                                <img src={paperclip} alt="" />
                                                                <span>2 files</span>
                                                            </div>
                                                        </div>
                                                        <h6>TIER 2</h6>
                                                        <p>{`${content} smet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim...`}</p>
                                                        <div className="user-profile" id={createdBy}>
                                                            <img src={userP} alt="" />
                                                            <p>Created by <span>Jon Bellion</span></p>
                                                        </div>
                                                        <div className="instruct-btns">
                                                            <Link to={`/marketer/preview-advert/`} id={id} onClick={handleClick_}>Preview</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default Tickets;
