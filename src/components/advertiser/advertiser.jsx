import React from 'react';
import '../advertiser/advertiser.scss';
import image from '../../assets/image.png';
import image2 from '../../assets/image2.png';

const Advertiser = () => {
    return (
        <div className="main-wrapper">
            <div className="container">
                <div className="advertiser">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="content">
                                <h5>As an advertiser</h5>
                                <h3>Place your business at the center stage</h3>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                <button>Become an Advertiser</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="content text-right">
                                <img src={image} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="publisher">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="content text-left">
                                <img src={image2} alt="" />
                            </div>    
                        </div>
                        <div className="col-md-6">
                            <div className="content">
                                <h5>As a publisher</h5>
                                <h3>Grow your revenue monetizing your site</h3>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                <button>Become a publisher</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertiser;