import React, { useState} from 'react';
import '../templates/template.scss';
import { Link } from 'react-router-dom';
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import size from '../../assets/Rectangle 80.svg';
import temp1 from '../../assets/120 by 600.svg';
import temp2 from '../../assets/160 by 600.svg';
import temp3 from '../../assets/300 by 250.svg';
import temp4 from '../../assets/300 by 600.svg';
import temp5 from '../../assets/300 by 50 mobile.svg';
import temp6 from '../../assets/320 by 50 mobile.svg';
import temp7 from '../../assets/336 by 280.svg';
import temp8 from '../../assets/468 by 60.svg';
import temp9 from '../../assets/728 by 90.svg';
import Dialog from '../dailog/dialog';


const Templates = ({showNext3, setShowNext2, setShowNext3, show, setCreateAds, createAds, loading, Disabled, setDisabled}) => {

    const [allTemp, setAlltemp] = useState([])
    const [dialog, setDialog] = useState(false);
    const [styling, setStyling] = useState({
        style1 : true,
        style2 : false,
        style3 : false
    })
    const [pick, setPick] = useState({
        pick1 : false,
        pick2 : false,
        pick3 : false,
        pick4 : false,
        pick5 : false,
        pick6 : false,
        pick7 : false,
        pick8 : false,
        pick9 : false,
    })
    
    const [display, setDisplay] = useState({
        square : true,
        portrait : false,
        landscape : false
    })

    const boxClick = (e) => {
        e.preventDefault();
        setStyling({style1 : true, style2 : false, style3 : false}) 
        setDisplay({square : true, portrait : false, landscape : false})
    }
    const handleClick = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick1 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const onRemove = (e) => {
        e.preventDefault();
        const { id } = e.currentTarget;
        const newArray = allTemp.filter((item) => item != id)
        setAlltemp(newArray);
        if(id == 1){
            setPick({...pick, pick1 : false});
        }else if(id == 2){
            setPick({...pick, pick2 : false});
        }else if(id == 3){
            setPick({...pick, pick3 : false});
        }else if(id == 4){
            setPick({...pick, pick4 : false});
        }else if(id == 5){
            setPick({...pick, pick5 : false});
        }else if(id == 6){
            setPick({...pick, pick6 : false});
        }else if(id == 7){
            setPick({...pick, pick7 : false});
        }else if(id == 8){
            setPick({...pick, pick8 : false});
        }else if(id == 9){
            setPick({...pick, pick9 : false});
        }
    }
    const handleClick2 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick2 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick3 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick3 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick4 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick4 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick5 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick5 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick6 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick6 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick7 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick7 : true})
        setAlltemp(prevState => [...prevState, targetId])

    }
    const handleClick8 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick8 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleClick9 = (e) => {
        e.preventDefault();
        const targetId = Number(e.target.id);
        setPick({...pick, pick9 : true})
        setAlltemp(prevState => [...prevState, targetId])
    }
    const handleBack = (e) => {
        e.preventDefault();
        setShowNext2("block");
        setShowNext3("none");
    }
    const handlePopUp = (e) => {
        e.preventDefault();
        setCreateAds({...createAds, dimensions : allTemp});
        setDialog(true);
    }
    console.log(allTemp)
    console.log(pick.pick1)
    console.log(createAds)
    return (
        <div style={{display : showNext3}} id="temp">
            <div className="pages-link">
                <Link to='#'>Home</Link>
                <img src={caretRight} alt="caret right"/>
                <Link to='#'>Create an Ad</Link>
            </div>
            <div className="page-progress">
            <div className="item first">
                    <img src={tick} alt="ellipse1" />
                    <p>Select a budget</p>
                </div>
                <div className="item">
                    <img src={tick} alt="ellipse1" />
                    <p>Ads details</p>
                </div>
                <div className="item">
                    <img src={ellipse1} alt="ellipse1" />
                    <p>Pick a template</p>
                </div>
                <div className="item ">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Make payment</p>
                </div>
                <div className="item last">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Have a call</p>
                </div>
                
            </div>
            <div className="content-form">
                <div className="row_">
                    <h5>Pick a graphic</h5>
                    <div className="template-fold mt-4">
                        <div className="template-tags">
                            <div className="tag-item" onClick={boxClick} style={{border : styling.style1 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size} alt="" />
                                <p> Selected Templates</p>
                            </div>
                            {
                                allTemp.map(id => {
                                    let template = ""
                                    if(id == 1){
                                       template = <li>300 x 250</li>
                                    }else if(id == 2){
                                        template = <li>336 x 280</li>
                                    }else if(id == 3){
                                        template = <li>300 x 50</li>
                                    }else if(id == 4){
                                        template = <li>320 x 50</li>
                                    }else if(id == 5){
                                        template =  <li>729 x 90</li>
                                    }else if(id == 6){
                                        template = <li>486 x 60</li>
                                    }else if(id == 7){
                                        template = <li>300 x 600</li>
                                    }else if(id == 8){
                                        template = <li>120 x 600</li>
                                    }else if(id == 9){
                                        template = <li>160 x 600</li>
                                    }
                                    return(
                                        <div className="selected-dimensions">
                                            <ul>
                                                {template}
                                            </ul>
                                        </div>
                                    )
                                })
                            }
                            {/* <div className="tag-item" onClick={boxClick1} style={{border : styling.style2 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size2} alt="" />
                                <p>Portrait</p>
                            </div>
                            <div className="tag-item" onClick={boxClick2} style={{border : styling.style3 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size3} alt="" />
                                <p>Landscape</p>
                            </div> */}
                        </div>
                        <div className="template-image mb-4 ">
                            <p className="text-center">Select all dimensions that suit your campaign</p>
                            <div className="bordering text-center">
                                {/* <div className="square" style={{display : display.square ? "block" : "none"}}> */}
                                    <div className="folder" style={{width : "300px", height : "250px"}}>
                                        <img src={temp3} alt="" id="1"
                                         className='temp-img'
                                         onClick={handleClick} 
                                         style={{border : pick.pick1 ? "3px solid #6060f3" : "none", width : "300px", height:"250px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                         className='tick' 
                                         style={{display : pick.pick1 ? "block" : "none"}} />
                                        <div className="overlay"
                                        style={{width : "300px", height : "250px", display : pick.pick1 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="1" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder" style={{width : "336px", height : "280px"}}>
                                        <img src={temp7} alt="" id="2" 
                                        onClick={ handleClick2} 
                                        style={{border : pick.pick2  ? "3px solid #6060f3" : "none", width : "336px", height:"280px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick2 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "336px", height : "280px", display : pick.pick2 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="2" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                {/* </div> */}
                                {/* <div className="landscape" style={{display : display.landscape ? "block" : "none"}}> */}
                                    <div className="folder mt-3 mb-4" style={{width : "300px", height : "50px"}}>
                                        <img src={temp5} alt="" id="3"
                                         onClick={handleClick3} 
                                         style={{border : pick.pick3 ? "3px solid #6060f3" : "none", width : "300px", height:"50px"}}/>
                                         <img src={tick} alt="tick-icon" 
                                         className='tick' 
                                         style={{display : pick.pick3 ? "block" : "none"}}/>
                                         <div className="overlay"
                                        style={{width : "300px", height : "50px", display : pick.pick3 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="3" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder mb-4" style={{width : "320px", height : "50px"}}>
                                        <img src={temp6} alt="" id="4"
                                        onClick={handleClick4} 
                                        style={{border : pick.pick4 ? "3px solid #6060f3" : "none", width : "320px", height:"50px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick4 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "320px", height : "50px", display : pick.pick4 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="4" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder mb-4" style={{width : "100%", height : "90px"}}>
                                        <img src={temp9} alt="" id="5"
                                        onClick={handleClick5} 
                                        style={{border : pick.pick5 ? "3px solid #6060f3" : "none", width : "100%",
                                        height:"90px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick5 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "100%", height : "90px", display : pick.pick5 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="5" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder mb-4" style={{width : "95%", height : "60px"}}>
                                        <img src={temp8} alt="" id="6"
                                        onClick={handleClick6} 
                                        style={{border : pick.pick6 ? "3px solid #6060f3" : "none", width : "100%",
                                        height:"60px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick6 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "100%", height : "60px", display : pick.pick6 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="6" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>  
                                {/* </div> */}
                                {/* <div className="portrait" style={{display : display.portrait ? "block" : "none"}}> */}
                                    <div className="folder" style={{width : "300px", height : "450px"}}>
                                        <img src={temp4} alt="" id="7"
                                        onClick={handleClick7} 
                                        style={{border : pick.pick7 ? "3px solid #6060f3" : "none", width : "300px", height:"450px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick7 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "300px", height : "450px", display : pick.pick7 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="7" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder" style={{width : "120px", height : "500px"}}>
                                        <img src={temp1} alt="" id="8"
                                        onClick={handleClick8} 
                                        style={{border : pick.pick8 ? "3px solid #6060f3" : "none", width : "120px", height:"500px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick8 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "120px", height : "500px", display : pick.pick8 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="8" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                    <div className="folder" style={{width : "160px", height : "500px"}}>
                                        <img src={temp2} alt="" id="9"
                                        onClick={handleClick9} 
                                        style={{border : pick.pick9 ? "3px solid #6060f3" : "none", width : "160px", height:"500px"}}/>
                                        <img src={tick} alt="tick-icon" 
                                        className='tick' 
                                        style={{display : pick.pick9 ? "block" : "none"}}/>
                                        <div className="overlay"
                                        style={{width : "160px", height : "500px", display : pick.pick9 ? "block" : "none"}}>
                                            <div className="button-wrapper">
                                                <button id="9" onClick={onRemove}>Remove</button>
                                            </div>   
                                        </div>
                                    </div>
                                {/* </div> */}
                                
                            </div>
                            <div className="direction-btn">
                                <p className="back" onClick={handleBack}>Back</p>
                                <div className="btn">
                                    <button onClick={handlePopUp}>Finish</button>
                                </div>          
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <Dialog dialog={dialog} setDialog={setDialog} show={show} />
        </div>
    )
}

export default Templates
