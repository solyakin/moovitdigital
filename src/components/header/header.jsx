import React, {useState} from 'react';
import axios from 'axios'
import '../header/header.scss';
import { Link, useHistory } from 'react-router-dom';
import smile from '../../assets/smile.svg';
import hamburger from '../../assets/hamburger.png';
import close from '../../assets/close.png';
import Hamburger from '../Hamburger/hamburgerMenu';

const Header = ({navBackground}) => {

    console.log(navBackground)
    const history = useHistory();
    const [state, setState] = useState({
        initial : false,
        clicked : null,
        setName : 'Menu'
    })

    const [disabled, setDisabled] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
            //    'Content-Type' : 'multipart/form-data',
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

    const handleClick = () => {
        disabledMenu();
        if(state.initial === false){
            setState({
                initial : null,
                clicked : true,
                setName : "Close"
            });
            console.log(1)
        }else if(state.clicked === true){
            setState({
                clicked : !state.clicked,
                setName : "Menu"
            })
            console.log(2)
        } else if(state.clicked === false){
            setState({
                clicked : !state.clicked,
                setName : "Close"
            })
            console.log(3)
        }
         
    }
    if(state.clicked === null || state.clicked === false){
        LoginBtns = <img src={hamburger}  alt="hamburger-icon" width="40px"/>
    }else if(state.clicked === true){
        LoginBtns = <img src={close}  alt="close-icon" width="30px"/>
    }
    console.log(state.clicked);
    // if(!token){
    //     LoginBtns = (
    //         <div className="navbar">
    //             <li className="nav-item">
    //                 <Link className="nav-link" to="/login">Sign in</Link>
    //             </li>
    //             <li className="nav-item">
    //                 <Link className="start-btn" to="/register">Get Started</Link>
    //             </li>
    //         </div>
    //     )
    // }else{
    //     LoginBtns = (
    //         <li className="nav-item">
    //             <button className="btn btn-danger btn-bg" onClick={handleLogout}>Logout</button>
    //         </li>
            
    //     )
    // }

    const disabledMenu = () => {
        setDisabled(!disabled);
        setTimeout(() => {
            setDisabled(false)
        }, 1200)
    }
    return (
        <div className="header" style={{background : navBackground}}>
            <div className="container">
                <div className="logo">
                    <Link to='/home'>
                        <img src={smile} alt="moovit-smile-logo" />
                    </Link>
                    <button disabled={disabled} onClick={handleClick}>
                        {LoginBtns}
                    </button>
                </div>
            </div>
            <Hamburger state={state} setState={setState}/>
        </div>
    )
}

export default Header
