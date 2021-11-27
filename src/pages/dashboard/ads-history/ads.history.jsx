import React, { useState, useEffect, useRef } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../dashboard/ads-history/ads-history.scss';
import caretDown from '../../../assets/CaretDown.svg';
import Tags from '../../../components/Tags/Tags';


const AdHistory = () => {

    const current_id = localStorage.getItem("auth_id");
    const token = localStorage.getItem("auth_token");
    const [userAds, setUserAds] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    // const [fbData, setfbData] = useState([]);
    // const [show, setShow] = useState("none");

    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })

    useEffect(() => {
        
        const fetchData = async () => {
            const allUserAds = await authAxios.get('/api/user/user-ads');
            const response = allUserAds.data;
            const adsListData = response.data.data;
            console.log(adsListData);

            const newArray = adsListData.filter(ele => {
                return ele.createdBy == current_id;
            })
            setUserAds(newArray);
        }
        fetchData();
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
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
                        <Tags style={style} handleClick={handleClick}/>
                    </div>
                    <div className="dashboard-main">
                        {
                            isLoading ? <Loader type="Bars"
                            color="#EE315D"
                            height={30}
                            width={40}/> : (
                                <div className="ads-wrapper">
                                    <div className="ads-heading">
                                        <h4>Ads History</h4>
                                    </div>
                                    <div className="history-wrapper">
                                        <div className="text-right">
                                            <button>
                                                <Link to='/create-ads'>+ <span>Create Ads</span></Link>
                                            </button>
                                        </div>
                                    <div className="text-left">
                                        <input type="text"  placeholder="search"/>
                                    </div> 
                                </div> 
                                <div className="history-table">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Content</th>
                                            <th scope="col">Location</th>
                                            <th scope="col">Budget</th>
                                            <th scope="col">Clicks</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Spent</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { 

                                                userAds.map(({id, title, location, content, budget_id, graphic}) => {
                                                    let ads_budget = "";
                                                    if(budget_id == 1){
                                                        ads_budget = "#50,000"
                                                    }
                                                    else if(budget_id == 2){
                                                        ads_budget = "#150,000"
                                                    }
                                                    else if(budget_id == 3){
                                                        ads_budget = "#250,000"
                                                    }
                                                    return(
                                                    <tr key={id}>
                                                        <th scope="row text-left">
                                                            <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td>{title}</td>
                                                        <td>{content}</td>
                                                        <td>{location}</td>
                                                        <td>{ads_budget}</td>
                                                        <td>Running</td>
                                                        <td>Running</td>
                                                        <td>Running</td>
                                                    </tr>
                                                    )
                                                })                
                                            }
                                        </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }              
                    </div>
                </div>
            </div>
        </div>
    )
}

export default  AdHistory;
