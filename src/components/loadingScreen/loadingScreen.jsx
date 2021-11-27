import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../components/loadingScreen/style.scss';
import logo from '../../assets/image 1.png';

const LoadingScreen = ({state, setState}) => {
    let loader = useRef(null);
    let text1 = useRef();
    let text2 = useRef();
    let text3 = useRef();
    let text4 = useRef();
    let text5 = useRef();
    let wrapper = useRef();
    let icons = useRef();
    let image1 = useRef();
    let image2 = useRef();
    let image3 = useRef();

    const tl= gsap.timeline();
    console.log(loader);
    
    useEffect(() => {
        gsap.to(loader.current, {
            duration : 0,
            css:{display : "block"}
        });
        gsap.from(wrapper.current ,{
            duration : .8,
            delay : .2,
            ease : "power3.inOut",
            stagger : {
                amount : 0.3
            }
        })
        tl.to([text1.current, text2.current, text3.current, text4.current, text5.current], {
            duration : 1.8,
            opacity :  1,
            delay : .6,
            stagger: {
                amount : .5
            },
            // skewY : 10,
            // repeat: -1,
            // repeatDelay: 1,
            // yoyo: true,
            ease : "power4.Out",
        })
        gsap.to(icons.current, {
            delay : .5,
            opacity : 1
        })
        tl.to(image1.current, {
            duration : 2.8,
            opacity :  1,
            delay : .6,
            stagger: {
                amount : .5
            },
            ease : "power4.Out"
        })
        gsap.to(loader.current, {
            height : 0,
            delay: 6.2,
            duration : 1.2,
            ease : "power3.inOut",
        })
        tl.to(image1.current, {
            duration : 8,
            delay : .6,
            stagger: {
                amount : .5
            },
            ease : "power4.Out",
            css : {
                width : "350px"
            }
        })
        gsap.to(loader.current, {
            duration : 0,
            delay : 6.8,
            opacity : 0,
            css : {
                display : "none"
            }
        })
    }, [])
    return(
        <div className="loading" ref={ loader } >
            <div className="wrapper" ref={wrapper}>
                <p ref={ text1}>You</p>
                <p ref={ text2 }>+</p>
                <p ref= { text3 }>Us</p>
                <p ref={ text4 }>=</p>
                <p ref={ text5 }>Possibilities</p>
            </div>

            <div ref={icons} className="icons">
                <img ref={image1} src={logo} alt="" />
                {/* <img ref={image2} src={logo} alt="" />
                <img ref={image3} src={logo} alt="" /> */}
            </div>        
        </div>
    )
}

export default LoadingScreen;