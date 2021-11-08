import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay, Pagination} from 'swiper';
import 'swiper/swiper-bundle.css';
import '../services/services.scss';

SwiperCore.use([Autoplay, Pagination]);

const Services = () => {
    return (
        <div className="services">
            <div className="container">
                <div className ="service-text">
                    <h2>Services</h2>
                    <p>How may we be of service to you</p>
                    <Swiper className="desktop" slidesPerView={1}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}>
                        <SwiperSlide>
                            <div className='row justify-content-between'>
                                <div className="col-md-6">
                                    <div className="content-text">
                                        <h3>Digital Advertisement</h3>
                                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>

                                        <button>Learn more</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="img"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row justify-content-between'>
                                <div className="col-md-6">
                                    <div className="content-text">
                                        <h3>Digital Strategy</h3>
                                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>

                                        <button>Learn more</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="img"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row justify-content-between'>
                                <div className="col-md-6">
                                    <div className="content-text">
                                        <h3>Lead generation</h3>
                                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p>

                                        <button>Learn more</button>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="img"></div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </div>
    )
}

export default Services;
