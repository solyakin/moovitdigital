import React, {useState} from 'react';
import '../contact-form/contact-form.scss';
import '../RequestForm/requestForm.scss';
import Loader from "react-loader-spinner";
import axios from 'axios';
import swal from 'sweetalert';

const RequestForm = () => {
    const [support, setSupport] = useState({
        name : '',
        email : '',
        description : '',
        subject : '',
        loading : false
    })

    const handleChange = (e) => {
        e.persist();
        setSupport({...support, [e.target.name] : e.target.value});
    }
    const formSubmit = (e) => {
        e.preventDefault();
        setSupport({...support, loading : true})
        const data = {
            name : support.name,
            email : support.email,
            description : support.description,
            subject : support.subject
        }

        const newData = new FormData();
        newData.append('name', data.name);
        newData.append('email', data.email);
        newData.append('subject', data.subject);
        newData.append('message', data.description);

        axios({
            url : 'https://test.canyousing.com.ng/api/contact',
            method : 'POST',
            data : newData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(res => {
            if(res.status == 200){
                console.log(res.data)
                setSupport({name : "", email : "", subject : "", description : "", loading : false})
                swal("Great!", "Message sent successfully added!", "success");
            }
        })
        .catch(err => console.log(err))
    }
    let btnText = ""
    if(support.loading === true){
        btnText = <div className="spier" style={{display : support.loading ? "block" : "none"}}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
        </div>
    }else if(support.loading === false){
        btnText = <span>Submit</span>
    }
    return (
        <div className='request-form'>
            <div className="contact-form">
                <div className="container">
                    <div className="row_">
                        <div className="form_wrapper">
                            <form onSubmit={formSubmit} className="mt-4">
                                <div className="form-group mb-3">
                                    <label htmlFor="">Name</label>
                                    <input type="text" name="name" value={support.name} onChange={handleChange} />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="">Email</label>
                                    <input type="email"  name="email" value={support.email} onChange={handleChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="text" name="subject" value={support.subject} onChange={handleChange} />
                                </div>
                                <div className="form-group mt-3">
                                    <label htmlFor="">Message</label>
                                    <textarea name="description" id="" cols="10" rows="3" placeholder="enter message here" value={support.description} onChange={handleChange}></textarea>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col-lg-5 col-sm-10">
                                        <button type="submit" className="mb-5 mt-4" style={{backgroundColor : support.loading ? "#333333" : "#EE315D"}}>
                                            {btnText}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default RequestForm
