import React from "react";

function Footer() {
  const btnStyle = { width: "200px" };
  const footerStyle = { marginBottom: "50px" };
  return (
    <div className="Footer" style={footerStyle}>
      <div className="container">
        <div className="card">
          <div className="card-header">Technologies</div>
          <div className="card-body">
            <h5 className="card-title"> Technologies used in this project: </h5>
            <p className="card-text"> React Framework </p>
            <p className="card-text">
              {" "}
              Front End: HTML 5, CSS 3, JavaScript, Bootstrap{" "}
            </p>
            <p className="card-text">
              {" "}
              Back End: Node.js, ExpressJS and MySql{" "}
            </p>
            <a
              href="https://github.com/innodjet/my-lab-2"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={btnStyle}
            >
              {" "}
              Github Reposotory{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
