import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DragDrop from '../dragDrop/dragDrop';
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';

const CreateForm = ({createAds, setCreateAds, setFile, showNext2, setShowNext2, setShowNext3, handleChange}) => {

    
    const handleChange2 = (e) => {
        e.preventDefault();
    }

    const initialValue = () => {
        const value = "Abia";
        return value;
      };
    const [value, setValue] = useState(initialValue);
    const [locations, setLocation] = useState([]);
    const [getState, setGetState] = useState([]);
    const [lga, setLga] = useState([]);    

    useEffect( () => {
        const url = 'http://locationsng-api.herokuapp.com/api/v1/states';
        axios.get(url)
        .then(res => {
            const stateList = res.data;
            setGetState(stateList);
        })

        const url2 = `http://locationsng-api.herokuapp.com/api/v1/states/${value}/lgas`;
        axios.get(url2)
        .then(res => {
            const lgas = res.data;
            setLga(lgas)
        })
    }, [value])
    const __handleChange = (e) => {
        const targetLocation = e.target.value;
        setValue(targetLocation);
        setCreateAds({...createAds, location : targetLocation })
    }
    const __handleChange2 =(e) => {
        const targetArea = e.target.value;
        console.log(targetArea);
        setLocation(prevState => [...prevState, targetArea]);
    }
    const handleSave = (e) =>{
        e.preventDefault();
        setCreateAds({...createAds, area : locations });
        setShowNext2("none");
        setShowNext3("block");
    }
    console.log(locations)
    console.log(createAds)
    return (
        <div style={{display : showNext2}}>
            <div className="pages-link">
                <Link>Home</Link>
                <img src={caretRight} alt="caret right"/>
                <Link>Create an Ad</Link>
            </div>
            <div className="page-progress">
            <div className="item first">
                    <img src={tick} alt="ellipse1" />
                    <p>Select a budget</p>
                </div>
                <div className="item">
                    <img src={ellipse1} alt="ellipse1" />
                    <p>Ads details</p>
                </div>
                <div className="item">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Pick a template</p>
                </div>
                <div className="item">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Have a call</p>
                </div>
                <div className="item last">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Make payment</p>
                </div>
            </div>
            <div className="content-form">
                <div className="row">
                    {/* <form onSubmit={handleSubmit}> */}
                        <h5>Ads details</h5>
                        <div className="form-wrapper">
                            <div className="form-group mb-2">
                                <label htmlFor="">Title</label><br></br>
                                <input type="text"  placeholder="The Brand Hub" name="title" onChange={handleChange} value={createAds.title}/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="">Description</label><br></br>
                                <textarea name="" id="" cols="10" rows="4" placeholder="Type text here" name="description" value={createAds.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="">Upload banner</label><br></br>
                                <DragDrop />
                                <input type="file" name="image" 
                                        onChange={(e) => setFile( e.target.files[0])}
                                        onClick={(event)=> { 
                                            event.target.value = null
                                    }}
                                />
                            </div>
                            <div className="row dates mb-4">
                                <div className="col">
                                    <div className="form-group start">
                                        <label htmlFor="">Start date</label><br></br>
                                        <input type="text"  placeholder="(DD/MM/YY) e.g 10/2/2021" name="start" onChange={handleChange} value={createAds.start}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end">
                                    <label htmlFor="">End date</label><br></br>
                                    <input type="text"  placeholder="(DD/MM/YY) e.g 20/3/2022" name="end" onChange={handleChange} value={createAds.end}/>
                                </div>
                            </div>
                            <div className="row dates mb-3">
                                <div className="col">
                                    <div className="form-group start">
                                        <label htmlFor="">Gender</label><br></br>
                                        <input type="text"  placeholder="Male" name="gender" onChange={handleChange} value={createAds.gender}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end">
                                        <label htmlFor="">Age range</label><br></br>
                                        <input type="text"  placeholder="18 - 60" name="ageRange" onChange={handleChange} value={createAds.ageRange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-6">
                                    <div className="form-group start">
                                        <label htmlFor="">phone</label><br></br>
                                        <input type="text"  placeholder="+234 816 911 4001" name="phone" onChange={handleChange} value={createAds.phone}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group end">
                                        <label htmlFor="">Business Location</label><br></br>
                                        <input type="text"  placeholder="Lagos, Nigeria" name="business_location" onChange={handleChange} value=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="inner-content">
                                    <h4>Campaign Type</h4>
                                    <p>Tick all that apply*</p>
                                    <div className="campagin">
                                        <div className="form-group">
                                            <input type="checkbox" name="awareness" id="" onClick={() =>setCreateAds({...createAds, 'awareness' : 1})}/>
                                            <span>Awareness</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="traffic" id="" onClick={() =>setCreateAds({...createAds, 'traffic' : 1})}/>
                                            <span>Traffic</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="engagement" id="" onClick={() =>setCreateAds({...createAds, 'engagement' : 1})}/>
                                            <span>Enagagement</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="conversions" id="" onClick={() =>setCreateAds({...createAds, 'conversions' : 1})}/>
                                            <span>Conversions</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="sales" id="" onClick={() =>setCreateAds({...createAds, 'sales' : 1})}/>
                                            <span>Sales</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                            <span>App installs</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="checkbox" name="reach" id="" onClick={() =>setCreateAds({...createAds, 'reach' : 1})}/>
                                            <span>Reach</span>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="">budget_id</label><br></br>
                                <input type="text"  placeholder="The Brand Hub" name="budget_id" onChange={handleChange} value={createAds.budget_id}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">graphic id</label><br></br>
                                <input type="text"  placeholder="The Brand Hub" name="graphic_id" onChange={handleChange} value={createAds.graphic_id}/>
                            </div> */}
                            <div className="row dates">
                                <div className="col">
                                    <div className="form-group start">
                                        <label htmlFor="">Target area</label><br></br>
                                        <select value={value} onChange={__handleChange}>
                                            {
                                                getState.map(({ name }) => {
                                                    return(
                                                        <option key={name} value={name}>{name}</option>
                                                    )   
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end">
                                        <label htmlFor="">Pick location</label><br></br>
                                        <select onChange={__handleChange2}>
                                            {
                                                lga.map((result, index) => {
                                                    return(
                                                        <option key={index} value={result}>{result}</option>
                                                    )   
                                                })
                                            }
                                        </select>
                                        <p>You can pick up to three locations</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="target-area">
                                <div className="target-form">
                                    <div className="picked-locations">
                                        <h5>Picked Locations</h5>
                                        <div className="location-list">
                                            {
                                                locations.map(location => {
                                                    return(
                                                        <p>{location}</p>
                                                    )   
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="lower-btn">
                                <p>Back</p>
                                <button onClick={handleSave}>
                                    Save and continue
                                </button>
                            </div>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default CreateForm;
