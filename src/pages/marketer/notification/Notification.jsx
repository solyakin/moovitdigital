import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../../pages/dashboard/dashboard.scss';
import '../../../pages/admin/notifications/notifications.scss';
import avatar from '../../../assets/Ellipse 51.png';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import usericon from '../../../assets/User.svg';
import plus from '../../../assets/Plus.svg';
import logo from '../../../assets/image 1.png';
import { Link, useHistory } from 'react-router-dom';

const MarketerNotification = () => {
    const history = useHistory();
    const [notification, setNotification] = useState([]);
    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
        }
        fetchData();
    },[])
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://test.canyousing.com.ng/api/admin/logout')
        .then(res => {
            if(res.status === 200){
                history.push('/home');
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
    let notification_count = notification.length;
    console.log(notification)
    return (
        <div className="dashboard notification">
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
                    <div className="dashboard-main ">
                        <div className="notification-wrapper">
                            <h3>Notifications</h3>
                            <div className="notification-list">
                                {
                                    notification.map(({id, type, notifiable_id, data, created_at}) => {
                                        console.log(data);
                                        const date_ = created_at.split("T")[0];
                                        const time_ = created_at.split("T")[1];
                                        const time_value = time_.split(".")[0];
                                        let dynamic_text = ""
                                            if(type = "App\Notifications\NewAdvertNotification"){
                                                dynamic_text = "new ads"
                                            }
                                            console.log(dynamic_text)
                                        return <div className="notif-inner-wrapper" key={id}>
                                                    <div className="notification-card" >
                                                        <img src={avatar} alt="" />
                                                        <div className="list-text">
                                                            <h5>{data.title} requested to put up a {dynamic_text}</h5>
                                                            <p>{date_} | {time_value}</p>
                                                        </div>
                                                    </div>
                                                    <div className="actions">
                                                        <button>Mark as read</button>
                                                    </div>
                                                </div>
                                    })
                                } 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    )
}

export default MarketerNotification
