import React, {useState, useEffect} from 'react';
import '../../dashboard/dashboard.scss';
import '../messages/message.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminTags from '../../../components/adminTags/adminTags';
import caretDown from '../../../assets/CaretDown.svg';
import user from '../../../assets/Ellipse 51.png';
import pencil from '../../../assets/PencilSimple.svg';
import search from '../../../assets/MagnifyingGlass.svg';
import trash from '../../../assets/Trash.svg';
import Arrow from '../../../assets/ArrowBendUpLeft.svg';

const Message = () => {

    // const [ads, setAds] = useState(0);
    const [adsList, setAdsList] = useState([]);
    const [adsCount, setAdsCount] =useState(0);
    const [pubCount, setpubCount] = useState(0);
    const [staff, setStaff] = useState(0);

    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    
    useEffect(() => {
        const fetchData = async () => {
            const allAds = await authAxios.get('/api/admin/ads');
            const response = allAds.data;
            const adsListData = response.data.data;
            setAdsList(adsListData);

            const allAdvertisers = await authAxios.get('/api/admin/advertiser');
            const res = allAdvertisers.data;
            const adsCount = res.data;
            for (const [key, value] of Object.entries(adsCount)) {
                const allCount = key;
                setAdsCount(allCount);
            }

            const allPublishers = await authAxios.get('/api/admin/publisher');
            const result = allPublishers.data;
            const pubData = result.data
            for(const[key, value] of Object.entries(pubData)){
                const allPubCount = key;
                setpubCount(allPubCount);
            }

            const allStaff = await authAxios.get('/api/admin/staff');
            const queryResponse = allStaff.data;
            const staffData = queryResponse.data.data.length;
            setStaff(staffData);
        }

        // authAxios.get('/api/admin/ads')
        //         .then(response => {
        //         if(response.status == 200){
        //             const data = response.data;
        //             const adsListData = data.data.data;
        //             setAdsList(adsListData)
        //         }
        //     })
        //     .then(response => {
        //         authAxios.get('/api/admin/advertiser')
        //         .then(res => {
        //             const data = res.data;
        //             console.log(data)
        //         })
                
        //     })
        // .catch( err => console.log(err))
        fetchData();
    }, [])
    
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
                    <div className="dashboard-main message">
                        <div className="msg-container">
                            <div className="msg-list">
                                <div className="headings">
                                    <h5>Messages</h5>
                                    <img src={pencil} alt="" />
                                </div>
                                <div className="search-wrapper mt-3">
                                    <img src={search} alt="" />
                                    <input type="text" placeholder="search" />
                                </div>
                                <div className="msg-queue mt-3">
                                    <div className="today">
                                        <h6 className="h-text mb-3">Today</h6>
                                        <div className="msg-item">  
                                            <div className="msg-wrapper">
                                                <img src={user} alt="" />
                                                <div className="msg-info">
                                                    <h6>Jon Bellion</h6>
                                                    <p>Ads are not loading</p>
                                                    <p className="content">Good day, I wanted to up...</p>
                                                </div>
                                                
                                            </div>
                                            <div className="time">
                                                    <p>12.03</p>
                                            </div>
                                        </div>
                                        <div className="msg-item">  
                                            <div className="msg-wrapper">
                                                <img src={user} alt="" />
                                                <div className="msg-info">
                                                    <h6>Jon Bellion</h6>
                                                    <p>Ads are not loading</p>
                                                    <p className="content">Good day, I wanted to up...</p>
                                                </div>
                                                
                                            </div>
                                            <div className="time">
                                                    <p>12.03</p>
                                            </div>
                                        </div>
                                        <div className="msg-item">  
                                            <div className="msg-wrapper">
                                                <img src={user} alt="" />
                                                <div className="msg-info">
                                                    <h6>Jon Bellion</h6>
                                                    <p>Ads are not loading</p>
                                                    <p className="content">Good day, I wanted to up...</p>
                                                </div>
                                                
                                            </div>
                                            <div className="time">
                                                    <p>12.03</p>
                                            </div>
                                        </div>
                                        <div className="msg-item">  
                                            <div className="msg-wrapper">
                                                <img src={user} alt="" />
                                                <div className="msg-info">
                                                    <h6>Jon Bellion</h6>
                                                    <p>Ads are not loading</p>
                                                    <p className="content">Good day, I wanted to up...</p>
                                                </div>
                                                
                                            </div>
                                            <div className="time">
                                                <p>12.03</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="yesterday">
                                        <h6 className="mb-3">Yesterday</h6>
                                        <div className="msg-item">
                                            <div className="msg-wrapper">
                                                <img src={user} alt="" />
                                                <div className="msg-info">
                                                    <h6>Jon Bellion</h6>
                                                    <p>Ads are not loading</p>
                                                    <p className="content">Good day, I wanted to up...</p>
                                                </div>
                                            </div>
                                            <div className="time">
                                                    <p>12.03</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </div>
                            <div className="msg-view">
                                <div className="msg-heading">
                                    <div className="views-heading mb-3">
                                        <h5>Ads are not loading</h5>
                                        <div className="imgs">
                                            <img src={Arrow} alt="" />
                                            <img src={trash} alt="" />
                                        </div>
                                        
                                    </div>
                                    <div className="sender-info">
                                        <div className="user">
                                            <img src={user} alt="" />
                                            <div className="user-detail">
                                                <h6>John Doe</h6>
                                                <p className="email">jonbellion@gmail.com <span>Reply in mail</span></p>
                                                <p className="via">(sent via Support)</p>
                                            </div>
                                        </div>
                                        <div className="msg-time">
                                            <p>OCT 21, 2021 <span>08:45PM</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="msg-large-v">
                                    <div className="view-lg">
                                        <img src={user} alt="" />
                                        <p>Good day, I wanted to upload aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                    </div>
                                    <div className="msg-btns">
                                        <button>Reply in mail</button>
                                        <p>Send a message</p>
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

export default Message;
