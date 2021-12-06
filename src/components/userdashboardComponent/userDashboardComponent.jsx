import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserDashboardComponent = ({adsCount}) => {
    const current_user = localStorage.getItem("auth_name");
    return (
        <div>
            <div className="main-heading">
                <div className="welcome">
                    <p>Welcome Back</p>
                    <h4>{current_user}</h4>
                </div>
                <div className="smm">
                    <Link to='/smm'>Purchase SMM Package</Link>
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
                    <div className="mobile-plus">
                        <Link to='/create-ads'>+</Link>
                    </div>
                </div>

                <div className="ads-records">
                    <div className="total">
                        <h4>{adsCount}</h4>
                        <p>Total Ads</p>
                    </div>
                    <div className="impression">
                        <h4>0</h4>
                        <p>Impressions</p>
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
