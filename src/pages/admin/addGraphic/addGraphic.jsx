import React, {useState} from 'react';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import axios from 'axios';
import caretDown from '../../../assets/CaretDown.svg';
import AdminTags from '../../../components/adminTags/adminTags';
import Alert from '../../../components/alert/alert';

const AddGraphic = () => {

    const token = localStorage.getItem("auth_token")
    const [alert, setAlert] = useState("none");
    const [file_, setFile_ ] = useState(null);
    const [graphic, setGraphic ] = useState({
        name: "",
        image : ""
    })

    const handleChange = (e) => {
        e.persist();
        setGraphic({...graphic, [e.target.name] : e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        newForm.append("name", graphic.name);
        newForm.append("image", graphic.image);
        // newForm.append("image", file_);
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.post('/api/admin/create-graphic', newForm)
        .then(res => {
            if(res.status == 200){
                const result = res.data;
                console.log(result);
                // history.push('/request-call');
            }
        })
        .catch(err => console.log(err))
    }
    console.log(graphic, file_);
    return (
        <div className="dashboard">
            <div className="small-title">
                <div className="title-text">
                    <p>The Brand Hub</p>
                    <img src={caretDown} alt="" />
                </div>
                <div className="dashboard-main-wrapper">
                    <div className="tabs">
                        <AdminTags />
                    </div>
                    <div className="dashboard-main admin">
                    <div className="ads-wrapper mt-3">
                            <div className="ads-heading">
                                <h4>Add a new Budget</h4>
                            </div> 
                            <div className="support">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="">Enter Graphic name</label>
                                                <input type="text" name="name" onChange={handleChange} value={graphic.name}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Enter Image Url</label>
                                                <input type="text" name="image" onChange={handleChange} value={graphic.image}/>
                                            </div>
                                            {/* <div className="form-group">
                                                <label htmlFor="">Upload Template</label>
                                                <input type="file" name="image" 
                                                        onChange={(e) => setFile_( e.target.files[0])}
                                                        onClick={(event)=> { 
                                                            event.target.value = null
                                                    }}
                                                />
                                            </div> */}
                                            <button type="submit">Create Budget</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
                {/* <Alert alert={alert}/> */}
            </div>
        </div>
    )
}

export default AddGraphic;
