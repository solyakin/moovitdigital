import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import '../../pages/userReg/userReg.scss';
import axios from 'axios';

const UserRegistration = () => {

    const history = useHistory()
   const [personal, setPersonal] =  useState(false);
   const [value, setValue] = useState({
        type : "",
        overturn : "",
        size : "",
        duration : "",
        role : ""
   });
   const [user, setUser] = useState({
       firstName : '',
       lastName : '',
       phone : '',
       dob : '',
       country : '',
       company : '',
       business_type : '',
       business_size : '',
       business_duration : '',
       overturn : '',
       bio : '',
       role : '',
       other : '',
       agree : 1
   })

    const handleClick = (e) =>{
        e.preventDefault();
        setPersonal(!personal);
    }

    const handleChange = (e) => {
        e.persist();
        setUser({...user, [e.target.name] : e.target.value})
    }

    const _handleChange = (e) => {
        e.persist();
        setValue({type : e.target.value});
        setUser({...user, business_type : e.target.value}); 
    }
    const _handleChange2 = (e) => {
        e.persist();
        setValue({overturn : e.target.value});
        setUser({...user, overturn : e.target.value })
    }
    const _handleChange3 =(e) => {
        e.persist();
        setValue({size : e.target.value});
        setUser({...user, business_size : e.target.value })
    }
    const _handleChange4 =(e) => {
        e.persist();
        setValue({duration : e.target.value});
        setUser({...user, business_duration : e.target.value})
    }
    const _handleChange5 = (e) =>{
        e.persist();
        setValue({role : e.target.value});
        setUser({...user, role : e.target.value})
    }
    const auth_id = localStorage.getItem("auth_id");
    const profileSubmit = (e) =>{
        e.preventDefault();
        console.log(user)
        const data = {
            firstName : user.firstName,
            lastName : user.lastName,
            phone : user.phone,
            role : user.role,
            company : user.company,
            country : user.country,
            dob : user.dob,
            business_type : user.business_type,
            business_duration : user.business_duration,
            business_size : user.business_size,
            bio : user.bio,
            overturn : user.overturn,
            agree : user.agree,
            other : user.other
        }
        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("phone", data.phone);
        newForm.append("role", data.role);
        newForm.append("country", data.country);
        newForm.append("company", data.company);
        newForm.append("business_type", data.business_type);
        newForm.append("business_duration", data.business_duration);
        newForm.append("business_size", data.business_size);
        newForm.append("turnover", data.overturn);
        newForm.append("business_bio", data.bio);
        newForm.append("dob", data.dob);
        newForm.append("other", data.other);
        newForm.append("agree", data.agree);
        axios({
            url : `https://api.moovitdigital.com/api/user/update/${auth_id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&dob=${data.dob}&country=${data.country}&company=${data.company}&business_type=${data.business_type}&role=${data.role}&agree=1&business_type=${data.business_size}&business_duration=${data.business_duration}&turnover=${data.overturn}&business_bio=${data.bio}&other=${data.other}`,
            method : 'PUT',
            data : newForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                localStorage.setItem("user", data.firstName);
                // localStorage.setItem("id", 9);
                history.push('/dashboard');
            }else{
                // setRegister({...register, error_list : res.data.validation_errors})
                console.log(res.data.message)
            }
        })
        .catch(error => console.log(error))
    }
    console.log(user);
    return (
        <div className="user-registration"> 
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="form-wrapper">
                            <div className="form-heading">
                                <h5 style={{color : personal ? "grey" : "blue"}}>1. Personal Details</h5>
                                <h5 style={{color : personal ? "blue" : "grey"}}>2. Business Details</h5>
                                <span className="indicator" style={{transform : personal ? "translateX(160px)" : "initial"}}></span>
                            </div>
                            <form onSubmit={profileSubmit} style={{height : personal ? "580px" : "370px"}}>
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
                                        <div className="col-lg-6">
                                            <div className="form-group">
                                                <label>Role</label>
                                                <select name="" value={value.role} onChange={_handleChange5}>
                                                    <option value="" className="first">Select Role</option>
                                                    <option value="advertiser">Advertiser</option>
                                                    <option value="publisher">Publisher</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <button>
                                            <Link to='/account-type'>Back</Link>
                                        </button>
                                        <button onClick={handleClick}>Continue</button>
                                    </div>
                                </div>
                                <div className="business-detail" style={{transform : personal ? "translateX(-620px)" : "initial"}}>
                                    <div className="row">
                                        <div className="col-lg-6 mb-3">
                                            <label htmlFor="" className="title">Account Type</label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Company Name</label>
                                                <input type="text" placeholder="The Punch" name="company" onChange={handleChange} value={user.company}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group start">
                                                <label htmlFor="">Business Type</label>
                                                <select name="" id="" value={value.type} onChange={_handleChange}>
                                                    <option value="" className="first">Select Business Type</option>
                                                    <option value="media">Media and Communication</option>
                                                    <option value="hospitality">Hospitality </option>
                                                    <option value="photography">Photography</option>
                                                    <option value="technology">Technology</option>
                                                    <option value="manufacturing">Manufacturing</option>
                                                    <option value="agriculture">Agriculture</option>
                                                    <option value="logistics">Logistics</option>
                                                    <option value="construction">Construction</option>
                                                    <option value="ecommerce">E-commerce</option>
                                                    <option value="banking">Banking and Finance</option>
                                                    <option value="others">Others</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group">
                                                <label htmlFor="">Other</label>
                                                <input type="text" placeholder="Enter other business type" name="other" value={user.other} onChange={handleChange}/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group start">
                                                <label htmlFor="">What is your yearly overturn</label>
                                                <select name="" id="" value={value.overturn} onChange={_handleChange2}>
                                                    <option value="" className="first">Select yearly overturn</option>
                                                    <option value="500,000 - 1 million">500,000 - 1 million</option>
                                                    <option value="1.5 million - 3 million">1.5 million - 3 million</option>
                                                    <option value="3 million - 10 million">3 million - 10 million</option>
                                                    <option value="15 million - 100 million">15 million - 100 million</option>
                                                    <option value="Over 150 million">Over 150 million</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <div className="form-group start">
                                                <label htmlFor="">Business Size</label>
                                                <select name="" id="" value={value.size} onChange={_handleChange3}>
                                                    <option value="" className="first">Select Business size</option>
                                                    <option value="1-10">1-10</option>
                                                    <option value="10-20">10-20 </option>
                                                    <option value="20 - 50">20 - 50</option>
                                                    <option value="50 - 100">50 - 100</option>
                                                    <option value="100 Above">100 Above</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group start">
                                                <label htmlFor="">Business Duration</label>
                                                <select name="" id="" value={value.duration} onChange={_handleChange4}>
                                                    <option value="" className="first">Select Business duration</option>
                                                    <option value="500,000 - 1 million">6 months - 1 year</option>
                                                    <option value="1.5 million - 3 million">1 year - 5 years</option>
                                                    <option value="3 million - 10 million">5 years - 10 years</option>
                                                    <option value="15 million - 100 million">10 years ago</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                    <div className="col-lg-6">
                                            <div className="form-group">
                                                <label htmlFor="">Business Bio</label>
                                                    <textarea type="text" placeholder="Tell us about your business" name="bio" value={user.bio} onChange={handleChange}></textarea>
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
                                        <button onClick={handleClick}>Back</button>
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
