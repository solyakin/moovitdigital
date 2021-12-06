import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import caretDown from '../../../assets/CaretDown.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import dots from '../../../assets/Dots.svg';
import frame1 from '../../../assets/Frame 233.svg';
import icon1 from '../../../assets/Frame 327.svg';
import icon2 from '../../../assets/Frame 331.svg';
import icon3 from '../../../assets/Frame 333.svg';
import icon4 from '../../../assets/Frame 3333.svg';
import frame2 from '../../../assets/Frame 232.svg';
import frame3 from '../../../assets/Frame 231.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../../../assets/image 1.png';

const MarketerDashboard = () => {

    const history = useHistory();
    // const [ads, setAds] = useState(0);
    const [adsList, setAdsList] = useState([]);
    const [notification, setNotification] = useState([]);
    const [adsCount, setAdsCount] =useState(0);
    const [pubCount, setpubCount] = useState(0);
    const [staff, setStaff] = useState(0);

    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const auth_name = localStorage.getItem("auth_name");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
        const fetchData = async () => {
            const allAds = await authAxios.get('/api/admin/ads');
            const response = allAds.data;
            const adsListData = response.data.data;
            setAdsList(adsListData);

            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
            

            // const allAdvertisers = await authAxios.get('/api/admin/advertiser');
            // const res = allAdvertisers.data;
            // const adsCount = res.wait data;
            // for (const [key, value] of Object.entries(adsCount)) {
            //     const allCount = key;
            //     setAdsCount(allCount);
            // }

            // const allPublishers = await authAxios.get('/api/admin/publisher');
            // const result = allPublishers.data;
            // const pubData = result.data
            // for(const[key, value] of Object.entries(pubData)){
            //     const allPubCount = key;
            //     setpubCount(allPubCount);
            // }

            // const allStaff = await authAxios.get('/api/admin/staff');
            // const queryResponse = allStaff.data;
            // const staffData = queryResponse.data.data.length;
            // setStaff(staffData);
        }
        fetchData();
    }, [])

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
    const newArray = adsList.filter(ele => {
        return ele.assigned === auth_id;
    })

    console.log(newArray);
    //for previewing
    const handleClick_ = (e) => {
        const targetId = e.target.id;
        const targetData = adsList.filter(ele => {
                return ele.id == targetId;
            })
        localStorage.setItem("targetData", JSON.stringify(targetData));
        localStorage.setItem("targetId", targetId);
    }
    let notification_count = notification.length;
    console.log(adsList);
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
                        <p>The Brand Hub</p>
                        <img src={caretDown} alt="" />
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
                            <Link to='/message'>Message</Link>
                        </div>
                        <div className="tab-item">
                            <img src={plus} alt="" />
                            <Link to='/marketer/tickets'>My Ticket</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
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
                        <div className="main-heading">
                            <div className="welcome">
                                <p>Welcome Back</p>
                                <h4>{auth_name}</h4>
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
                                            <img src={icon1} alt="" />
                                            <div className="content-text">
                                                <h5>{newArray.length}</h5>
                                                <p>All tickets</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="content">
                                        <div className="left-content">
                                            <img src={icon2} alt="" />
                                            <div className="content-text">
                                                <h5>20</h5>
                                                <p>Pending tickets</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="content">
                                        <div className="left-content">
                                            <img src={icon3} alt="" />
                                            <div className="content-text">
                                                <h5>20</h5>
                                                <p>Approved tickets</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="content">
                                        <div className="left-content">
                                            <img src={icon4} alt="" />
                                            <div className="content-text">
                                                <h5>20</h5>
                                                <p>Declined tickets</p>
                                            </div>
                                        </div>
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
                                            <h5> My Tickets</h5>
                                            <div className="btns">
                                                <button>Unassigned</button>
                                                <button>Assigned</button>
                                            </div>
                                        </div>
                                        <div className="history-table">
                                            <table className="table">
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
                                                        newArray.filter((items, index) => (index < 5))
                                                        .map(({id, title, start, location}) => {
                                                            return (
                                                                <tr key={id}>
                                                                    <th scope="row">
                                                                        <input type="checkbox" name="" id="" />
                                                                    </th>
                                                                    <td className="text-left">{title}</td>
                                                                    <td>Tier 2</td>
                                                                    <td>{start}</td>
                                                                    <td>{location}</td>
                                                                    <td>
                                                                        <Link to={`/marketer/preview-advert/${id}`} id={id} onClick={handleClick_}>Preview</Link>
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
                    </div>    
                </div>
            </div>
        </div>
    )
}

export default MarketerDashboard;

