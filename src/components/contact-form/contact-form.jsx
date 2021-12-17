import React, {useState} from 'react';
import '../contact-form/contact-form.scss';
import axios from 'axios';
import swal from 'sweetalert';

const ContactForm = () => {
    const [support, setSupport] = useState({
        name : '',
        email : '',
        description : '',
        subject : ''
    })

    const handleChange = (e) => {
        e.persist();
        setSupport({...support, [e.target.name] : e.target.value});
    }
    const formSubmit = (e) => {
        e.preventDefault();
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
                swal("Great!", "Message sent successfully added!", "success");
            }
        })
        .catch(err => console.log(err))
    }
    return (
        <div className="contact-form">
            <div className="container">
                <div className="row_">
                    <div className="form_wrapper">
                        <h3>Leave a message</h3>
                        <p>We’ll love to have your feedback</p>
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
                                <label htmlFor="">Subject</label>
                                <input type="text" name="subject" value={support.subject} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Message</label>
                                <textarea name="description" id="" cols="10" rows="3" placeholder="enter message here" value={support.description} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="mb-5">Submit</button>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ContactForm;
