import React from 'react';
import '../moovit/moovit.scss';
import image1 from '../../../assets/Frame 464.svg';

const Moovit = () => {
    return (
        <div className="moovit">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="content">
                        <h5>MOOVIT</h5>
                        <h3>More than your typical digital marketing agency</h3>
                        <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim temp or enim. Elit aute irure tempor cupidatat incididun</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="shape"> */}
                <img src={image1} alt="shape" />
            {/* </div> */}
        </div>
    )
}

export default Moovit
