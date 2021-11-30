import React from 'react';
import '../advertiser/advertiser.scss';
import stand from '../../assets/stand.svg';
import wink from '../../assets/wing.svg';
const Advertiser = () => {
    return (
        <div className="main-wrapper">
            <div className="container">
                <div className="publisher">
                    <div className="row">
                        <div className="col first">
                            <div className="content text-left">
                                <img src={stand} alt="" />
                            </div>    
                        </div>
                        <div className="col">
                            <div className="content">
                                <h3>Our Story</h3>
                                <p>Our approach to social media management focuses on audience development by presenting a clear and coherent voice of the brand to grow your community over time with relevant content and dependable engagement. Grow your business with the influence and branding of social media, we make it easy to earn new engagement and build awareness.</p>
                                <p>Our team of innovators brings skills above and beyond the ordinary to every project. Social Media is a critical medium for growth in modern marketing. Being able to reach people at any stage of their journeys.</p>                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="advertiser">
                    <div className="row">
                        <div className="col">
                            <div className="content">
                                <h3>Our Mission</h3>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                            </div>
                        </div>
                        <div className="col">
                            <div className="content text-right">
                                <img src={wink} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertiser;