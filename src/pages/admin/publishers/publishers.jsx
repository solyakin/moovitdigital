import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import axios from 'axios';
import '../../admin/admin.scss';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import AdminTags from '../../../components/adminTags/adminTags';
import '../allAdvertisers/advertiser.scss';
import logo from '../../../assets/image 1.png';

const AllPublishers = () => {
    const [notification, setNotification] = useState([]);
    const [adsCount, setAdscount] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`,
            'Content-Type' : "applciation/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers' : 'X-Requested-With, Content-Type, X-Token-Auth, Authorization',
            'Access-Control-Allow-Credentials' : 'true'
        }
    })
    useEffect(() => {
       const fetching = async () => {
            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications;
            console.log(notification_array);
            setNotification(notification_array);

            authAxios.get('/api/admin/publisher')
            .then(res => {
                const result = res.data.data;
                setAdscount(result);
            })
            .catch( err => console.log(err))
        }
       fetching()
       .then(() => {
           setLoading(false)
       })
    }, [])
    const handleClick = (e) => {
        const targetId = e.target.id;
        localStorage.setItem("tg_id", targetId);
    }
    console.log(adsCount)

    let valuesArray = Object.values(adsCount);
    console.log(valuesArray)
    
    return (
        <div className="dashboard preview">
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
                    <div className="dashboard-main admin">
                        {
                            isLoading ? <Loader type="Bars"
                            color="#EE315D"
                            height={30}
                            width={40}/> : (
                                <>
                                <div className="main-heading mb-4">
                                    <div className="welcome">
                                        <h4>Publishers List</h4>
                                    </div>
                                    <div className="smm">
                                        <input type="text" placeholder="search"/>
                                    </div>
                                </div>
                                <div className="history-table">
                                    <table className="table admin-view">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Business Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Phone Number</th>
                                            <th scope="col">Business Bio</th>
                                            <th scope="col">Business Turnover</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                            valuesArray.map(({id, firstName, lastName, email, phone, business_bio, company, turnover}) => {
                                                return(
                                                    <tr key={id}>
                                                    <th scope="row">
                                                        <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td className="text-left">{`${firstName} ${lastName}`}</td>
                                                        <td className="text-left">{company}</td>
                                                        <td className="text-left">{email}</td>
                                                        <td className="text-left">{phone}</td>
                                                        <td className="text-left">{business_bio}</td>
                                                        <td className="text-left">{turnover}</td>
                                                        <td>
                                                        <td>
                                                            <Link to='/admin/advertiser/preview' id={id} onClick={handleClick}>Preview</Link>
                                                        </td>
                                                        </td>
                                                    </tr>

                                                )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </>
                            )
                        }
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default AllPublishers;
