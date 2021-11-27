import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserDashboardComponent = ({adsCount}) => {
    const current_user = localStorage.getItem("user");
    

    const [actionsCount, setActionsCount] = useState([]);
    // const [impressionCount, setImpressionCount] = useState("");
    
    

    useEffect( () => {

    }, []);
   
    let impressionCount = 0;

    // fbData.map(item => {
    //         if(item.insights){
    //             const ADinsights = item.insights.data;
    //             console.log(ADinsights);
    //             // const ADimpressions = ADinsights.impressions;
    //             // console.log(ADimpressions)
    //             // ADinsights.map(({impressions, actions}) => {
    //             //     impressionCount = impressions;
    //             //     // console.log(impressions)
    //             // })
    //         }
    // })
    console.log(impressionCount); 
    return (
        <div>
            {
                // fbData.map(item => {
                //     if(item.insights){
                //         const ADinsights = item.insights.data;
                //         ADinsights.map(({impressions, actions}) => {
                //             setImpression(impressions);
                //             setActions(actions)
                //         })
                //     }
                //     console.log(impression)
                // })
                
            }
            <div className="main-heading">
                <div className="welcome">
                    <p>Welcome Back</p>
                    <h4>Solomon</h4>
                </div>
                <div className="smm">
                    <Link>Purchase SMM Package</Link>
                </div>
            </div>
            <div className="main-records">
                <div className="funds-wrapper">
                    <div className="fund-balance">
                        <p>Available Funds</p>
                        <h3>#00.00 <span>TOP-UP</span></h3>
                    </div>
                    <div className="create-ads-btn">
                        <button>
                            <span>+</span>
                            <Link to='/create-ads'>Create an Ad</Link>
                        </button>
                    </div>
                </div>

                <div className="ads-records">
                    <div className="total">
                        <h4>{adsCount}</h4>
                        <p>Total Ads</p>
                    </div>
                    <div className="impression">
                        <h4>0</h4>
                        <p>Impressions recieved</p>
                    </div>
                    <div className="clicks">
                        <h4>0</h4>
                        <p>Total Clicks</p>
                    </div>
                    <div className="clicks">
                        <h4>0</h4>
                        <p>Running Ads</p>
                    </div>
                </div>
            </div>

            <div className="ads-stats">
                <div className="ads-graph">
                    <div className="graph-heading">
                        <p>Ads chart</p>
                        <p><span></span>RUNNING</p>
                    </div>
                    <div className="graph-view"></div>
                </div>
                <div className="smm-package">
                    <div className="smm-heading">
                        <div className="item">
                            <p>SMM Package</p>
                            <h5>Premium <span>View details</span></h5>
                        </div>
                        <div className="cancel-plan">
                            <p>Cancel plan</p>
                        </div>
                    </div>
                    <div className="running-smm">
                        <p>Instagram Account- the_Brand_Hub</p>
                        <p>Twitter Account- TheBrandHubng</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboardComponent
