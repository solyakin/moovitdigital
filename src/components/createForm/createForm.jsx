import React, {useState, useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import '../../components/createForm/createform.scss';
import axios from 'axios';
import swal from 'sweetalert'
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import subDays from "date-fns/subDays";
import ReactSlider from 'react-slider';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

const CreateForm = ({createAds, setCreateAds, setShowNext, state, setState, start, setStart, setFile, showNext2, setShowNext2, setShowNext3, handleChange}) => {   
    const [newPhone, setPhone] = useState(false);
    const [query, setQuery] = useState("");
    const autoCompleteRef = useRef(null);
    const [allArea, setAllArea] = useState([]);
    const apiKey = PROCESS.ENV.token

    function handleScriptLoad(updateQuery, autoCompleteRef) {
        autoComplete = new window.google.maps.places.Autocomplete(
          autoCompleteRef.current
          // { types: ["geocode"] }
        );
        autoComplete.setFields(["address_components", "formatted_address"]);
        autoComplete.addListener("place_changed", () =>
          handlePlaceSelect(updateQuery)
        );
      }
      
      const handlePlaceSelect = async (updateQuery) => {
        const addressObject = autoComplete.getPlace();
        const query = addressObject.formatted_address;
        updateQuery(query);
        const alteredString = query + '='
        setAllArea(prevState => [...prevState, alteredString]);
        setQuery("");
      }
      
    const [value, setValue] = useState([16, 60])
    const handleValue = (values) => {
        setValue(values)
      }
    const [interest, setInterest] = useState({
        music : '',
        travel : "",
        movies : "",
        education : "",
        information : "",
        technology : "",
        vacation : ""
    })
    const [demograph, setDemograph] = useState({
        under_12_years : "",
        high_school : "",
        employ_under_12_years : "",
        under_50000 : "",
        age_13_21 : "",
        bachelor_degree : "",
        employ_13_21_years : "",
        income_50000_200000 : "",
        age_21_40 : "",
        master_degree : "",
        employ_21_40_years : "",
        income_200000_1000000 : "",
        age_41_60 : "",
        post_graduate : "",
        employ_41_60years : "",
        income_1000000_10000000 : "",
        above_60years : "",
        professional : "",
        employ_above_60years : "",
        above_10000000 : ""
    })
    const __handleChange3 = (e) => {
        const targetValue = e.target.value + '='
        if(e.target.checked === true){
            setInterest({...interest, [e.target.name] : targetValue}) 
        }else if(e.target.checked === false){
            setInterest({...interest, [e.target.name] : ''})   
        }   
    }
    const __handleChange4 = (e) => {
        const targetValue = e.target.value + '='
        if(e.target.checked === true){
            setDemograph({...demograph, [e.target.name] : targetValue})
        }else if(e.target.checked === false){
            setDemograph({...demograph, [e.target.name] : ""})
        }
    }
    
    const [value_, setValue_] = useState({
        locate : "",
        region : "",
    });
    const [locations, setLocation] = useState([]);
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
        setQuery(preferedLocation)
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

    const __handleChange = (e) => {
        e.persist();
        const targetLocation = e.target.value;
        setValue_({locate : targetLocation});
        setCreateAds({...createAds, location : e.target.value})
    }
    const scrollToTop3 = ()=>{
        document.getElementById('temp').scrollIntoView(0,0);
      }
    const handleSave = (e) =>{
        e.preventDefault();
        const newArray = Object.values(interest)
        const finalArray = newArray.filter(item => item !== "")
        const demoArray = Object.values(demograph);
        const finalDemo = demoArray.filter(item => item !== "");
        setCreateAds({...createAds, area : allArea, [state.selectedOption] : "1", ageRange: value, interests : finalArray, demographics : finalDemo })
        setShowNext2("none");
        setShowNext3("block")
        scrollToTop3();
        // if(newPhone !== true){
        
        // }else{
        //     swal("enter valid phone number")
        // }
    }


    let anyRef = useRef(null)

    useEffect(() => {
        loadScript(
          `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`,
          () => handleScriptLoad(setQuery, autoCompleteRef)
        );
        axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
            const result = response.data;
            setLocation(result)
        })
        .catch(error => console.log(error))
    }, []);


    const valueChange = (e) => {
        setState({selectedOption : e.target.value});
    }

    return (
        <div style={{display : showNext2}} ref={anyRef } id="wrapper">
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
                                    <div className="form-group start mr-3" style={{zIndex : "100000"}}> 
                                        <label htmlFor="">Start date</label><br></br>
                                        <DatePicker
                                        selected={createAds.start}
                                        onChange={(date) => setCreateAds({...createAds, start : date})}
                                        minDate={subDays(new Date(), 0)}
                                        placeholderText="Select a day"
                                        required
                                        />
                                        {/* <input type="date" required  placeholder="(DD/MM/YY) e.g 10/2/2021" name="start" onChange={handleChange} value={createAds.start}/> */}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group end" style={{zIndex : "100000"}}>
                                    <label htmlFor="">End date</label><br></br>
                                        <DatePicker
                                        selected={createAds.end}
                                        onChange={(date) => setCreateAds({...createAds, end : date})}
                                        minDate={subDays(new Date(), 0)}
                                        placeholderText="Select a day"
                                        required
                                        />
                                    {/* <input type="date" required  placeholder="(DD/MM/YY) e.g 20/3/2022" name="end" onChange={handleChange} value={createAds.end}/> */}
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
                                    <label htmlFor="">Phone</label><br></br>
                                        <IntlTelInput
                                        containerClassName="intl-tel-input"
                                        inputClassName="form-control"
                                        preferredCountries={['ng']}
                                        format
                                        onPhoneNumberChange={(status, value, countryData, number, disabled) => {
                                            console.log(status)
                                            const formatedNumber = value.replace(/\D+/g, '');
                                            if(status === true){
                                                setCreateAds({...createAds, phone : formatedNumber})  
                                                setPhone(false)
                                            }else if(value.length > 13){
                                                swal("wrong number")
                                                setPhone(true)
                                            } 
                                        }}
                                        onPhoneNumberBlur={(status, value, countryData, number) => {
                                            console.log('onPhoneNumberBlur value', value);
                                            console.log('onPhoneNumberBlur number', status);
                                        }}
                                        // value={state}
                                        fieldName='phone'
                                        // onPhoneNumberBlur={onBlur()}
                                        required
                                        />
                                        {/* <input type="text" required placeholder="+234 816 911 4001" name="phone" onChange={handleChange} value={createAds.phone}/> */}
                                    </div>
                                </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-6">
                                    <div className="form-group start">
                                        <label htmlFor="">Facebook Business Page</label><br></br>
                                        <input type="text" required placeholder="Brand hub page" name="fbPage" onChange={handleChange} value={createAds.fbPage}/>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group end">
                                        <label htmlFor="">Instagram Account</label><br></br>
                                        <input type="text" required placeholder="Brand hub page" name="instagram" onChange={handleChange} value={createAds.instagram}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-6">
                                    <div className="form-group start">
                                        <label htmlFor="">Linkedin Business Page</label><br></br>
                                        <input type="text" required placeholder="Brand hub page" name="linkedin" onChange={handleChange} value={createAds.linkedin}/>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4 mb-5">
                                <div className="col-lg-8">
                                    <label htmlFor="" className="mb-3">Age range</label><br></br>
                                    <ReactSlider
                                    value={value}
                                    min={16}
                                    max={100}
                                    minDistance={10}
                                    onChange={handleValue}
                                    className="horizontal-slider"
                                    thumbClassName="example-thumb"
                                    trackClassName="example-track"
                                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                                />
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
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="row dates">
                                <div className="col-lg-7">
                                    <div className="form-group">
                                        <label htmlFor="">Select Target Country</label><br></br>
                                        <input list="data" value={value_.locate} onChange={__handleChange} required />
                                        <datalist id="data">
                                            {locations.map(({name, index}) =>
                                                <option value={name.common} id={index}>{name.common}</option>
                                            )}
                                        </datalist>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="row">
                                <div className="col-lg-7">
                                    <div className="search-location-input">
                                        <label htmlFor="">Select Target Areas</label>
                                        <input
                                            ref={autoCompleteRef}
                                            onChange={handlePop}
                                            placeholder="Enter target location"
                                            value={query}
                                        />
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
                                <h4>Demographics(Optional)</h4>
                                <div className="table-responsive">
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
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="under_12_years" value="under 12 years" onClick={__handleChange4}/>
                                                        <span>Under 12 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="high_school" value="high school" onClick={__handleChange4}/>
                                                        <span>High School</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="employ_under_12_years" value="employ under 12 years" onClick={__handleChange4}/>
                                                        <span>under 12 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="under_50000" value="under 50,000" onClick={__handleChange4}/>
                                                        <span>Under 50,000</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="age_13_21" value="13 - 21 years" onClick={__handleChange4}/>
                                                        <span>13 - 21 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="bachelor_degree" value="bachelor's degree" onClick={__handleChange4}/>
                                                        <span> Bachelor’s degree </span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="employ_13_21_years" value="employ 13 - 21 years" onClick={__handleChange4}/>
                                                        <span>13 -21 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="income_50000_200000" value="50,000 - 200,000" onClick={__handleChange4}/>
                                                        <span>50,000 - 200,000</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="age_21_40" value="21 - 40 years" onClick={__handleChange4}/>
                                                        <span>21 - 40 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="master_degree" value="master's degree" onClick={__handleChange4}/>
                                                        <span>Master's Degree</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="employ_21_40_years" value="employ 21 - 40 years" onClick={__handleChange4}/>
                                                        <span>21 - 40 years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="income_200000_1000000" value="200,000 - 1,000,000" onClick={__handleChange4}/>
                                                        <span>200,000-1,000,000</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="age_41_60" value="41 - 60years" onClick={__handleChange4}/>
                                                        <span>41 - 60years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="post_graduate" value="post graduate" onClick={__handleChange4}/>
                                                        <span>Post graduate</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="employ_41_60years" value="employ 41 - 60years" onClick={__handleChange4}/>
                                                        <span>41 - 60years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="income_1000000_10000000" value="1,000,000 - 10,000,000" onClick={__handleChange4}/>
                                                        <span>1,000,000 - 10,000,000</span>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="above_60years" value="above 60years" onClick={__handleChange4}/>
                                                        <span>Above 60years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="professional" value="Professional/doctorate" onClick={__handleChange4}/>
                                                        <span>Doctorate</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="employ_above_60years" value="employ above 60years" onClick={__handleChange4}/>
                                                        <span>Above 60years</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-group">
                                                        <input type="checkbox" name="above_10000000" value="above 10,000,000" onClick={__handleChange4}/>
                                                        <span>Above 10,000,000</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="interest">
                            <h4>Interest</h4>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="music" value="music" onChange={__handleChange3} />
                                                <span>Music</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="travel" value="travel" id="" onChange={__handleChange3}/>
                                                <span>Travel</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="education" value="education" onClick={__handleChange3} id=""/>
                                                <span>Education</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="technology" value="technology" onClick={() => {setInterest({...interest, technology : "technology"})}} id=""/>
                                                <span>Technology</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="movies" value="movies" onClick={__handleChange3} id=""/>
                                                <span>Movies</span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <div className="form-group">
                                                <input type="checkbox" name="vacation" value="vacation" onClick={__handleChange3} id=""/>
                                                <span>Vacation</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col">
                                        <div className="form-group">
                                                <input type="checkbox" name="information" value="information" onClick={__handleChange3} id=""/>
                                                <span>Information</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lower-btn">
                            <p className="" onClick={handleBack}>Back</p>
                            <button onClick={handleSave}>
                                Save and continue
                            </button>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CreateForm;
