import React, { useState } from 'react';
import '../publisher-form/publisher.form.scss';
import axios from 'axios';
import Loader from "react-loader-spinner";
import swal from 'sweetalert';

const PublisherForm = () => {
    const [loading, setLoading] = useState(false);  
    const id = localStorage.getItem("auth_id")
    const [data, setData] = useState({
        firstName : '',
        lastName : '',
        country : '',
        company_name : '',
        email : '',
        domain : '',
        industry : '',
        phone : '',
        duration_time : '',
        visit : '',
        role : "publisher",
        agree : 1,
    })
    const [value, setValue] = useState("");
    const handleChange = (e) => {
        e.persist();
        setData({...data, [e.target.name] : e.target.value});
    }
    const handleClick = (e) => {
        e.preventDefault();
       setData({...data, duration_time : e.target.value});
    }
    const handleChange2 = (e) => {
        e.persist();
        setValue(e.target.value);
        setData({...data, industry : e.target.value});
    }
    const handleClick2 = (e) => {
        e.preventDefault();
        setData({...data, visit : e.target.value});
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("email", data.email);
        newForm.append("phone", data.phone);
        newForm.append("company", data.company_name);
        newForm.append("country", data.country);
        newForm.append("industry", data.industry);
        newForm.append("website", data.domain);
        newForm.append("average_visit", data.visit);
        newForm.append("website_timeline", data.duration_time);
        newForm.append("role", data.role);
        newForm.append("agree", data.agree);
        axios({
            url : `https://api.moovitdigital.com/api/user/publisher/${id}?firstName=${data.firstName}&lastName=${data.lastName}&phone=${data.phone}&country=${data.country}&company=${data.company_name}&industry=${data.industry}&role=${data.role}&agree=1&average_visit=${data.visit}&website_timeline=${data.duration_time}&website=${data.domain}&email=${data.email}`,
            method : 'PUT',
            data : newForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                console.log(res.data);
                setLoading(false)
                swal("Great!", "Request has been sent successfully", "success");
            }
        })
        .catch(error => console.log(error));
    }
    console.log(data)
    return (
        <div className="publisher-form">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="heading">
                            <h4>Publisher request form</h4>
                        </div>
                        <form onSubmit={formSubmit}>
                            <h5>1. Personal Details</h5>
                            <div className="row justify-content-between">
                                <div className="col-6">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" placeholder="Joe" name="firstName" value={data.firstName} onChange={handleChange} required />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" placeholder="Bullion" name="lastName" value={data.lastName} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="row">
                                {/* <div className="col-6">
                                    <label htmlFor="">State</label>
                                    <input type="text" placeholder="Lagos" name="state" value={data.state} onChange={handleChange}/>
                                </div> */}
                                <div className="col-6">
                                    <label htmlFor="">Country</label>
                                    <input type="text" placeholder="Nigeria" name="country" value={data.country} onChange={handleChange} required/>
                                </div>
                            </div>
                            <h5 className="mt-4">2. Company Details</h5>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Name of company/organisation</label>
                                    <input type="text" placeholder="The Brand Hub" name="company_name" value={data.company_name}onChange={handleChange} required/>
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder="jonbellion@gmail.com" name="email" value={data.email} onChange={handleChange} required/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Domain name</label>
                                    <input type="text" placeholder="www.name.com" name="domain" value={data.domain} onChange={handleChange} required/>
                                </div>
                                <div className="col-6">
                                    <div className="form-group star">
                                        <label htmlFor="">Business Type</label>
                                        <select name="" id="" value={value} onChange={handleChange2} required>
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
                                <div className="col-6">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="text" placeholder="0912 342 3452" name="phone" value={data.phone} onChange={handleChange} required/>
                                </div>
                                {/* <div className="col-6">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="text" placeholder="12/01/01" name="dob" value={data.dob} onChange={handleChange}/>
                                </div> */}
                            </div>

                            <div className="duration mt-4">
                                <h5>How long have your used this domain?</h5>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="6months" onChange={handleClick} id="1"/>
                                                <span>Less than 6 months</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="6months-1year" onChange={handleClick} id="2"/>
                                                <span>6 months - 1 Year</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="1-5years" onChange={handleClick} id="3"/>
                                                <span>1 - 5 years</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="5-10years" onChange={handleClick} id="4"/>
                                                <span>5 -10 years</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="10-15years" onChange={handleClick} id="5"/>
                                                <span>10-15 years</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" name="duration_frame" value="over 15 years" onChange={handleClick} id="6"/>
                                                <span>Over 15 years</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div className="duration mt-4">
                                <h5>What is the average visit your domain recieves monthly?</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="less than 100" onClick={handleClick2}/>
                                                <span>Less than 100</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="100-500" onClick={handleClick2}/>
                                                <span>100-500</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="500-2000" onClick={handleClick2}/>
                                                <span>500-2000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="2000 - 4000" onClick={handleClick2}/>
                                                <span>2000-4000</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="4000 - 7000" onClick={handleClick2}/>
                                                <span>4000-7000</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio"  name="visit" value="7000 and above" onClick={handleClick2}/>
                                                <span>7000 and above</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div className="agree-policy">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="checkbox" />
                                        <p>By continuing, you’re agreeing to our Customer Terms of 
                                        Service, Privacy Policy, and Cookie Policy.</p>
                                    </div>
                                </div>
                            </div>
                            <button>Send Request</button>
                            <div className="spinner mb-4" style={{display : loading ? "block" : "none"}}>
                                <Loader type="TailSpin" color="#EE315D" height={30} width={30} />
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PublisherForm;
