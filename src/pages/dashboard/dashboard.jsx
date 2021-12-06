import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../dashboard/dashboard.scss';
import caretDown from '../../assets/CaretDown.svg';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import UserDashboardComponent from '../../components/userdashboardComponent/userDashboardComponent';
import Tags from '../../components/Tags/Tags';
import logo from '../../assets/image 1.png';
import hamburger from '../../assets/hamburger.png';
import MobileTags from '../../components/MobileTags/mobileTags';

const Dashboard = () => {
    
    const [style, setStyle] = useState({
        hide : false, 
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);
    const [userAds, setUserAds] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const current_id = localStorage.getItem("auth_id");
    const token = localStorage.getItem("auth_token");
    
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
    
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
        const fetchData = async () => {
            const allUserAds = await authAxios.get('/api/user/user-ads');
            const response = allUserAds.data;
            console.log(response)
            const adsListData = response.data.data;
            console.log(adsListData);
            const newArray = adsListData.filter(ele => {
                return ele.createdBy == current_id;
            })
            setUserAds(newArray);
        }
        fetchData();
        setLoading(false);
    }, [])
    
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    }
    const adsCount = userAds.length;
    console.log(userAds)
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <img src={hamburger} alt="hamburger" width="25px" className="hamburger" onClick={toggler}/>
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
                        <Tags style={style} handleClick={handleClick} />
                    </div>
                    <div className="mobile-tag">
                        <MobileTags style={style} handleClick={handleClick} ham={ham}/>
                    </div>
                    <div className="dashboard-main">
                        {
                            isLoading ? <Loader type="Bars"
                            color="#EE315D"
                            height={30}
                            width={40}/> : (
                                <UserDashboardComponent adsCount={adsCount} />
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
