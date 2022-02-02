 import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import Header from '../../components/header/header';
import '../Login/Login.scss';
import swal from 'sweetalert';
import google from '../../assets/google.svg';
import image from '../../assets/image 1.png';
import facebook from '../../assets/facebook.png';
import axios from 'axios';

const Login = ({navBackground}) => {
    
    const history = useHistory();
    const [error_msg, setError_msg] = useState([]);
    const [login, setLogin] = useState({
        email : '',
        password : '',
        loading : false
    })

    const handleChange = (e) => {
        e.persist();
        setLogin({...login, [e.target.name] : e.target.value});
    }

    const fb_login = (e) => {
        e.preventDefault();
        axios.get('https://test.canyousing.com.ng/user/facebook/auth')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }
    const google_login = (e) => {
        e.preventDefault();
        axios.get('https://test.canyousing.com.ng/google/googlelogin')
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err))
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setLogin({loading : true});
        const data = {
            email : login.email,
            password : login.password
        }
        const newData = new FormData();
        newData.append('email', data.email);
        newData.append('password', data.password);

        axios({
            url : 'https://test.canyousing.com.ng/api/user/login',
            method : 'POST',
            data : newData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                console.log(res.data.data)
                if(res.data.action === 'old' && res.data.data.role === 'advertiser'){
                    localStorage.setItem('auth_name', res.data.data.firstName);
                    localStorage.setItem('auth_id', res.data.data.id);
                    localStorage.setItem('auth_token', res.data.data.token);
                    localStorage.setItem('auth_role', res.data.data.role);
                    history.push('/dashboard/advertiser'); 
                }else if(res.data.action === "new"){
                    localStorage.setItem('auth_token', res.data.data.token);
                    localStorage.setItem('auth_id', res.data.data.id);
                    history.push('/account-type'); 
                }else if(res.data.data.role === 'publisher' && res.data.data.approved === null ){
                    console.log("Not Approved")
                    history.push('/request-status')
                }else if(res.data.action === 'old' && res.data.data.role === 'publisher'){
                    localStorage.setItem('auth_name', res.data.data.firstName);
                    localStorage.setItem('auth_id', res.data.data.id);
                    localStorage.setItem('auth_token', res.data.data.token);
                    localStorage.setItem('auth_role', res.data.data.role);
                    history.push('/dashboard/publisher')
                } 
            } 
        })
        .catch(err => {
            console.log(err)
            if(err.response){
                setLogin({loading : false, email : '', password : ''});
                setError_msg(err.response.data.error)
            }else if(err.response === undefined){
                setLogin({loading : false, email : '', password : ''});
                swal("Failed", "check internet connection", "error");
            }
        })
    }
    let error_text = '';
    if (error_msg !== undefined){
        error_msg.map(res => {
            return(
                error_text = <p>{res}</p>
            )
        })
    }

    let btnText = ""
    if(login.loading === true){
        btnText = <div className="spier" style={{display : login.loading ? "block" : "none"}}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
        </div>
    }else if(login.loading === false){
        btnText = <span>Continue</span>
    }
    console.log(login)
    return (
        <div className="sign-up">
            <Header navBackground={navBackground}/>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={formSubmit}>
                            <img src={image} alt="" />
                            <h4>Welcome Back</h4>
                            <p>Fill in your login details</p>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" placeholder="joe@gmail.com" name="email" onChange={handleChange} value={login.email} required/>
                                {error_text}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} value={login.password} required/>
                            </div>
                            <div className="forget-password">
                                <Link to='/forget-password'>Forgot Password?</Link>
                            </div>
                            <button type="submit" style={{backgroundColor : login.loading ? "#333333" : "#EE315D"}}>
                                {btnText}
                            </button>
                        </form>
                       <div className="signup">
                           <p>Don’t have an account? <Link to='/register'>Sign up</Link></p>
                       </div>
                       {/* <p className="or my-4">OR</p>
                       <div className="google-btn"  >
                           <a href="https://test.canyousing.com.ng/google/googlelogin" className="d-flex align-item-center">
                                <img src={google} alt="google icon" />
                                <p>Continue with Google</p>
                           </a>
                       </div>
                       <div className="google-btn">
                           <a href="https://test.canyousing.com.ng/facebook/auth" className="d-flex align-item-center">
                                <img src={facebook} alt="google icon" />
                                <p>Continue with Facebbok</p>
                           </a>
                        </div> */}
                       <div className="policy">
                            <div className="tnc">
                                <Link to='#'>Terms and Conditions</Link>
                            </div>
                            <div className="tnc">
                                <Link to='#'>Privacy Policy</Link>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

