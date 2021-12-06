import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import '../../admin/ads-ticket/ads-ticket.scss';
import caretDown from '../../../assets/CaretDown.svg';
import paperclip from '../../../assets/Paperclip.svg';
import userP from '../../../assets/Ellipse 48.png';
import usericon from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';

const Tickets = () => {

    const [hide, setHide] = useState("none");
    const [alert, setAlert] = useState("none");
    const [response, setResponse] = useState([]);
    const [adsList, setAdsList] = useState([]);
    const [notification, setNotification] = useState([]);
    const [user, setUser] = useState([]);
    // const [assignedStaff, setAssignedStaff] = useState("");
    const history = useHistory();
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
   
    useEffect( ()=> {
        document.querySelector(".header").style.display = "none"    
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
    let notification_count = notification.length;
    //grabbing the ticket via the id
    // const assignClick = (e) => {
    //     e.preventDefault();
    //     const { id } = e.currentTarget.parentElement.parentElement;
    //     console.log(id)
    //     setHide("block");
    //     setAssignedStaff(id)
    // }

    //handling the assign to marketer
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     const { id } = e.currentTarget;
    //     const data = {
    //         assigned : id
    //     }
    //     const assignTask = async () => {
    //         const query = await authAxios.put(`/api/admin/assign-ads/${assignedStaff}`, data);
    //         const res = query.data;
    //         setResponse(res);
    //     }
    //     assignTask(); 
    //     setAlert("block")
    // }
    const newArray = adsList.filter(ele => {
        return ele.assigned === auth_id;
    })
    console.log(user)
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
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="caret down" />
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
                            <Link to='/admin/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p onClick={handleLogout} className="logout">Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main admin">
                        <div className="ads-heading">
                            <p>My Tickets</p>
                        </div>
                        <div className="ads-wrapper">
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
                                                        <Link to={`/marketer/preview-advert/${id}`} id={id} onClick={handleClick_}>Preview</Link>
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
