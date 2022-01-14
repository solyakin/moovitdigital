import React, {useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import Tags from '../../../components/Tags/Tags';
import Pricing from '../pricing/pricing';
import CreateForm from '../../../components/createForm/createForm';
import Templates from '../../../components/templates/templates';
import logo from '../../../assets/image 1.png';
import MobileTags from '../../../components/MobileTags/mobileTags';
import hamburger from '../../../assets/hamburger.png';

const CreateAds = () => {

    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const [show, setShow] = useState(true);
    const [ham, setHam] = useState(false);
    const [start, setStart] = useState(null);
    const history = useHistory();
    const [file, setFile] = useState(null);
    // const [hide, setHide] = useState(false);
    const [showNext, setShowNext] = useState("block");
    const [showNext2, setShowNext2] = useState("none");
    const [showNext3, setShowNext3] = useState("none");
    const [loading, setLoading] = useState(false);  
    const [disabled, setDisabled] = useState(false);
    const [state, setState] = useState({
        selectedOption : "awareness"
    })
    const [createAds, setCreateAds] = useState({
        title : "",
        description : "",
        gender: "",
        location : "",
        ageRange : "",
        phone : "",
        start : "",
        end : "", 
        dimensions : [],
        graphic_id : 1,
        budget_id : "",
        area : "",
        awareness : 0,
        traffic : 0,
        fbPage : '',
        instagram : '',
        linkedin : '',
        engagement : 0,
        conversions : 0,
        apps : 0,
        reach : 0,
        sales: 0,
        demographics : [],
        interests : []
    })

    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    }
    
    const handleChange = (e) =>{
        setCreateAds({...createAds, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true)
        setShow(false)
        if(createAds.budget_id !== "" && createAds.graphic_id !== "" && createAds.fbPage !== "" && createAds.phone !== "" && createAds.title !== "" && file !== null && createAds.start !== "" && createAds.end !=="" && createAds.location !== ""){
            setLoading(true);
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
                dimensions : createAds.dimensions,
                fb_page : createAds.fbPage,
                instagram : createAds.instagram,
                linkedin : createAds.linkedin,
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
            newForm.append("target", data.traffic);
            newForm.append("engagement", data.engagement);
            newForm.append("conversions", data.conversions);
            newForm.append("app_installs", data.apps);
            newForm.append("reach", data.reach);
            newForm.append("sales", data.sales);
            newForm.append("gender", data.gender);
            newForm.append("location", data.location);
            newForm.append("dimensions", data.dimensions);
            newForm.append("ageRange", data.ageRange);
            newForm.append("graphic_id", data.graphic_id);
            newForm.append("budget_id", data.budget_id);
            newForm.append("phone", data.phone);
            newForm.append("fb_page", data.fb_page);
            newForm.append("linkedin", data.linkedin);
            newForm.append("instagram", data.instagram);
            newForm.append("start", data.start);
            newForm.append("end", data.end);
            newForm.append("area", data.area);
            newForm.append("demographics", data.demographics);
            newForm.append("interests", data.interests);

            const token = localStorage.getItem("auth_token");
            const authAxios = axios.create({
                baseURL : "https://test.canyousing.com.ng",
                headers : {
                    Authorization : `Bearer ${token}`,
                'Content-Type' : 'multipart/form-data',
                }
            })
            authAxios.post('/api/user/create-advert', newForm)
            .then(res => {
                if(res.status == 200){
                    const result = res.data;
                    history.push('/payment');
                }
            })
            .catch(err => console.log(err))
        }else{
            swal("Oops!", "Please enter all fields!", "warning");
            setLoading(false);
            setDisabled(false);
        }
    }
    const toggler = (e) => {
        e.preventDefault();
        setHam(!ham);
    } 
    const scrollToTop2 = ()=>{
        document.getElementById('wrapper').scrollIntoView();
      }
    console.log(createAds);
    return (
            <div className="dashboard create-ads">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <img src={hamburger} alt="hamburger" width="25px" className="hamburger" onClick={toggler}/>
                        <Link to='/home'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
                        {/* <p>The Brand Hub</p>
                        <img src={caretDown} alt="" /> */}
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <Tags style={style} handleClick={handleClick}/>
                    </div>
                    <div className="mobile-tag">
                        <MobileTags style={style} handleClick={handleClick} ham={ham}/>
                    </div>
                    <div className="dashboard-main">
                        <form onSubmit={handleSubmit}>
                            <Pricing 
                            createAds={createAds} 
                            setCreateAds={setCreateAds} 
                            showNext={showNext} 
                            setShowNext={setShowNext}
                            setShowNext2={setShowNext2}
                            />
                            <CreateForm createAds={createAds} 
                            setCreateAds={setCreateAds} 
                            start={start}
                            setStart={setStart}
                            showNext2={showNext2}
                            setShowNext={setShowNext}
                            setShowNext2={setShowNext2}
                            setShowNext3={setShowNext3}
                            setFile={setFile}
                            handleChange={handleChange}
                            state={state}
                            // scrollToTop2={scrollToTop2}
                            setState={setState}
                            />
                            <Templates showNext3={showNext3}
                            handleSubmit={handleSubmit}
                            createAds={createAds}
                            setCreateAds={setCreateAds}
                            setShowNext2={setShowNext2}
                            setShowNext3={setShowNext3} 
                            loading ={loading}
                            Disabled={disabled}
                            setDisabled={setDisabled}
                            show={show}
                            />
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAds
