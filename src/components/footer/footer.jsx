import React from 'react';
import '../footer/footer.scss';
import { Link } from 'react-router-dom';
import fb from '../../assets/facebook/active.svg';
import twitter from '../../assets/TwitterLogo.svg';
import instagram from '../../assets/InstagramLogo.svg';

const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="content">
                    <div className="about">
                        <h4>MoovIT</h4>
                        <p>2972 Westheimer Rd. Santa Ana, Illinois 85486 </p>

                        <div className="social">
                            <img src={fb} alt="" />
                            <img src={twitter} alt="" />
                            <img src={instagram} alt="" />
                        </div>
                    </div>
                    <div className="item">
                        <h4>Know Us</h4>
                        <span> <Link>About us</Link></span>
                        <span><Link>Privacy Policy</Link></span>
                        <span><Link>Terms of Use</Link></span>                        
                    </div>
                    <div className="item">
                        <h4>Services</h4>
                        <span><Link>Digital advertising</Link></span>
                        <span><Link>Market survey</Link></span>
                        <span><Link>Digital Strategy</Link></span>
                        <span><Link>Lead Generation</Link></span>
                    </div>
                    <div className="item">
                        <h4>Help</h4>
                        <span><Link>Contact us</Link></span>
                        <span><Link>Privacy Policy</Link></span>
                        <span><Link>FAQ</Link></span>
                    </div>

                    <div className="item">
                        <form action="">
                            <h4>Subscribe to our newsletters</h4>
                            <input type="text" placeholder="enter your email address" />
                            <button>Subscribe</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
