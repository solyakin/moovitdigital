import React from 'react';
import '../publisher-form/publisher.form.scss';

const PublisherForm = () => {
    return (
        <div className="publisher-form">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="heading">
                            <h4>Publisher request form</h4>
                        </div>
                        <form action="">
                            <h5>1. Personal Details</h5>
                            <div className="row justify-content-between">
                                <div className="col-6">
                                    <label htmlFor="">First Name</label>
                                    <input type="text" placeholder="Joe" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" placeholder="Bullion" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">State</label>
                                    <input type="text" placeholder="Lagos" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Country</label>
                                    <input type="text" placeholder="Nigeria" />
                                </div>
                            </div>
                            <h5 className="mt-4">2. Company Details</h5>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Name of company/organisation</label>
                                    <input type="text" placeholder="The Brand Hub" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Email</label>
                                    <input type="email" placeholder="jonbellion@gmail.com" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Domain name</label>
                                    <input type="text" placeholder="www.name.com" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">Industry</label>
                                    <input type="text" placeholder="Entertainment" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <label htmlFor="">Phone Number</label>
                                    <input type="text" placeholder="0912 342 3452" />
                                </div>
                                <div className="col-6">
                                    <label htmlFor="">API</label>
                                    <input type="text" placeholder="api.website.com" />
                                </div>
                            </div>

                            <div className="duration mt-4">
                                <h5>How long have your used this domain?</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>Less than month</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>1-3 Months</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>4-12 months</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>1-2 years</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>3-5 years</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>Over 5 years</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div className="duration mt-4">
                                <h5>What is the average visit your domain recieves monthly?</h5>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>Less than 100</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>100-500</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>500-2000</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="duration-frame">
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>2000-4000</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>4000-7000</span>
                                            </div>
                                            <div className="form-group">
                                                <input type="radio" />
                                                <span>7000 and above</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                            <div className="agree-policy">
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="checkbox" />
                                        <p>By continuing, you’re agreeing to our Customer Terms of 
                                        Service, Privacy Policy, and Cookie Policy.</p>
                                    </div>
                                </div>
                            </div>
                            <button>Send Request</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PublisherForm;
