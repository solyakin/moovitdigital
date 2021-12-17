import React, {useState, useEffect} from 'react';
import '../../dashboard/dashboard.scss';
import '../../../pages/marketer/preview/preview.scss';
import AdminTags from '../../../components/adminTags/adminTags';
import swal from 'sweetalert';
import banner from '../../../assets/Rectangle 69.png';
import axios from 'axios';
import { Link } from 'react-router-dom';
import icon4 from '../../../assets/Frame 3333.svg';
import logo from '../../../assets/image 1.png';
import tick from '../../../assets/Frame 338.svg';

const AdminPreview = () => {

    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState([]);
    const ticketData = JSON.parse(localStorage.getItem("targetData"));
    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    useEffect(() => {
        const fetchingData = async() => {
            const allUsers = await authAxios.get('/api/admin/users')
            const users_data = allUsers.data
            setUsers(users_data.data.data);

            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
        }
        fetchingData()
    }, [])
    const handleApprove = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        console.log(id)
        const data = {
            approved : 1
        }
        const approveAds = async () => {
            const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
            const res = query.data;
            swal("Great!", "Ads Approved successfully!", "success");
            console.log(res);
        }
        approveAds();
    }
    const handleReject = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        console.log(id)
        const data = {
            approved : 0
        }
        const rejectAds = async () => {
            const query = await authAxios.put(`/api/admin/approve-ads/${id}`, data);
            const res = query.data;
            swal("Great!", "Ads Rejected successfully!", "success");
            console.log(res);
        }
        rejectAds();
    }
    return (
        <div className="dashboard marketer-preview">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/home'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
    
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags notification={notification}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="preview-content">
                            <div className="main-heading">
                                <div className="welcome">
                                    <h4>Ads details</h4>
                                </div>
                                <div className="smm">
                                    <p>Assigned to you</p>
                                    <img src={banner} alt="" />
                                </div>
                            </div>
                            <div className="preview-wrapper">
                                {
                                    ticketData.map(({id, title, content, start, end, area, location, budget_id, image, approved, createdBy, phone}) => {
                                        const target_region = area.split(",");
                                        let price = "";
                                        if(budget_id == 1){
                                            price = "#10,000"
                                        }else if(budget_id == 2){
                                            price = "#50,000"
                                        }else if(budget_id = 3){
                                            price = "#100,000"
                                        }

                                        const getuser = users.filter(item => item.id == createdBy);
                                        let userValue = "";
                                        let user_email = "";
                                        let user_phone = "";
                                        getuser.map(({firstName, lastName, email, phone}) => {
                                            userValue = <span>{firstName} {lastName}</span>
                                            user_email = email;
                                            user_phone = phone;
                                        })

                                        let approvedBtn = '';
                                        if(approved == 0){
                                                approvedBtn = <div className="approve-text d-flex align-item-center">
                                                                <p className="reject">Rejected</p>
                                                                <img src={icon4} alt="" width="15px"/>
                                                            </div>
                                        } else if(approved == 1) {
                                            approvedBtn = <div className="approve-text d-flex align-item-center">
                                                            <p>Approved</p>
                                                            <img src={tick} alt="" width="15px"/>
                                                        </div>
                                        }else{
                                            approvedBtn = <div className="row d-flex justify-content-between">
                                                <div className="col-6">
                                                    <button className="approve" id={id} onClick={handleApprove}>Approve</button>
                                                </div>
                                                <div className="col-6">
                                                    <button id={id} onClick={handleReject}>Reject</button>
                                                </div>
                                            </div> 
                                        }
                                        return <div className="prev-container" key={id}>
                                            <div className="ads-detail">
                                                <div className="title mb-4">
                                                    <h5>Title</h5>
                                                    <p>{title}</p>
                                                </div>
                                                <div className="descritpion mb-4">
                                                    <h5>Description</h5>
                                                    <p>{content} consectetur adipisicing elit. Numquam unde doloremque vero fuga, deserunt ipsam. Neque necessitatibus sunt at reiciendis labore perspiciatis</p>
                                                </div>
                                                <div className="campaign mb-4">
                                                    <h5>Campaign type</h5>
                                                    <div className="campaign-list">
                                                        <span>Conversion</span>
                                                        <span>Traffic</span>
                                                        <span>Sales</span>
                                                        <span>Engagement</span>
                                                    </div>
                                                </div>
                                                <div className="budget mb-4">
                                                    <h5>Budget</h5>
                                                    <p>{price}</p>
                                                </div>
                                                <div className="dates mb-4">
                                                    <div className="start">
                                                        <h5>Start date</h5>
                                                        <p>{start}</p>
                                                    </div>
                                                    <div className="end">
                                                        <h5>End date</h5>
                                                        <p>{end}</p>
                                                    </div>
                                                </div>
                                                <div className="target-area mb-4">
                                                    <h5>Target Area</h5>
                                                    <p>{location}</p>
                                                </div>
                                                <div className="location mb-4">
                                                    <h5>Location</h5>
                                                    <div className="locations">
                                                        <span>{target_region[0]}</span>
                                                        <span>{target_region[1]}</span>
                                                        <span>{target_region[2]}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sender">
                                                <div className="sender-profile">
                                                    <h5>Created by</h5>
                                                    <div className="sender-info">
                                                        <img src={banner} alt="" />
                                                        <p>{userValue}</p>
                                                    </div>
                                                    <p className="email">{user_email}</p>
                                                    <p>{phone}</p>
                                                </div>
                                                <div className="banner">
                                                    <h5>Upload Banner</h5>
                                                    <div className="banner-img">
                                                        <a href="#" download="banner">
                                                        <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="banner" />
                                                        </a>
                                                        
                                                        <img src={banner} alt="" />
                                                    </div>

                                                </div>
                                                <div className="action-btns mt-5">
                                                    {approvedBtn}
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>    
                            <div className="lower-btns">
                                <Link to='/marketer/dashboard'>Back</Link>
                                <button>Confirmed</button>
                            </div>
                        </div>
                    </div>  
                </div>  
            </div>
        </div>
    )
}

export default AdminPreview;

