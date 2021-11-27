import React, {useState} from 'react';
import '../../dashboard/dashboard.scss';
import '../../admin/admin.scss';
import axios from 'axios';
import caretDown from '../../../assets/CaretDown.svg';
import AdminTags from '../../../components/adminTags/adminTags';
import Alert from '../../../components/alert/alert';

const AddBudget = () => {

    const token = localStorage.getItem("auth_token")
    const [alert, setAlert] = useState("none");
    const [budget, setBudget ] = useState({
        name : "",
        description : "",
        budget : ""
    })

    const handleChange = (e) => {
        e.persist();
        setBudget({...budget,  [e.target.name]: e.target.value})
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newForm = new FormData();
        newForm.append("name", budget.name);
        newForm.append("description", budget.description);
        newForm.append("budget", budget.budget);
        const authAxios = axios.create({
            baseURL : "https://api.moovitdigital.com",
            headers : {
                Authorization : `Bearer ${token}`,
               'Content-Type' : 'multipart/form-data',
            }

        })
        authAxios.post('/api/admin/create-budget', newForm)
        .then(res => {
            if(res.status == 200){
                const result = res.data;
                console.log(result);
                // history.push('/request-call');
            }
        })
        .catch(err => console.log(err))
    }
    console.log(budget);
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
                                                <label htmlFor="">Enter budget name</label>
                                                <input type="text" placeholder="Tier 3" name="name" onChange={handleChange} value={budget.name}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Description</label>
                                                <input type="text" name="description" onChange={handleChange} value={budget.description}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="">Budget</label>
                                                <input type="budget" name="budget" onChange={handleChange} value={budget.budget}/>
                                            </div>
                                            <button type="submit">Send invite</button>
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

export default AddBudget;
