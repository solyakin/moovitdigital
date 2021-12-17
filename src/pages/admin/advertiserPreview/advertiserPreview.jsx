import React, {useState, useEffect} from 'react';
import '../../dashboard/dashboard.scss';
import '../../../pages/marketer/preview/preview.scss';
import AdminTags from '../../../components/adminTags/adminTags';
import swal from 'sweetalert';
import logo from '../../../assets/image 1.png';
import banner from '../../../assets/Rectangle 69.png';
import '../allAdvertisers/advertiser.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdvertiserPreview = () => {

    const [adsList, setAdsList] = useState([]);
    const [users, setUsers] = useState([]);
    const [notification, setNotification] = useState([]);
    const ticketData = JSON.parse(localStorage.getItem("targetData"));
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const tg_id = localStorage.getItem("tg_id");
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

            authAxios.get('/api/admin/ads')
                .then(response => {
                if(response.status == 200){
                    const data = response.data;
                    const adsListData = data.data.data;
                    setAdsList(adsListData)
                }
            })
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
    console.log(adsList)
    console.log(users)

    return (
        <div className="dashboard marketer-preview preview">
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
                                    <h4>Advertiser details</h4>
                                </div>
                                <div className="smm">
                                
                                </div>
                            </div>
                            <div className="preview-wrapper">
                                {
                                    users.filter(item => item.id == tg_id)
                                    .map(({id, firstName, lastName, email, phone, company, business_type, business_duration, business_bio}) => {
                                        return (
                                            <div className="prev-container" key={id}>
                                                <div className="ads-detail">
                                                    <div className="title mb-4">
                                                        <h5>Name</h5>
                                                        <p>{`${firstName} ${lastName}`}</p>
                                                    </div>
                                                    <div className="descritpion mb-4">
                                                        <h5>Business Bio</h5>
                                                        <p>{business_bio} consectetur adipisicing elit. Numquam unde doloremque vero fuga, deserunt ipsam. Neque necessitatibus sunt at reiciendis labore </p>
                                                    </div>
                                                    <div className="budget mb-4">
                                                        <h5>Company</h5>
                                                        <p>{company}</p>
                                                    </div>
                                                    <div className="dates mb-4">
                                                        <div className="start">
                                                            <h5>Business Size</h5>
                                                            <p>{business_type}</p>
                                                        </div>
                                                        <div className="end">
                                                            <h5>Business Duration</h5>
                                                            <p>{business_duration}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="sender">
                                                    <div className="sender-profile">
                                                        <h5>Contact</h5>
                                                        <p className="email">{email}</p>
                                                        <p>{phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>   
                            <div className="all-ads">
                                <h4>Ads History</h4>
                                <div className="history-table">
                                    <table className="table admin-view">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Campaign Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Impression</th>
                                            <th scope="col">Likes</th>
                                            <th scope="col">Start</th>
                                            <th scope="col">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            adsList.filter(item => item.createdBy == tg_id)
                                            .map(({id, title, start, location, content, impression, likes, }) => {
                                                return(
                                                    <tr key={id}>
                                                    <th scope="row">
                                                        <input type="checkbox" name="" id="" />
                                                    </th>
                                                    <td className="text-left">{title}</td>
                                                    <td>{content}</td>
                                                    <td>TIER 2</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td className="text-left">{start}</td>
                                                    <td className="text-left">{location}</td>
                                                    {/* <td>
                                                        <Link to='/admin/preview' id={id} onClick={handleClick}>Preview</Link>
                                                    </td> */}
                                                </tr>

                                                )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div> 
                            {/* <div className="lower-btns">
                                <Link to='/marketer/dashboard'>Back</Link>
                                <button>Confirmed</button>
                            </div> */}
                        </div>
                    </div>  
                </div>  
            </div>
        </div>
    )
}

export default AdvertiserPreview;

