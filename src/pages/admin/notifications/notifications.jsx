import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../notifications/notifications.scss';
import caretDown from '../../../assets/CaretDown.svg';
import avatar from '../../../assets/Ellipse 51.png';
import Trash from '../../../assets/Trash.svg';
import { Link } from 'react-router-dom';
import AdminTags from '../../../components/adminTags/adminTags';

const Notifications = () => {

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
    console.log(notification)
    return (
        <div className="dashboard notification">
            <div className="small-title">
                <div className="title-text">
                    {/* <p>The Brand Hub</p>
                    <img src={caretDown} alt="" /> */}
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags notification={notification}/>
                    </div>
                    <div className="dashboard-main ">
                        <div className="notification-wrapper">
                            <h3>Notifications</h3>
                            <div className="notification-list">
                                {
                                    notification.map(({id, type, notifiable_id, data, created_at}) => {
                                        console.log(created_at);
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

export default Notifications;
