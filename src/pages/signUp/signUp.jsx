import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../Login/Login.scss';
import google from '../../assets/google.svg';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUp = () => {

    const history = useHistory();
    const [register, setRegister] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        phone : "",
        role : "",
        business : "",
        type : "",
        country : "",
        state : "",
        repeatPassword: "",
    })
    const [file, setFile] = useState(null);

    const handleChange = (e) =>{
        e.persist();
        setRegister({...register, [e.target.name] : e.target.value})
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName : register.firstName,
            lastName : register.lastName,
            email : register.email,
            password : register.password,
            phone : register.phone,
            role : register.role,
            state : register.state,
            country : register.country,
            company : register.business,
            business_type : register.type,
            password_confirmation : register.repeatPassword,
        }

        const newForm = new FormData();
        newForm.append("firstName", data.firstName);
        newForm.append("lastName", data.lastName);
        newForm.append("email", data.email);
        newForm.append("password", data.password);
        newForm.append("phone", data.phone);
        newForm.append("role", data.role);
        newForm.append("password_confirmation", data.password_confirmation);
        newForm.append("state", data.state);
        newForm.append("country", data.country);
        newForm.append("company", data.company);
        newForm.append("business_type", data.business_type);
        newForm.append("image", file);
        console.log(newForm)
        axios({
            url : 'https://api.moovitdigital.com/api/user/register',
            method : 'POST',
            data : newForm,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                console.log(res)
                // history.push('/login')
            }else{
                // setRegister({...register, error_list : res.data.validation_errors})
                console.log(res.data.message)
            }
        })
        .catch(error => console.log(error))
    }
    return (
        <div className="sign-up">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-7">
                        <form onSubmit={registerSubmit}>
                            <h5>Logo</h5>
                            <h4>Create an account</h4>
                            <p>Set up a new account</p>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input type="text" placeholder="John" name="firstName" onChange={handleChange} value={register.firstName}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input type="text" placeholder="doe" name="lastName" onChange={handleChange} value={register.lastName}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="text" placeholder="080 222 112 32" name="phone" onChange={handleChange} value={register.phone}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Role</label>
                                        <input type="text" placeholder="advertiser or Publisher" name="role" onChange={handleChange} value={register.role}/>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleChange} value={register.email}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Business Name</label>
                                        <input type="text" placeholder="Enter your password" name="business" onChange={handleChange} value={register.business}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>Business Type</label>
                                        <input type="text" placeholder="joe@gmail.com" name="type" onChange={handleChange} value={register.type}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Country</label>
                                        <input type="text" placeholder="Enter your password" name="country" onChange={handleChange} value={register.country}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <div className="form-group">
                                        <label>State</label>
                                        <input type="text" placeholder="joe@gmail.com" name="state" onChange={handleChange} value={register.state}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} value={register.password}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Profile image</label>
                                <input type="file" name="image" 
                                onChange={(e) => setFile( e.target.files[0])}
                                onClick={(event)=> { 
                                    event.target.value = null
                               }}
                                />
                            </div>
                            <div className="form-group">
                                <label>Repeat Password</label>
                                <input type="password" placeholder="Repeat Password" name="repeatPassword" onChange={handleChange} value={register.repeatPassword}/>
                            </div>
                            
                            <div className="info">
                                <p>Atleast 8 characters</p>
                            </div>
                            <button type="submit">Continue</button>
                            <Link to='/user-registration'>Next</Link>
                        </form>
                       <div className="signup">
                           <p>Already have an account? <span>Login</span></p>
                       </div>
                       <p className="my-4">OR</p>
                       <div className="google-btn">
                            <img src={google} alt="google icon" />
                            <p>Continue with Google</p>
                       </div>
                       <div className="google-btn">
                            <img src={google} alt="google icon" />
                            <p>Continue with Facebook</p>
                       </div>
                       <div className="policy">
                            <div className="tnc">
                                <Link to="tnc">Terms and Conditions</Link>
                            </div>
                            <div className="tnc">
                                <Link to="policy">Privacy Policy</Link>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp;
