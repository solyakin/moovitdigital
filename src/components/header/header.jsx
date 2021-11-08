import React from 'react';
import axios from 'axios'
import '../header/header.scss';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {

    const history = useHistory();

    const handleLogout = (e) => {
        e.preventDefault();
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios .post('/api/user/logout')
        .then(res => {
            if(res.status == 200){
                localStorage.removeItem('auth_token', res.data.token);
                localStorage.removeItem('auth_name', res.data.firstName);
                history.push('/');
            }
        })
        .catch(err => console.log(err))
    }
    const token = localStorage.getItem("auth_token");
    let LoginBtns = "";

    if(!token){
        LoginBtns = (
            <div className="navbar">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Sign in</Link>
                </li>
                <li className="nav-item">
                    <Link className="start-btn" to="/register">Get Started</Link>
                </li>
            </div>
        )
    }else{
        LoginBtns = (
            <li className="nav-item">
                <button className="btn btn-danger btn-bg" onClick={handleLogout}>Logout</button>
            </li>
            
        )
    }
    return (
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link className="navbar-brand" to="/">MoovIT</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Services</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Partnership</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact Us</Link>
                            </li>
                        </ul>
                    <form className="d-flex navbar-nav">
                        {LoginBtns}
                    </form>
                    </div>
                </div>
                </nav>
        </div>
    )
}

export default Header
