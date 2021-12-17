import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import Header from '../../components/header/header';
import '../Login/Login.scss';
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
        axios.get('https://api.moovitdigital.com/facebook/auth')
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err));
    }
    const google_login = (e) => {
        e.preventDefault();
        axios.get('https://api.moovitdigital.com/google/googlelogin')
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
        console.log(data)
        const newData = new FormData();
        newData.append('email', data.email);
        newData.append('password', data.password);

        axios({
            url : 'http://test.canyousing.com.ng/api/user/login',
            method : 'POST',
            data : newData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status === 200){
                console.log(res.data)
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
            if(err){
                setLogin({loading : false});
                // window.location.reload()
            }
            setError_msg(err.response.data.error)
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
                            <button type="submit">
                                <span>Login</span><br></br>
                            </button>
                        </form>
                        <div className="spinner" style={{display : login.loading ? "block" : "none"}}>
                            <Loader type="TailSpin" color="#EE315D" height={30} width={30} />
                        </div>
                       <div className="signup">
                           <p>Don’t have an account? <Link to='/register'>Sign up</Link></p>
                       </div>
                       {/* <p className="or my-4">OR</p>
                       <div className="google-btn" onClick={google_login} >
                            <img src={google} alt="google icon" />
                            <p>Continue with Google</p>
                       </div> */}
                       {/* <div className="google-btn" onClick={fb_login}>
                            <img src={facebook} alt="google icon" />
                            <p>Continue with Facebbok</p>
                        </div> */}
                       <div className="policy">
                            <div className="tnc">
                                <Link>Terms and Conditions</Link>
                            </div>
                            <div className="tnc">
                                <Link>Privacy Policy</Link>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;

