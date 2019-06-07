import React from 'react';

function About() {
  return (
    <div className="Footer">
      <div className="container"> 
        <div className="card">
          <div className="card-header">
            Important Rules! 
          </div>
          <div className="card-body">
          <h5 className="card-title"> </h5>
          <p className="card-text"> <span className="required">*</span> The Name , Email and Phone fields are required </p>
          <p className="card-text"> <span className="required">*</span> The Name character(s) must be between must be between 3 and 30.</p>
          <p className="card-text"> <span className="required">*</span> You must enter a valid Email Adress (example@example.com)</p>
          <p className="card-text"> <span className="required">*</span> You must enter a valid US Phone Number (###-###-#####) </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
