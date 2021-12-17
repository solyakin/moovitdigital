import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import axios from 'axios';
import logo from '../../../assets/image 1.png'
import AdminTags from '../../../components/adminTags/adminTags';
import swal from 'sweetalert';

const AddStaff = () => {

    const token = localStorage.getItem("auth_token");
    const [notification, setNotification] = useState([]);
    const [staff, setStaff ] = useState({
        email : "",
        password : "",
        confirm_password : "",
        role : ""
    })

    const authAxios = axios.create({
        baseURL : "https://test.canyousing.com.ng",
        headers : {
            Authorization : `Bearer ${token}`,
           'Content-Type' : 'multipart/form-data',
        }

    })
    useEffect(() => {
        const fetching = async () => {
            const allNotifications = await authAxios.get('/api/admin/notifications');
            const notification_array = allNotifications.data;
            setNotification(notification_array.data);
        }
        fetching()

    },[])
    const handleChange = (e) => {
        e.persist();
        setStaff({...staff,  [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        newForm.append("email", staff.email);
        newForm.append("password", staff.password);
        newForm.append("password_confirmation", staff.confirm_password);
        newForm.append("role", staff.role);
        authAxios.post('/api/admin/register', newForm)
        .then(res => {
            if(res.status == 200){
                const result = res.data;
                swal("Great!", "New staff successfully added!", "success");
                console.log(result)
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/home'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
    
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags notification={notification}/>
                    </div>
                    <div className="dashboard-main admin">
                    <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>Add a new staff</h4>
                            </div> 
                            <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Enter staff email</label>
                                                <input type="text" placeholder="jonbellion@moovitdigital.com" name="email" onChange={handleChange} value={staff.email}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Password</label>
                                                <input type="password" name="password" onChange={handleChange} value={staff.password}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Confirm Password</label>
                                                <input type="password" name="confirm_password" onChange={handleChange} value={staff.confirm_password}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Role</label>
                                                <input type="text" placeholder="Marketer" name="role" onChange={handleChange} value={staff.role}/>
                                            </div>
                                            <button type="submit">Send invite</button>
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

export default AddStaff;
