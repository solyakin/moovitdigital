import React from 'react';
import '../affilations/affilations.scss';
import punch from '../../assets/punch-logo.png';

const Affilations = () => {
    return (
        <div className="affilations">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h4>Our Affiliations</h4>
                        <div className="aff-images">
                            <img src={punch} alt="punch logo" />
                            <img src={punch} alt="punch logo" />
                            <img src={punch} alt="punch logo" />
                            <img src={punch} alt="punch logo" />
                            <img src={punch} alt="punch logo" />
                        </div>
                        {/* <Link to="#">See All</Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Affilations
