import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import Tags from '../../../components/Tags/Tags';
import '../../dashboard/ads-history/ads-history.scss';
import caretDown from '../../../assets/CaretDown.svg';
import logo from '../../../assets/image 1.png';
import axios from 'axios';

const Support = () => {

    const [support, setSupport] = useState({
        name : '',
        email : '',
        description : '',
        subject : ''
    })

    const handleChange = (e) => {
        e.persist();
        setSupport({...support, [e.target.name] : e.target.value});
    }
    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    useEffect(() => {
        document.querySelector(".header").style.display = "none";
    }, [])
    const formSubmit = (e) => {
        e.preventDefault();
        const data = {
            name : support.name,
            email : support.email,
            description : support.description,
            subject : support.subject
        }

        const newData = new FormData();
        newData.append('name', data.name);
        newData.append('email', data.email);
        newData.append('subject', data.subject);
        newData.append('message', data.description);

        axios({
            url : 'https://api.moovitdigital.com/api/contact',
            method : 'POST',
            data : newData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                // if(res.data.email === admin)
                // write a login which checks if the user email contains admin
                // history.push('/admin');
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="dashboard">
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
                        <Tags style={style} handleClick={handleClick}/>
                    </div>
                    <div className="dashboard-main">
                        <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>Support</h4>
                            </div> 
                             <div className="support">
                                <h3>Create a ticket</h3>
                                <p>Having an issues using our services? We are all ears.</p>
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form onSubmit={formSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Name</label>
                                                <input type="text" name="name" value={support.name} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Email</label>
                                                <input type="email"  name="email" value={support.email} onChange={handleChange}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Subject</label>
                                                <input type="text" name="subject" value={support.subject} onChange={handleChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Description</label>
                                                <textarea name="description" id="" cols="10" rows="3" placeholder="enter message here" value={support.description} onChange={handleChange}></textarea>
                                            </div>
                                            <button type="submit">Send</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>                 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Support;
