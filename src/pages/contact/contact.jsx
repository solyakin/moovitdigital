import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ContactForm from '../../components/contact-form/contact-form';
import ContactHero from '../../components/contactHero/contact-hero';

const Contact = () => {

    const [linkedin, setLinkedin] = useState([]);
    
    useEffect(() => {
        const token = 'AQUPpvEHfqb9Scg6TpPRgfEoqmeeuqLqCr5hUvxNYWV8ra9KpPJQrSvjHf0cUY7VPAdT3LOzIB2_bJDwB6t56p7EQVb2kkL73c4WmGTAEH7lcBTknnOm9qCa_IwpNaHFwF38KbVgq-M6dK5os7EMxm6rKv9bfjlZyLO-J2L3fvQ0dFFtbN2HQpOc6zYpx2FZQA1AyAj7NmwlG1o3_c7OwaM0WPKJj4g4pk9vgwJuYdwMuSkLb-FZ1DQPx2JZ2u-mHWAuBaHVmmYSJzwJwsaPE31Xn2KLWwr1_9oSCZeKaU1XNf69rr4xm8O1w9iTl8tfnYCLOgXp2yvSKP0ug9SpDQCm1AwhLw';
        const url = "https://api.linkedin.com/v2/adCreativesV2?q=search&search.campaign.values[0]=urn:li:sponsoredCampaign:193773413&search.status.values[0]=ACTIVE&search.status.values[1]=CANCELED&sort.field=ID"
        
        // axios.defaults.headers.post['Content-Type'] = 'application/json';
        // axios.defaults.headers.post['Accept'] = 'application/json';
        // axios.defaults.headers.common['Authorization'] = token;
        // const authAxios = axios.create({
            // baseURL : url,
        //     headers : {
        //         Authorization : `Bearer ${token}`,
        //        'Content-Type' : 'application/json',
        //        "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
        //     },
        // })
        axios.get(url)
        .then(res => {
            console.log(res.data);
        })
    },[])
    return (
        <div className="contact">
            <ContactHero />
            <ContactForm />
        </div>
    )
}

export default Contact;
