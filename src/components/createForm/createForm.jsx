import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../components/createForm/createform.scss';
import axios from 'axios';
import NaijaStates from 'naija-state-local-government';
import { Country, City }  from 'country-state-city';
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";

const CreateForm = ({createAds, setCreateAds, setShowNext, state, setState, start, setStart, setFile, showNext2, setShowNext2, setShowNext3, handleChange}) => {    
    
    // const handleChange3 =(data) => {
    //     let newDate = data.toLocaleString().split(',')[0];
    //     setStart(newDate);
    //     setCreateAds({...createAds, start : newDate})
    // }
    // const initialValue = () => {
    //     const value = "Nigeria";
    //     return value;
    //   };
    const [value_, setValue_] = useState({
        locate : "",
        region : ""
    });
    const [locations, setLocation] = useState([]);
    const [allArea, setAllArea] = useState([]);
    const [option, setOption] = useState({
        gender : '',
        show : false
    })
    const handleBack = (e) => {
        e.preventDefault();
        setShowNext2("none")
        setShowNext("block")
    }
    const handlePop = (e) => { 
        e.preventDefault();
        const preferedLocation = e.target.value;
        if(e.target.value !== ''){
            setAllArea(prevState => [...prevState, preferedLocation])
        }
        setLocation([]);
    }
    const closePop = (e) => {
        e.preventDefault();
        let {id} = e.currentTarget;
        const newArray = allArea.filter((item, index) => index != id)
        setAllArea(newArray);
    }
    const handleChange_1 = (e) => {
        e.persist();
        setOption({gender : e.target.value})
        setCreateAds({...createAds, gender : e.target.value})
    }
    // const handleChange_2 = (e) => {
    //     e.persist();
    //     setOption({ageRange : e.target.value});
    //     setCreateAds({...createAds, ageRange : e.target.value})
    // }

    const allCountries = Country.getAllCountries();
    const allCities = City.getCitiesOfCountry(value_.region);
    const filteredArea = allCountries.filter(item => item.name === value_.locate);
    filteredArea.map(({isoCode}) => {
        setValue_({region : isoCode})
    })
    const __handleChange = (e) => {
        e.persist();
        const targetLocation = e.target.value;
        setValue_({locate : targetLocation});
        setCreateAds({...createAds, location : e.target.value})
        // setAllArea(prevState => [...prevState, targetLocation])
    }
    const __handleChange2 =(e) => {
        const targetArea = e.target.value;
        setOption({show : true})
        setLocation(targetArea)
        // setLocation(prevState2 => [...prevState2, targetArea]);
    }
    const handleSave = (e) =>{
        e.preventDefault();
        setCreateAds({...createAds, area : allArea, [state.selectedOption] : "1" });
        setShowNext2("none");
        setShowNext3("block")
    }
    const valueChange = (e) => {
        setState({selectedOption : e.target.value});
    }
    console.log(allArea)
    return (
        <div style={{display : showNext2}}>
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
                    <img src={ellipse1} alt="ellipse1" />
                    <p>Ads details</p>
                </div>
                <div className="item">
                    <img src={ellipse2} alt="ellipse1" />
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
                <div className="row">
                    {/* <form onSubmit={handleSubmit}> */}
                        <h5>Ads details</h5> 
                        <div className="form-wrapper">
                            <div className="form-group mb-2">
                                <label htmlFor="">Campaign Name</label><br></br>
                                <input type="text"  placeholder="The Brand Hub" required name="title" onChange={handleChange} value={createAds.title}/>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="">Description</label><br></br>
                                <textarea name="" id="" cols="10" rows="4" required placeholder="Type text here" name="description" value={createAds.description} onChange={handleChange}></textarea>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="">Upload banner</label><br></br>
                                <input type="file" name="image" required
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
                                        {/* <DatePicker
                                        selected={createAds.start}
                                        onChange={(data) => handleChange3(data)}
                                        minDate={new Date(), 1}
                                        placeholderText="Select a day"
                                        /> */}
                                        <input type="date" required  placeholder="(DD/MM/YY) e.g 10/2/2021" name="start" onChange={handleChange} value={createAds.start}/>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end">
                                    <label htmlFor="">End date</label><br></br>
                                    <input type="date" required  placeholder="(DD/MM/YY) e.g 20/3/2022" name="end" onChange={handleChange} value={createAds.end}/>
                                </div>
                            </div>
                            <div className="row dates mb-3">
                                <div className="col">
                                    <div className="form-group mr-3 start">
                                        <label htmlFor="">Gender</label><br></br>
                                        <select name="gender" value={option.gender} id="" onChange={handleChange_1} required>
                                            <option value="" selected disabled>select gender</option>
                                            <option value="all">All</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end">
                                        <label htmlFor="">Age range</label><br></br>
                                        {/* <select name="" id="" value={option.ageRange} onChange={handleChange_2} required>
                                            <option value="" selected disabled>select age range</option>
                                            <option value="18-30">18-30</option>
                                            <option value="31-50">31-50</option>
                                            <option value="51-70">51-70</option>
                                            <option value="above 70">Above 70</option>
                                        </select> */}
                                        <input type="text"  placeholder="18-60" required name="ageRange" onChange={handleChange} value={createAds.ageRange}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-6">
                                    <div className="form-group start">
                                        <label htmlFor="">phone</label><br></br>
                                        <input type="text" required placeholder="+234 816 911 4001" name="phone" onChange={handleChange} value={createAds.phone}/>
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
                                            <input type="radio" value="awareness" name="type" checked={state.selectedOption === "awareness"} id="" onChange={valueChange}/>
                                            <span>Awareness</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="traffic" name="type" checked={state.selectedOption === "traffic"} onChange={valueChange} />
                                            <span>Traffic</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="engagement" name="type" checked={state.selectedOption === "engagement"} onChange={valueChange} />
                                            <span>Enagagement</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="conversions" name="type" checked={state.selectedOption === "conversions"} onChange={valueChange} />
                                            <span>Conversions</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="sales" id="" name="type" checked={state.selectedOption === "sales"} onChange={valueChange} />
                                            <span>Sales</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="apps" id="" name="type" checked={state.selectedOption === "apps"} onChange={valueChange} />
                                            <span>App installs</span>
                                        </div>
                                        <div className="form-group">
                                            <input type="radio" value="reach" name="type" checked={state.selectedOption === "reach"} onChange={valueChange} />
                                            <span>Reach</span>
                                        </div>
                                        {/* <div className="form-group">
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
                                        </div> */}
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-6">
                                    <div className="form-group mr-3">
                                        <label htmlFor="">Enter Target area</label><br></br>
                                        <input list="data" value={value_.locate} onChange={__handleChange} required />
                                        <datalist id="data">
                                            {allCountries.map(({name, isoCode}) =>
                                                <option value={name} id={isoCode}>{name}</option>
                                            )}
                                        </datalist>
                                        {/* <select value={value} required onChange={__handleChange}>
                                            {
                                                allCountries.map(({ name,code }) => {
                                                    return(
                                                        <option key={name} value={name}>{name}</option>
                                                    )   
                                                })
                                            }
                                        </select> */}
                                    </div>
                                </div>
                                {/* <div className="col">
                                    <div className="form-group end">
                                        <label htmlFor="">Pick location</label><br></br>
                                        <select  required style={{height : "41.5px"}}>
                                            {
                                                allCities.map(({name, stateCode}) => {
                                                    return(
                                                        <option value={name}>{name} </option>
                                                    )   
                                                })
                                            }
                                        </select>
                                    </div>
                                </div> */}
                            </div>
                            <div className="preferred-location mb-5">
                                <div className="row mt-4">
                                    <div className="col-md-6" style={{position: "relative"}}>
                                        <label htmlFor="">Enter preferred Locations</label>
                                        <input type="text" name="prefer-location" value={locations} onChange={__handleChange2}  />
                                        <div className="board" style={{display : option.show ? "block" : "none"}}>
                                            <input type="text" defaultValue={locations} onClick={handlePop} readonly="readOnly"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="target-area">
                                <div className="target-form">
                                    <div className="picked-locations">
                                        <h5>Picked Locations</h5>
                                        <div className="location-list">
                                            {
                                                allArea.map((location, index) => {
                                                    return <div className="picked d-flex align-item-center justify-content-between">
                                                            <p>{location}</p>
                                                            <p className="close" id={index} onClick={closePop}>x</p>
                                                        </div> 
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row demographic">
                                <div className="col">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                        <th scope="col">Age-Group</th>
                                        <th scope="col">Education</th>
                                        <th scope="col">Employment</th>
                                        <th scope="col">Income(Naira)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>Under 12 years</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>12 - 20 years</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>21 - 40 years</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>41 - 60years</span>
                                                </div>
                                            </td>
                                         {/* </tr> */}
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>12 - 20 years</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span> Above 60years</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <input type="checkbox" name="apps" id="" onClick={() =>setCreateAds({...createAds, 'apps' : 1})}/>
                                                    <span>App installs</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <div className="lower-btn">
                                <p className="" onClick={handleBack}>Back</p>
                                <button onClick={handleSave}>
                                    Save and continue
                                </button>
                            </div>
                    {/* </form> */}
                </div>
            </div>
        </div>
    )
}

export default CreateForm;
