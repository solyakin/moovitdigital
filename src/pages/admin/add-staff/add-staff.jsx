import React, {useState} from 'react';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import axios from 'axios';
import caretDown from '../../../assets/CaretDown.svg';
import AdminTags from '../../../components/adminTags/adminTags';
import Alert from '../../../components/alert/alert';

const AddStaff = () => {

    const token = localStorage.getItem("auth_token")
    const [alert, setAlert] = useState("none");
    const [staff, setStaff ] = useState({
        email : "",
        password : "",
        confirm_password : "",
        role : ""
    })

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
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.post('/api/admin/register', newForm)
        .then(res => {
            if(res.status == 200){
                const result = res.data;
                console.log(result)
                // history.push('/request-call');
            }
        })
        .catch(err => console.log(err))
    }
    console.log(staff);
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags />
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
                <Alert alert={alert}/>
            </div>
        </div>
    )
}

export default AddStaff;
