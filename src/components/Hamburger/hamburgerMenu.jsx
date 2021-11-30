import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Hamburger/hamburger.scss';
import {gsap} from 'gsap';
import smile from '../../assets/stand.svg';

const HamburgerMenu = ({state, setState}) => {

    let menu = useRef(null);
    let revealMenu = useRef(null);
    let revealBackground = useRef(null);
    let line1 = useRef(null);
    let line2 = useRef(null);
    let line3 = useRef(null);
    let info = useRef(null);

    useEffect(() => {
        if(state.clicked === false){
            //close the menu
            gsap.to([revealMenu, revealBackground], {
                duration : 0.8,
                height : 0,
                ease : "power3.inOut",
                stagger : {
                    amount : 0.07
                }
            });
            gsap.to(menu, {
                duration : 1,
                css:{display : "none"}
            });
    
        }else if(state.clicked === true ||(state.clicked === true && state.initial === null)){
            //open menu
            gsap.to(menu, {
                duration : 0,
                css:{display : "block"}
            });
            gsap.to([revealBackground, revealMenu], {
                duration: 0,
                height : "100%",
                opacity : 1
            })
            staggerReveal(revealBackground, revealMenu);
            fadeup(info);
            staggerText(line1, line2, line3);
        }
    }, [state])

    const staggerReveal = (node1, node2) => {
        gsap.from([node1, node2], {
            duration : 0.8,
            height : 0,
            transformOrigin : "right top",
            skewY : 2,
            ease : "power3.inOut",
            stagger: {
                amount : 0.1
            }
        })
    }
    const fadeup = (node) => {
        gsap.from(node, {
            y: 60,
            duration : 1,
            ease : "power3.inOut",
            opacity : 0,
            delay : 0.2
        })
    }
    const staggerText = (node1, node2, node3) => {
        gsap.from([node1, node2, node3] ,{
            y : 100,
            duration : 0.8,
            delay : .1,
            ease : "power3.inOut",
            stagger : {
                amount : 0.3
            }
        })
    }
    return(
        <div ref = {el => {menu = el } } className="hamburger">
            <div ref = {el => {revealBackground = el } } className="secondarycolorwrapper"></div>
            <div ref = {el => {revealMenu  = el } } className="menuLayer">
                <div className="menucity">
                <div className="container">
                    <div  className="wrapper">
                        <div className="content">
                            <nav>
                                <span>
                                    <Link ref = {el => {line1 = el } } onClick={() => setState({clicked : false})} to="/home">Home</Link>
                                </span>
                                <span>
                                    <Link ref = {el => {line2 = el } } onClick={() => setState({clicked : false})} to="/about">Discover Us</Link>
                                </span>
                                <span>
                                    <Link ref = {el => {line2 = el } } onClick={() => setState({clicked : false})} to="/">Packages</Link>
                                </span>
                                <span>
                                    <Link ref = {el => {line3 = el } } onClick={() => setState({clicked : false})} to="/contact">Contact us</Link>
                                </span>
                            </nav>
                            <div ref = {el => {info = el } } className="promise">
                                {/* <h4>WE ARE A</h4>
                                <p>FULL-SERVICE</p>
                                <p>FULL-BRAIN</p>
                                <p>FULL-THINKING</p>
                                <p>WE ARE MOOOOOVIT....</p> */}
                                <img src={smile} alt="moovit-smile-icon" />
                            </div>
                        </div>
                        <div className="social">
                            <ul>
                                <li>Facebook</li>
                                <li>Linkedin</li>
                                <li>Instagram</li>
                                <li>Youtube</li>
                            </ul>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default HamburgerMenu;