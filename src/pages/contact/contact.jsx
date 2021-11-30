import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ContactForm from '../../components/contact-form/contact-form';
import ContactHero from '../../components/contactHero/contact-hero';

const Contact = () => {
    return (
        <div className="contact">
            <ContactHero />
            <ContactForm />
        </div>
    )
}

export default Contact;
