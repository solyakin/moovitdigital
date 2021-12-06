import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Pricing from '../pricing/pricing';
import Tags from '../../../components/Tags/Tags';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import '../SMM/smm.scss';
import caretDown from '../../../assets/CaretDown.svg';
import logo from '../../../assets/image 1.png';
import MobileTags from '../../../components/MobileTags/mobileTags';

const SMM = () => {
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const [ham, setHam] = useState(false);
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    useEffect(() => {
        document.querySelector(".header").style.display = "none"    
       }, [])
    return (
        <div className="dashboard create-ads smm">
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
                        <Tags style={style} handleClick={handleClick} />
                    </div>
                    <div className="mobile-tag">
                        <MobileTags style={style} handleClick={handleClick} ham={ham}/>
                    </div>
                    <div className="dashboard-main">
                        <form onSubmit={handleSubmit}>
                            <Pricing 
                            // createAds={createAds} 
                            // setCreateAds={setCreateAds} 
                            />
                            <div className="social-media-wrapper">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <h5>Business Name</h5>
                                            <input type="text"  placeholder="The Brand Hub"/>
                                        </div>
                                        <div className="form-group">
                                            <h5>Social Media Page</h5>
                                            <input type="text"  placeholder="www.facebook.com/comanyname"/>
                                        </div>
                                        <div className="form-group">
                                            <h5>Social Media Page</h5>
                                            <input type="text"  placeholder="www.facebook.com/comanyname"/>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-5">Send Request</button>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SMM
