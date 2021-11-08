import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../pages/userReg/userReg.scss';
import axios from 'axios';

const UserRegistration = () => {

    const history = useHistory()
   const [personal, setPersonal] =  useState(false);
   const [user, setUser] = useState({
       firstName : '',
       lastName : '',
       phone : '',
       dob : '',
       country : '',
       company : '',
       business_type : '',
       role : '',
       agree : 1
   })

    const handleClick = (e) =>{
        e.preventDefault();
        setPersonal(!personal)
    }

    const handleChange = (e) => {
        e.persist();
        setUser({...user, [e.target.name] : e.target.value})
    }

    const profileSubmit = (e) =>{
        e.preventDefault();
        console.log(user)
        const data ={
            firstName : user.firstName,
            lastName : user.lastName,
            phone : user.phone,
            role : user.role,
            company : user.company,
            country : user.country,
            dob : user.dob,
            business_type : user.business_type,
            agree : user.agree
        }
        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("phone", data.phone);
        newForm.append("role", data.role);
        newForm.append("country", data.country);
        newForm.append("company", data.company);
        newForm.append("business_type", data.business_type);
        newForm.append("dob", data.dob);
        newForm.append("agree", data.agree);
        axios({
            url : `https://api.moovitdigital.com/api/user/update/2?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&dob=${data.dob}&country=${data.country}&company=${data.company}&business_type=${data.business_type}&role=${data.role}&agree=1`,
            method : 'PUT',
            data : newForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                console.log(res)
                localStorage.setItem("user", data.firstName);
                localStorage.setItem("id", 9);
                history.push('/dashboard')
            }else{
                // setRegister({...register, error_list : res.data.validation_errors})
                console.log(res.data.message)
            }
        })
        .catch(error => console.log(error))
    }
    const newStyle = {
        transform : "translateX(-630px)",
        color : "grey"
    }

    return (
        <div className="user-registration"> 
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <div className="form-wrapper">
                            <div className="form-heading">
                                <h5 style={{color : personal ? "grey" : "blue"}}>1. Personal Details</h5>
                                <h5 style={{color : personal ? "blue" : "grey"}}>2. Business Details</h5>
                                <span className="indicator" style={{transform : personal ? "translateX(160px)" : "initial"}}></span>
                            </div>
                            <form onSubmit={profileSubmit}>
                                <div className="personal-detail" style={{transform : personal ? "translateX(-630px)" : "initial"}}>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">First Name</label>
                                                <input type="text" placeholder="John" name="firstName" onChange={handleChange} value={user.firstName} />
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Last Name</label>
                                                <input type="text" placeholder="Doe" name="lastName" onChange={handleChange} value={user.lastName}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Date of Birth</label>
                                                <input type="text" placeholder="DD/MM/YY" name="dob" onChange={handleChange} value={user.dob}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Phone Number</label>
                                                <input type="text" placeholder="+234 814 555 345 33" name="phone" onChange={handleChange} value={user.phone}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Country</label>
                                                <input type="text" placeholder="enter country" name="country" onChange={handleChange} value={user.country}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button>Back</button>
                                        <button onClick={handleClick}>Continue</button>
                                    </div>
                                </div>
                                <div className="business-detail" style={{transform : personal ? "translateX(-620px)" : "initial"}}>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label htmlFor="">Account Type</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Business Type</label>
                                                <input type="text" placeholder="News and Information" name="business_type" onChange={handleChange} value={user.business_type}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Company Name</label>
                                                <input type="text" placeholder="The Punch" name="company" onChange={handleChange} value={user.company}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Website URL</label>
                                                <input type="text" placeholder="e.g www.name.com" name="role" onChange={handleChange} value={user.role}/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row ">
                                        <div className="col-lg-7 agreement">
                                            <input type="checkbox" name="" id="" />
                                            <p>By continuing, you’re agreeing to our Customer Terms of 
                                                Service, Privacy Policy, and Cookie Policy.</p>
                                        </div>
                                    </div>

                                    <div className="buttons">
                                        <button>Back</button>
                                        <button type='submit'>Finish</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRegistration
