import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom'
import '../../dashboard/dashboard.scss';
import '../../marketer/adcode/adcode.scss';
import axios from 'axios';
import Loader from "react-loader-spinner";
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import squares from '../../../assets/SquaresFour.svg';
import bag from '../../../assets/BagSimple.svg';
import plus from '../../../assets/Plus.svg';
import logo from '../../../assets/image 1.png';
import usericon from '../../../assets/User.svg';
import swal from 'sweetalert';

const Adcodes = () => {

    let target_value = 1;
    let banner_id = '';
    let banner_name = '';
    const [advertisers, setAdvertisers] = useState({
        advertiser : '',
        id : ''
    });
    const [loading, setLoading] = useState(false); 
    const [advs, setAdvs] = useState([]);
    let target__value = '';
   
    const [notification, setNotification] = useState([]);
    const [adcode, setAdcode ] = useState({
        publisher : "",
        banner : ""
    })
    const [show, setShow] = useState(false);
    const [banner, setBanner] = useState([]);
    const [value_, setValue] = useState({
        publishers : "",
        banner : "",
        userId : ""
    });
    const [sendAdcode, setSendAdcode] = useState({
        publisher_sent : "",
        adcode_sent : "",
    })
    const [pub_l, setPub_l] = useState({
        publisher_sent : "",
        adcode_sent : ""
    })
    const [publisher_id, setPublisher_id] = useState('');
    const [adsList, setAdsList] = useState([]);
    const [allPublisher, setPublisher] = useState([]);
    const handleChange_1 = (e) => {
        e.persist();
        setValue({...value_, [e.target.name] : e.target.value});
        setAdcode({...adcode, [e.target.name] : e.target.value});
    }
    const handleChange__2 = (e) => {
        e.persist();
        setAdvertisers({...advertisers,[e.target.name] : e.target.value});
    }
    const handleChange = (e) => {
        e.persist();
        setAdcode({...adcode,  [e.target.name]: e.target.value})
    }
    const history = useHistory();
    const token = localStorage.getItem("auth_token");
    const auth_id = localStorage.getItem("auth_id");
    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    useEffect(() => {
        const fetchingData = async () => {
            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);

            const allBanners = await authAxios.get('/api/admin/all-banners');
            const banners_data = allBanners.data;
            setBanner(banners_data.data);

            const allPublishers = await authAxios.get('/api/admin/publisher');
            const pub_data = allPublishers.data.data;
            const value_data = Object.values(pub_data)
            setPublisher(value_data);

            const allAdverts = await authAxios.get('/api/admin/ads');
            const ads_data = allAdverts.data.data;
            setAdsList(ads_data.data);

            const allList = await authAxios.get('/api/admin/advertiser');
            const itemList = allList.data;
            console.log(itemList)
            setAdvs(itemList.data);

        }
        fetchingData();
    },[])
    const advertiserList  = Object.values(advs)
     const targetAdvertiser = advertiserList.filter(items => items.firstName == advertisers.advertiser)
    targetAdvertiser.map(({id}) => {
        target__value = id
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        const targetAds = adsList.filter( item => 
            item.title.toLowerCase() == banner_name.toLowerCase()
        );
        console.log(targetAds)
        let advert_id = '';
        targetAds.map(({id}) => {
            advert_id = id
        })
        setLoading(true);
        const data = {
            script : sendAdcode.adcode_sent,
            userId : value_.userId
        }
        console.log(data);
        const newForm = new FormData();
        newForm.append("publisher_id", target_value);
        newForm.append("script", data.script)
        newForm.append("user_id", target__value)
        newForm.append("banner_id", banner_id)
        newForm.append("advert_id", advert_id)
        authAxios.post('/api/admin/publisher-ads', newForm)
        .then(res => {
            swal("Great!", "Adcode sent successfully!", "success");
            setLoading(false);
            console.log(res.data);
        })
        .catch(err => console.log(err))   
    }
    const handleChange_2 = (e) => {
        e.persist();
        setPub_l({...pub_l, [e.target.name] : e.target.value});
        setSendAdcode({...sendAdcode, [e.target.name] : e.target.value});
    }
    
    const handleClick = (e) => {
        e.preventDefault();
        setShow(true);
    }
    const handleLogout = (e) => {
        e.preventDefault();
        authAxios.post('https://test.canyousing.com.ng/api/admin/logout')
        .then(res => {
            if(res.status === 200){
                localStorage.clear();
                history.push('/home');
            }
        })
        .catch(err => console.log(err));
    }
    const handle_ = (e) => {
        e.preventDefault();
    }
    let notification_count = notification.length;
    const dimension = banner.filter(item => item.name == adcode.banner);

    const targetPublisher = allPublisher.filter(items => items.firstName == sendAdcode.publisher_sent)
    targetPublisher.map(({id}) => {
        target_value = id
    });
    
    const targetBanner = banner.filter(item => item.name === adcode.banner)
    targetBanner.map(({id, name}) => {
        banner_id = id
        banner_name = name
    })

    console.log(allPublisher)
    console.log(targetBanner)
    return (
        <div className="dashboard">
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
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <Link to='/marketer/dashboard'>Dashboard</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='/#'>Message</Link>
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
                    <div className="dashboard-main">
                        <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>Generate Adcode</h4>
                            </div> 
                            <div className="support">
                                <div className="row justify-content-between align-items-top">
                                    <div className="col-lg-5">
                                        <form onSubmit ={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Select Banner</label>
                                                <input list="data" name="banner" value={adcode.banner} onChange={handleChange_1}/>
                                                <datalist id="data">
                                                    {banner.map(({id, name, banner, width, height}) =>{
                                                        return <option key={id} value={name} id={id} className="banner-id"></option>
                                                        }
                                                    )}
                                                </datalist>
                                            </div>
                                            
                                            <div className="row">
                                                {
                                                    dimension.map(({width, height, id}) => {
                                                        return <div className="row" key={id}>
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <label htmlFor="">Banner Height</label>
                                                                    <input type="text" name="password" defaultValue={height} />
                                                                </div>
                                                            </div>
                                                            <div className="col">
                                                            <div className="form-group">
                                                                <label htmlFor="">Banner Width</label>
                                                                    <input type="text" name="password" defaultValue={width}/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    })
                                                }
                                                
                                            </div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="">Select Advertiser</label>
                                                        <input list="data1" name="advertiser" value={advertisers.advertiser} target="id" onChange={handleChange__2} />
                                                        <datalist id="data1">
                                                            {advertiserList.map(({id, firstName, lastName}) =>{
                                                                return <option key={id} id={id} value={firstName} className="target_child"></option>
                                                            }   
                                                            )}
                                                        </datalist>
                                                </div>
                                                {/* <div className="form-group">
                                                    <label htmlFor="">User ID</label>
                                                    <input type="text" name="userId" value={value_.userId} onChange={handleChange_1} />
                                                </div> */}
                                            </div>
                                            <div className="row">
                                                <div className="form-group">
                                                    <label htmlFor="">Publisher to send Adcode</label>
                                                    <input list="data2" name="publisher_sent" value={sendAdcode.publisher_sent} onChange={handleChange_2} />
                                                    <datalist id="data2">
                                                        {allPublisher.map(({id, firstName}) =>
                                                            <option key={id} id={id} value={firstName} className="target_child"></option>
                                                        )}
                                                        
                                                    </datalist>
                                                </div>
                                                <button className="generate_btn" onClick={handleClick}>Generate Adcode</button>

                                                <div className="send-adcode">
                                                    <h3>Send Adcode to Publisher</h3>                           
                                                    <div className="form-group">
                                                        <label htmlFor="">Paste Adcode here</label>
                                                        <textarea name="adcode_sent" id="" cols="30" rows="7" onChange={handleChange_2} value={sendAdcode.adcode_sent}  style={{border: "1px solid #e5e5e5"}}></textarea>                       
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="submit">Send Adcode</button>
                                            <div className="spinner" style={{display : loading ? "block" : "none"}}>
                                                <Loader type="TailSpin" color="#EE315D" height={30} width={30} />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="col-lg-5" style={{display : show ? "block" : 'none'}}>    
                                       {
                                            dimension.map(({width, height, id}) => {
                                                let publisher_id = target_value;
                                                let code = `<div id="ad">
                                                        <iframe
                                                        src="https://test.canyousing.com.ng/adcode/${id}
                                                        &0&2&${width}&7&59&${height}&${publisher_id}"
                                                        scrolling="no"
                                                        allowtransparency="true"
                                                        width = "${width}px"
                                                        height= "${height}px"
                                                        style="border:0;">
                                                        </iframe>
                                                    </div>`
                                                return <div className="codes" style={{border: "1px solid #e5e5e5"}}>
                                                    <p>{code}</p>
                                                </div>
                                            })
                                       }   
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
export default Adcodes;
