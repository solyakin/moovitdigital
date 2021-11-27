import React from 'react';
import { Link } from 'react-router-dom';
import '../../components/heroScreen/heroscreen.scss';
import image from '../../assets/image 3.png';
import logo from '../../assets/LOGO 1.svg';
import shape1 from '../../assets/Group 5.svg';
import shape2 from '../../assets/Group 9.svg';
import shape3 from '../../assets/shape1.svg';
import shape4 from '../../assets/Group 4.svg';
import shape5 from '../../assets/Group 2.svg';

const Heroscreen = () => {
    return (
        <div className='heroscreen'> 
            <img src={logo} alt="" className="logo" />
            <div className="shapes">
                <img src={shape2} alt=""  className="icon1"/>
                <img src={shape1} alt="" className="icon2"/>
                <img src={shape5} alt="" className="icon3"/>
                <img src={shape3} alt="" className="icon4"/>
                <img src={shape4} alt="" className="icon5"/>
            </div>
            <div className="hero-btns">
                <button>
                    <Link to='/login' className="login">
                        Login
                    </Link>
                </button>
                <button>
                    <Link to='/register'>
                        Get Started
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default Heroscreen;
