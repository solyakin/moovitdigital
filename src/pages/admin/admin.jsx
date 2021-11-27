import React, {useState, useEffect} from 'react';
import '../dashboard/dashboard.scss';
import '../admin/admin.scss';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import caretDown from '../../assets/CaretDown.svg';
import notification from '../../assets/notif.svg';
import share from '../../assets/Frame 239.svg';
import users from '../../assets/Frame 240.svg';
import dots from '../../assets/Dots.svg';
import frame1 from '../../assets/Frame 233.svg';
import frame2 from '../../assets/Frame 232.svg';
import frame3 from '../../assets/Frame 231.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AdminTags from '../../components/adminTags/adminTags';

const Admin = () => {

    // const [ads, setAds] = useState(0);
    const [adsList, setAdsList] = useState([]);
    const [adsCount, setAdsCount] =useState(0);
    const [pubCount, setpubCount] = useState(0);
    const [staff, setStaff] = useState(0);
    const [isLoading, setLoading] = useState(true);

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
        setLoading(false);
    }, [])

    const handleClick = (e) => {
        const targetId = e.target.id;
        console.log(targetId);
        const targetData = adsList.filter(ele => {
                return ele.id == targetId;
            })
        localStorage.setItem("targetData", JSON.stringify(targetData));
        localStorage.setItem("targetId", targetId);
    }
    
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
                    <div className="dashboard-main admin">
                        {
                            isLoading ? <Loader type="Bars"
                            color="#EE315D"
                            height={30}
                            width={40}/> : (
                                <>
                                <div className="main-heading">
                                    <div className="welcome">
                                        <p>Welcome Back</p>
                                        <h4>Admin</h4>
                                    </div>
                                    <div className="smm">
                                        <input type="text" placeholder="search"/>
                                    </div>
                                </div>
                                <div className="quick-stat">
                                    <h6>Quick stats</h6>
                                    <div className="row">
                                        <div className="col">
                                            <div className="content">
                                                <div className="left-content">
                                                    <img src={notification} alt="" />
                                                    <div className="content-text">
                                                        <p>Total</p>
                                                        <h5>Advertisers</h5>
                                                    </div>
                                                </div>
                                                <p>{adsCount}</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="content">
                                                <div className="left-content">
                                                    <img src={share} alt="" />
                                                    <div className="content-text">
                                                        <p>Total</p>
                                                        <h5>Publishers</h5>
                                                    </div>
                                                </div>
                                                <p>{pubCount}</p>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="content">
                                                <div className="left-content">
                                                    <img src={users} alt="" />
                                                    <div className="content-text">
                                                        <p>Total</p>
                                                        <h5>Marketers</h5>
                                                    </div>
                                                </div>
                                                <p>{staff}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="overall-info">
                                    <div className="row">
                                        <div className="col-5">
                                            <div className="marketers">
                                                <div className="marketers-heading">
                                                    <h5>Marketers</h5>
                                                    <img src={dots} alt="" />
                                                </div>
                                                
                                                <div className="assigned">
                                                    {/* <p>Assigned</p>
                                                    <div className="volume">
                                                        <img src="" alt="" />
                                                        <span>60%</span>
                                                    </div> */}
                                                    <img src={frame1} alt="" />
                                                </div>
                                                <div className="assigned">
                                                    {/* <p>Unassigned</p>
                                                    <div className="volume">
                                                        <img src="" alt="" />
                                                        <span>32%</span>
                                                    </div> */}
                                                    <img src={frame2} alt="" />
                                                </div>
                                                <div className="assigned">
                                                    {/* <p>Idle</p>
                                                    <div className="volume">
                                                        <img src="" alt="" />
                                                        <span>11%</span>
                                                    </div> */}
                                                    <img src={frame3} alt="" />
                                                </div>

                                                <Link to=''>view details</Link>
                                            </div>
                                        </div>
                                        <div className="col-7">
                                            <div className="tickets">
                                                <div className="ticket-title">
                                                    <h5>Tickets</h5>
                                                    <div className="btns">
                                                        <button>Unassigned</button>
                                                        <button>Assigned</button>
                                                    </div>
                                                </div>
                                                <div className="history-table">
                                                    <table class="table">
                                                        <thead>
                                                            <tr>
                                                            <th scope="col"></th>
                                                            <th scope="col">Title</th>
                                                            <th scope="col">Budget</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                adsList.filter((items, index) => (index < 5))
                                                                .map(({title, start, location, id}) => {
                                                                    return (
                                                                        <tr>
                                                                            <th scope="row">
                                                                                <input type="checkbox" name="" id="" />
                                                                            </th>
                                                                            <td className="text-left">{title}</td>
                                                                            <td>Tier 2</td>
                                                                            <td>{start}</td>
                                                                            <td>{location}</td>
                                                                            <td>
                                                                                <Link to={`/marketer/preview-advert/${id}`} id={id} onClick={handleClick}>Preview</Link>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                }) 
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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

export default Admin;
