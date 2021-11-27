import React from 'react';
import '../contact-form/contact-form.scss';

const ContactForm = () => {
    return (
        <div className="contact-form">
            <div className="container">
                <div className="row_">
                    <div className="form_wrapper">
                        <h3>Leave a message</h3>
                        <p>We’ll love to have your feedback</p>
                        <form action="" className="mt-4">
                            <div className="form-group mb-3">
                                <label htmlFor="">Name</label>
                                <input type="text" placeholder="John Doe"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Email</label>
                                <input type="text"  placeholder="johndoe@email.com"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="">Message</label>
                                <textarea></textarea>
                            </div>
                            <button className="mb-5">Submit</button>
                        </form>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ContactForm
