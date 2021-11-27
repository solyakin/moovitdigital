import React from 'react';
import '../advertiser/advertiser.scss';
import image from '../../assets/yellow.png';
import image2 from '../../assets/work.png';

const Advertiser = () => {
    return (
        <div className="main-wrapper">
            <div className="container">
                <div className="publisher">
                    <div className="row_">
                        <div className="col_">
                            <div className="content text-left">
                                <img src={image} alt="" />
                            </div>    
                        </div>
                        <div className="col_2">
                            <div className="content">
                                {/* <h5>As a publisher</h5> */}
                                <h3>Our Story</h3>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="advertiser">
                    <div className="row_">
                        <div className="col_">
                            <div className="content">
                                {/* <h5>As an advertiser</h5> */}
                                <h3>Our Mission</h3>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>
                                
                            </div>
                        </div>
                        <div className="col_2">
                            <div className="content text-right">
                                <img src={image2} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Advertiser;