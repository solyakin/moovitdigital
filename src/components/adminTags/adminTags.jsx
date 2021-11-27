import React from 'react';
import { Link } from 'react-router-dom';
import squares from '../../assets/SquaresFour.svg';
import megaphone from '../../assets/MegaphoneSimple.svg';
import bag from '../../assets/BagSimple.svg';
import creditCard from '../../assets/CreditCard.svg';
import user from '../../assets/User.svg';
import Handshake from '../../assets/Handshake.svg';
import Envelope from '../../assets/EnvelopeSimple.svg';
import plus from '../../assets/Plus.svg';
import User from '../../assets/UserPlus.svg';
import Tag from '../../assets/Tag.svg';
import note from '../../assets/Note.svg';
import signout from '../../assets/SignOut.svg';

const AdminTags = () => {
    return (
        <div>
            <div className="tab-item">
                <img src={squares} alt="" />
                <Link to='/admin'>Dashboard</Link>
            </div>
            <div className="tab-item">
                <img src={User} alt="" />
                <Link to='/add-staff'>Add staff</Link>
            </div>
            <div className="tab-item">
                <img src={Envelope} alt="" />
                <Link to='/admin/message'>Messages</Link>
            </div>
            <div className="tab-item">
                <img src={plus} alt="" />
                <Link to='/new-ads-ticket'>New ads ticket</Link>
            </div>
            <div className="tab-item">
                <img src={Tag} alt="" />
                <Link to='/new-budget'>Budget</Link>
            </div>
            <div className="tab-item">
                <img src={note} alt="" />
                <Link to='/new-graphic'>Templates</Link>
            </div>
            <div className="tab-item">
                <img src={user} alt="" />
                <Link to='/notification'>Notification</Link>
            </div>
            <div className="tab-item">
                <img src={Handshake} alt="" />
                <Link to='/admin/profile'>Profile</Link>
            </div>
            <div className="tab-item">
                <img src={signout} alt="" />
                <p>Logout</p>
            </div>
        </div>
    )
}

export default AdminTags
