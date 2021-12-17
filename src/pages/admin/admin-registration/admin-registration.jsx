import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../../Login/Login.scss';
import Header from '../../../components/header/header';
import axios from 'axios';

const AdminRegistration = ({navBackground}) => {
    const history = useHistory();
    const [register, setRegister] = useState({
        email : '',
        password : '',
        confirm_password : "",
        role : ""
    })

    const handleChange = (e) => {
        e.persist();
        setRegister({...register, [e.target.name] : e.target.value});
    }

    const formSubmit = (e) => {
        e.preventDefault();
        const data = {
            email : register.email,
            password : register.password,
            password_confirmation : register.confirm_password,
            role : register.role
        }
        console.log(data)
        const newData = new FormData();
        newData.append('email', data.email);
        newData.append('password', data.password);
        newData.append('password_confirmation', data.password_confirmation);
        newData.append('role', data.role);

        axios({
            url : 'https://test.canyousing.com.ng/api/admin/register',
            method : 'POST',
            data : newData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                if(register.role === "admin"){
                    history.push('/admin');
                }else{
                    history.push('/marketer/dashboard');
                }
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="sign-up">
        <Header navBackground={navBackground}/>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <form onSubmit={formSubmit}>
                            <h5>MoovIT</h5>

                            <h4>Create admin account</h4>
                            <p>Set up a new admin account</p>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" placeholder="joe@gmail.com" name="email" onChange={handleChange} value={register.email}/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} value={register.password}/>
                            </div>
                            <div className="form-group">
                                <label>Confirm Password</label>
                                <input type="password" placeholder="Enter your password" name="confirm_password" onChange={handleChange} value={register.confirm_password}/>
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <input type="text" placeholder="admin" name="role" onChange={handleChange} value={register.role}/>
                            </div>
                            <div className="forget-password">
                                <Link>Atleast 8 characters</Link>
                            </div>
                            <button type="submit">Continue</button>
                        </form>
                       <div className="signup">
                           <p>Already have an account? <Link to='/login'>Login </Link></p>
                       </div>
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

export default AdminRegistration;



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