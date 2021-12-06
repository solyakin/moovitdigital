import React, {useState, useEffect } from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretDown from '../../../assets/CaretDown.svg';
import Tags from '../../../components/Tags/Tags';
import Pricing from '../pricing/pricing';
import CreateForm from '../../../components/createForm/createForm';
import Templates from '../../../components/templates/templates';
import logo from '../../../assets/image 1.png';

const CreateAds = () => {

    const [style, setStyle] = useState({
        hide : false,
        transformArrow : false,
    });
    const history = useHistory();
    const [file, setFile] = useState(null);
    const [hide, setHide] = useState(false);
    const [showNext, setShowNext] = useState("block");
    const [showNext2, setShowNext2] = useState("none");
    const [showNext3, setShowNext3] = useState("none");
    const [loading, setLoading] = useState(false);  
    const [createAds, setCreateAds] = useState({
        title : "",
        description : "",
        gender: "",
        location : "",
        ageRange : "",
        phone : "",
        start : "",
        end : "", 
        graphic_id : 1,
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

    useEffect(() => {
     document.querySelector(".header").style.display = "none"    
    }, [])
    const handleClick = (e) => {
        e.preventDefault();
        setStyle({hide : !style.hide, transformArrow : !style.transformArrow});
    
    }
    
    const handleChange = (e) =>{
        e.persist();
        setCreateAds({...createAds, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
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
                history.push('/payment');
            }
        })
        .catch(err => console.log(err))
    }
    console.log(createAds)
    return (
            <div className="dashboard create-ads">
            <div className="small-title">
                <div className="title-text justify-content-between">
                    <div className="logo">
                        <Link to='/'>
                            <img src={logo} alt="moovit-logo" />
                        </Link>
                    </div>
                    <div className="text d-flex align center">
                        <p>The Brand Hub</p>
                        <img src={caretDown} alt="" />
                    </div>
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <Tags style={style} handleClick={handleClick}/>
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
                            showNext2={showNext2}
                            setShowNext2={setShowNext2}
                            setShowNext3={setShowNext3}
                            setFile={setFile}
                            handleChange={handleChange}
                            />
                            <Templates showNext3={showNext3}
                            handleSubmit={handleSubmit}
                            createAds={createAds}
                            setCreateAds={setCreateAds}
                            loading ={loading}
                            />
                        </form> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAds
