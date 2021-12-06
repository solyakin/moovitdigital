import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../../dashboard/dashboard.scss';
import '../../../dashboard/ads-history/ads-history.scss';
import caretDown from '../../../../assets/CaretDown.svg';
import Tags from '../../../../components/Tags/Tags';
import ReportModal from '../../Report-Modal/report-modal';
import logo from '../../../../assets/image 1.png';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
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
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
        const linkedin_token = 'AQUPpvEHfqb9Scg6TpPRgfEoqmeeuqLqCr5hUvxNYWV8ra9KpPJQrSvjHf0cUY7VPAdT3LOzIB2_bJDwB6t56p7EQVb2kkL73c4WmGTAEH7lcBTknnOm9qCa_IwpNaHFwF38KbVgq-M6dK5os7EMxm6rKv9bfjlZyLO-J2L3fvQ0dFFtbN2HQpOc6zYpx2FZQA1AyAj7NmwlG1o3_c7OwaM0WPKJj4g4pk9vgwJuYdwMuSkLb-FZ1DQPx2JZ2u-mHWAuBaHVmmYSJzwJwsaPE31Xn2KLWwr1_9oSCZeKaU1XNf69rr4xm8O1w9iTl8tfnYCLOgXp2yvSKP0ug9SpDQCm1AwhLw'
        const authAxios = axios.create({
            
            // baseURL : 'https://api.linkedin.com/v2/',
            headers : {
                Authorization : `Bearer ${linkedin_token}`,
                'Content-Type' : "applciation/json",
                'Access-Control-Allow-Origin': '*'
            }
        })
        authAxios.get('https://api.linkedin.com/v2/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:193773413&search.status.values[0]=ACTIVE&search.status.values[1]=CANCELED&sort.field=ID&sort.order=DESCENDING/')
        .then(res => {
            // const data = res.header("Access-Control-Allow-Origin", "*")
            const data = res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
            console.log(data.data);
        })
    }, [])
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
