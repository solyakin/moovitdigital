import React, { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import '../../admin/ads-ticket/ads-ticket.scss';
import caretDown from '../../../assets/CaretDown.svg';
import paperclip from '../../../assets/Paperclip.svg';
import userP from '../../../assets/Ellipse 48.png';
import AdminTags from '../../../components/adminTags/adminTags';

const AdsTicket = () => {

    const [hide, setHide] = useState("none");
    const [response, setResponse] = useState([]);
    const [adsList, setAdsList] = useState([]);
    const [staff, setStaff] = useState([]);
    const [assignedStaff, setAssignedStaff] = useState("");
    const [notification, setNotification] = useState([]);
 
    const token = localStorage.getItem("auth_token");
    const authAxios = axios.create({
        baseURL : "https://api.moovitdigital.com",
        headers : {
            Authorization : `Bearer ${token}`
        }
    })
   
    useEffect( ()=> {
        document.querySelector(".header").style.display = "none";    
        const fetchData = async () =>{
            const allAds = await authAxios.get('/api/admin/ads');
            const response = allAds.data;
            const adsListData = response.data.data;
            setAdsList(adsListData);

            const allStaff = await authAxios.get('/api/admin/staff');
            const queryResponse = allStaff.data;
            const staffData = queryResponse.data.data;
            setStaff(staffData);

            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
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

    const doneClick = (e) => {
        e.preventDefault()
        setHide("none");
    }

    //handling the assign to marketer
    const handleClick = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        console.log(id)
        const data = {
            assigned : id
        }
        const assignTask = async () => {
            const query = await authAxios.put(`/api/admin/assign-ads/${assignedStaff}`, data);
            const res = query.data;
            swal("Great!", "Assigned successfully!", "success");
            setResponse(res);
        }
        assignTask(); 
        // setAlert("block")
    }
    // console.log(assignedStaff)
    return (
        <div className="dashboard ads-ticket">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="caret down" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags notification={notification}/>
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
                                        <div className="user-profile" key={id} id={id} onClick={handleClick}>
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
                            <p></p>
                            <button onClick ={doneClick}>Done</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdsTicket;
