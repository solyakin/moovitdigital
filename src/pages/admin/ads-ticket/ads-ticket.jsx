import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import '../../admin/ads-ticket/ads-ticket.scss';
import caretDown from '../../../assets/CaretDown.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import paperclip from '../../../assets/Paperclip.svg'
import userP from '../../../assets/Ellipse 48.png';
import { Link } from 'react-router-dom';

const AdsTicket = () => {

    const [hide, setHide] = useState("none")
    const [adsList, setAdsList] = useState([]);
    const [staff, setStaff] = useState([]);
    const [assignedStaff, setAssignedStaff] = useState("");
 
    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
   
    useEffect( ()=> {
        const fetchData = async () =>{
            const allAds = await authAxios.get('/api/admin/ads');
            const response = allAds.data;
            const adsListData = response.data.data;
            setAdsList(adsListData);

            const allStaff = await authAxios.get('/api/admin/staff');
            const queryResponse = allStaff.data;
            const staffData = queryResponse.data.data;
            setStaff(staffData);
        }
        fetchData();
        
    },[])

    //grabbing the ticket via the id
    const assignClick = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget.parentElement.parentElement;
        console.log(id)
        setHide("block");
        setAssignedStaff(id)
    }

    //handling the assign to marketer
    const handleClick = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        console.log(id);

        const data = {
            assigned : id
        }
        console.log(data)
        const assignTask = async () => {
            const query = await authAxios.put(`/api/admin/assign-ads/${assignedStaff}`, data);
            const res = query.data;
            console.log(res)
        }
        assignTask(); 
    }
    console.log(staff);
    return (
        <div className="dashboard ads-ticket">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="caret down" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <Link to='/admin'>Dashboard</Link>
                        </div>
                        <div className="tab-item">
                            <img src={megaphone} alt="" />
                            <Link to='/add-staff'>Add staff</Link>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <Link to='/message'>Message</Link>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/new-ads-ticket'>New ads ticket</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/notification'>Notification</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/admin-profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p>Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main admin">
                        <div className="ads-heading">
                            <p>Unassigned</p>
                            <p>Assigned</p>
                            <p>Approved</p>
                        </div>
                        <div className="ads-wrapper">
                            <div className="ads-ticket-list">
                                <div className="row">
                                    {
                                        adsList.map(({id, title, content, image, createdBy}) => {
                                            // const fetchUser = async () => {
                                            //     const userData = await authAxios.get(`/api/admin/user/${createdBy}`);
                                            //     const userId = userData.data.data;
                                            //     console.log(userId);
                                                
                                            // }
                                            // fetchUser();
                                            return(
                                                <div className="col-lg-4" key={id}>
                                                    <div className="ads-card" id={id}>
                                                        <div className="card-title">
                                                            <h5>{title}</h5>
                                                            <div className="files">
                                                                <img src={paperclip} alt="" />
                                                                <span>2 files</span>
                                                            </div>
                                                        </div>
                                                        <h6>TIER 2</h6>
                                                        <p>{`${content} smet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim...`}</p>
                                                        <div className="user-profile" id={createdBy}>
                                                            <img src={userP} alt="" />
                                                            <p>Created by <span>Jon Bellion</span></p>
                                                        </div>
                                                        <div className="instruct-btns">
                                                            <a href='/#'>view details</a>
                                                            <button onClick={assignClick} id={id}>Assign</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
            <div className="assign-modal" style={{display : hide}}>
                <div className="modal-wrapper">
                    <h5>Assign a marketer</h5>
                    <form action="">
                        <label htmlFor="">Add name</label><br></br>
                        <input type="text" placeholder="Find a marketer"/>
                        <p>SUGGESTIONS</p>
                        <div className="suggestions">
                            {
                                staff.map(({firstName, lastName, id}) => {
                                    return(
                                        <div className="user-profile" key={id}  id={id} onClick={handleClick}>
                                            <img src={userP} alt="" />
                                            <div className="user-text">
                                                <h6>{`${firstName} ${lastName}`}</h6>
                                                <p>Unassigned</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="done-btn">
                            <p onClick = {() => setHide("none")}>Back</p>
                            <button>Done</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdsTicket;
