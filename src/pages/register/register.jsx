import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import Loader from "react-loader-spinner";
import '../Login/Login.scss';
// import google from '../../assets/google.svg';
import image from '../../assets/image 1.png';
import Header from '../../components/header/header';
import axios from 'axios';

const Register = ({navBackground}) => {
    const [error_msg, setError_msg] = useState([]);
    const history = useHistory();
    const [register, setRegister] = useState({
        email : '',
        password : '',
        confirm_password : "",
        loading : false,
    })

    const handleChange = (e) => {
        e.persist();
        setRegister({...register, [e.target.name] : e.target.value});
    }

    const formSubmit = (e) => {
        e.preventDefault();
        if(register.email !== "" && register.password !== "" && register.confirm_password !== ""){
            setRegister({loading : true});
            const data = {
                email : register.email,
                password : register.password,
                password_confirmation : register.confirm_password
            }
            const newData = new FormData();
            newData.append('email', data.email);
            newData.append('password', data.password);
            newData.append('password_confirmation', data.password_confirmation);
    
            axios({
                url : 'https://test.canyousing.com.ng/api/user/register',
                method : 'POST',
                data : newData,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then(res => {
                if(res.status === 200){
                    localStorage.setItem('user-email', data.email);
                    history.push('/email-verification');
                }
            })
            .catch(err => {
                setError_msg(err.response.data.error)
                setRegister({loading : false});
            })
        }        
    }
    const error_mail = error_msg.email;
    const error_password = error_msg.password;

    let error_text = '';
    if (error_mail !== undefined){
        error_mail.map(res => {
            return(
                error_text = <p>{res}</p>
            )
        })
    }
    let error_text2 = '';
    if(error_password !== undefined){
        error_password.map(res => {
            return(
                error_text2 = <p>{res}</p>
            )
        })
    }

    let btnText = ""
    if(register.loading === true){
        btnText = <div className="spier" style={{display : register.loading ? "block" : "none"}}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
        </div>
    }else if(register.loading === false){
        btnText = <span>Continue</span>
    }
    return (
        <div className="sign-up">
            <Header navBackground={navBackground}/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={formSubmit}>
                            <img src={image} alt="" />
                            <h4>Create an account</h4>
                            <p>Set up a new account</p>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" required placeholder="joe@gmail.com" name="email" onChange={handleChange} value={register.email}/>
                                {error_text}
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" required placeholder="Enter your password" name="password" onChange={handleChange} value={register.password}/>
                                {error_text2}
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" required placeholder="Enter your password" name="confirm_password" onChange={handleChange} value={register.confirm_password}/>
                            </div>
                            <div className="forget-password">
                                <Link>Atleast 8 characters</Link>
                            </div>
                            
                            <button type="submit" className="d-flex align-center justify-content-center" 
                            style={{backgroundColor : register.loading ? "#333333" : "#EE315D"}}
                            >
                             {btnText}   
                            </button>
                        </form>
                       <div className="signup">
                           <p>Already have an account? <Link to='/login'>Login </Link></p>
                       </div>
                       {/* <p>OR</p>
                       <div className="google-btn">
                            <img src={google} alt="google icon" />
                            <p>Continue with Google</p>
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

export default Register;



// <script>
//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
// </script>


// app id : 410776757185843
// app secret : 34fed8516bdfc5d08fbde9ffb60e8850

// url : https%3A%2F%2Fmoovitdigital.com%2F
// https://facebook.com/v6.0/dialog/oauth?client_id=410776757185843&redirect_url=https%3A%2F%2Fmoovitdigital.com%2F&state=08169114