import React, { useState, useEffect, useRef } from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../dashboard/dashboard.scss';
import '../../../dashboard/ads-history/ads-history.scss';
import caretDown from '../../../../assets/CaretDown.svg';
import Tags from '../../../../components/Tags/Tags';
import ReportModal from '../../Report-Modal/report-modal';


const RunningAds = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [fbData, setfbData] = useState([]);
    const [show, setShow] = useState("none");
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });

    const FB_AdsList = props.adsList;
    let insightData = [];
    FB_AdsList.map(item => {
        if(item.insights){
            const ADinsights = item;
            insightData.push(ADinsights);
        }
    })

    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    const modalClick = (e) => {
        e.preventDefault();
        setShow("block");
        const targetId = e.target.id;
        let single_Ads = insightData.filter(item => item.id === targetId)
       setfbData(single_Ads);
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
                                        <h4>Running Ads</h4>
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
                                            <th scope="col">Campaign Type</th>
                                            <th scope="col">Likes</th>
                                            <th scope="col">Views</th>
                                            <th scope="col">Clicks</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Spent</th>
                                            <th scope="col">Ads Detail</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {                 
                                            insightData.map(item => {
                                                const itemData = item.insights.data;
                                                let clickAction = "";
                                                let likeAction = "";
                                        
                                                itemData.map(({actions}) => {
                                                    const Allclicks = actions[0];
                                                    if(Allclicks.action_type === "link_click"){
                                                        clickAction = Allclicks;
                                                    }else if(Allclicks.action_type === "like"){
                                                        likeAction = Allclicks;
                                                    }
                                                })
                                                
                                                let TotalClicks = Number(clickAction.value);
                                                let TotalLikes = Number(likeAction.value);
                                                
                                                //cleaning ads title
                                                const adTitle = item.name;
                                                const newSplit = adTitle.split(" ");
                                                const neededItem = newSplit.shift();
                                                const newTitle = newSplit.join(" ");
                                                
                                                return (
                                                    <tr key={item.id} id={item.id}>
                                                        <th scope="row text-left">
                                                            <input type="checkbox" name="" id="" />
                                                        </th>
                                                        <td>{newTitle}</td>
                                                        <td>Conversion</td>
                                                        <td>{(!TotalLikes) ? "-" : TotalLikes }</td>
                                                        <td>{itemData[0].impressions}</td>
                                                        <td>{(!TotalClicks) ? "-" : TotalClicks }</td>
                                                        <td>Running</td>
                                                        <td>{itemData[0].spend}</td>
                                                        <td><p className="view-detail" onClick={modalClick} id={item.id}>view details</p></td>
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
            <ReportModal 
            show={show} 
            setShow={setShow} 
            fbData={fbData}
            modalClick={modalClick}
            />
        </div>
    )
}

const mapStateToProps = state => {
    return{
        adsList : state.ads
    }
}
export default connect(mapStateToProps) (RunningAds);
