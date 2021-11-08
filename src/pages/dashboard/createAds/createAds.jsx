import React, {useState} from 'react';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretDown from '../../../assets/CaretDown.svg';
import caretRight from '../../../assets/CaretRight.svg';
import caretDown2 from '../../../assets/CaretDown2.svg';
import squares from '../../../assets/SquaresFour.svg';
import megaphone from '../../../assets/MegaphoneSimple.svg';
import bag from '../../../assets/BagSimple.svg';
import creditCard from '../../../assets/CreditCard.svg';
import user from '../../../assets/User.svg';
import Handshake from '../../../assets/Handshake.svg';
import signout from '../../../assets/SignOut.svg';
import ellipse1 from '../../../assets/Ellipse 27.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';
import DragDrop from '../../../components/dragDrop/dragDrop';

const CreateAds = () => {

    const [createAds, setCreateAds] = useState({
        title : "",
        description : "",
        gender: "",
        location : "",
        ageRange : "",
        phone : "",
        start : "",
        end : "", 
        graphic_id : "",
        budget_id : "",
        area : "",
        awareness : 0,
        traffic : 0,
        engagement : 0,
        conversions : 0,
        apps : 0,
        reach : 0,
        sales: 0,
        demographics : "all user",
        interests : "all interest"
    })

    const [file, setFile] = useState(null);
   
    const handleChange = (e) =>{
        e.persist();
        setCreateAds({...createAds, [e.target.name]: e.target.value})
    }
    // const handleCheck = (e) => {
    //     e.persist();
    //     let isChecked = e.target.checked;
    //     if(isChecked === true){
    //         setCreateAds({...createAds, [e.target.name] : e.target.name});
    //     }
    // }
    console.log(createAds)

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            title : createAds.title,
            content : createAds.description,
            awareness : createAds.awareness,
            traffic : createAds.traffic,
            engagement : createAds.engagement,
            conversions : createAds.conversions,
            apps : createAds.apps,
            reach : createAds.reach,
            sales : createAds.sales,
            gender : createAds.gender,
            location : createAds.location,
            ageRange : createAds.ageRange,
            graphic_id : createAds.graphic_id,
            budget_id : createAds.budget_id,
            phone : createAds.phone,
            start : createAds.start,
            end : createAds.end,
            area : createAds.area,
            demographics : createAds.demographics,
            interests : createAds.interests
        }

        const newForm = new FormData();
        newForm.append("title", data.title);
        newForm.append("content", data.content);
        newForm.append("image", file);
        newForm.append("awareness", data.awareness);
        newForm.append("traffic", data.traffic);
        newForm.append("engagement", data.engagement);
        newForm.append("conversions", data.conversions);
        newForm.append("app_installs", data.apps);
        newForm.append("reach", data.reach);
        newForm.append("sales", data.sales);
        newForm.append("gender", data.gender);
        newForm.append("location", data.location);
        newForm.append("ageRange", data.ageRange);
        newForm.append("graphic_id", data.graphic_id);
        newForm.append("budget_id", data.budget_id);
        newForm.append("phone", data.phone);
        newForm.append("start", data.start);
        newForm.append("end", data.end);
        newForm.append("area", data.area);
        newForm.append("demographics", data.demographics);
        newForm.append("interests", data.interests);

        const token = localStorage.getItem("auth_token");
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.post('/api/user/create-advert', newForm)
        .then(res => {
            if(res.status == 200){
                const result = res.data;
                for (const [key, value] of Object.entries(result)) {
                    console.log(value);
                  }
                // history.push('/user-registration');
            }
        })
        .catch(err => console.log(err))
    }
    return (
            <div className="dashboard create-ads">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <div className="tab-item">
                            <img src={squares} alt="" />
                            <Link to='/dashboard'>Dashboard</Link>
                        </div>
                        <div className="tab-ads">
                            <div className="tab-item">
                                <img src={megaphone} alt="" />
                                <p>Ads Management</p>
                                <img src={caretDown2} alt="" />
                            </div>
                            <div className="sub-track">
                                <Link to='/create-ads'>Create an Ad</Link>
                                <Link to='/ads-history'>Ad History</Link>
                            </div>
                        </div>
                        <div className="tab-item">
                            <img src={bag} alt="" />
                            <p>Packages</p>
                        </div>
                        <div className="tab-item">
                            <img src={creditCard} alt="" />
                            <Link to='/payment-history'>Payment History</Link>
                        </div>
                        <div className="tab-item">
                            <img src={user} alt="" />
                            <Link to='/profile'>Profile</Link>
                        </div>
                        <div className="tab-item">
                            <img src={Handshake} alt="" />
                            <Link to='/support'>Support</Link>
                        </div>
                        <div className="tab-item">
                            <img src={signout} alt="" />
                            <p>Logout</p>
                        </div>
                    </div>
                    <div className="dashboard-main">
                        <div className="pages-link">
                            <Link>Home</Link>
                            <img src={caretRight} alt="caret right"/>
                            <Link>Create an Ad</Link>
                        </div>
                        <div className="page-progress">
                            <div className="item first">
                                <img src={ellipse1} alt="ellipse1" />
                                <p>Ads details</p>
                            </div>
                            <div className="item">
                                <img src={ellipse2} alt="ellipse1" />
                                <p>Select a budget</p>
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
                                <form onSubmit={handleSubmit}>
                                    <h5>Ads details</h5>
                                    <div className="form-wrapper">
                                        <div className="form-group">
                                            <label htmlFor="">Title</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="title" onChange={handleChange} value={createAds.title}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">budget_id</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="budget_id" onChange={handleChange} value={createAds.budget_id}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">graphic id</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="graphic_id" onChange={handleChange} value={createAds.graphic_id}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Location</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="location" onChange={handleChange} value={createAds.location}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Gender</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="gender" onChange={handleChange} value={createAds.gender}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">age range</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="ageRange" onChange={handleChange} value={createAds.ageRange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">phone</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="phone" onChange={handleChange} value={createAds.phone}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Area</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="area" onChange={handleChange} value={createAds.area}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Start</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="start" onChange={handleChange} value={createAds.start}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">End</label><br></br>
                                            <input type="text"  placeholder="The Brand Hub" name="end" onChange={handleChange} value={createAds.end}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Description</label><br></br>
                                            <textarea name="" id="" cols="10" rows="4" placeholder="Type text here" name="description" value={createAds.description} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="">Upload banner</label><br></br>
                                            <DragDrop />
                                            <input type="file" name="image" 
                                                    onChange={(e) => setFile( e.target.files[0])}
                                                    onClick={(event)=> { 
                                                        event.target.value = null
                                                }}
                                            />
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-6">
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
                                                <div className="lower-btn">
                                                    <p>Back</p>
                                                    <button type="submit">
                                                        Save and continue
                                                    </button>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </form>
                            </div>
                        </div>
                
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAds
