import React from 'react';
import { Link } from 'react-router-dom';
import '../email-verification/email-verification.scss';

const EmailVerification = () => {

    const userEmail = localStorage.getItem("user-email");
    console.log(userEmail)
    return (
        <div className="email-verification">
            <h5>MoovIT</h5>
            <h3>Email Verification</h3>
            <p>We have sent a verification link to <span>{userEmail}</span> .</p>
            <p>I didn’t get a mail yet. <Link> Resend link</Link> </p>

            <Link>Use a different email</Link>
        </div>
    )
}

export default EmailVerification
