import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../../pages/dashboard/dashboard.scss';
import '../../../pages/admin/notifications/notifications.scss';
import caretDown from '../../../assets/CaretDown.svg';
import avatar from '../../../assets/Ellipse 51.png';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import user from '../../../assets/User.svg';
import { Link, useHistory } from 'react-router-dom';

const MarketerNotification = () => {

    const history = useHistory();
    const [notification, setNotification] = useState([]);
    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    useEffect(() => {
        document.querySelector(".header").style.display = "none";
        const fetchData = async () => {
            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
        }
        fetchData();
    },[])
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://api.moovitdigital.com/api/admin/logout')
        .then(res => {
            if(res.status === 200){
                history.push('/home');
            }
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }
    console.log(notification)
    return (
        <div className="dashboard notification">
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
                            <img src={user} alt="" />
                            <Link to='marketer/notification'>Notification</Link>
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
                                                            <h5>{data.firstName} requested to put up a {dynamic_text}</h5>
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
