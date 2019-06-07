import React from 'react';
import { Link } from 'react-router-dom';
function Nav() {

  const style = { marginBottom: '10px'};
  
  return (
    <div className="Nav">
        <nav className="navbar navbar-light bg-light" style={ style }>
          <Link to="/" className="navbar-brand" > 
            <img src="https://getbootstrap.com/docs/4.3/assets/brand/bootstrap-solid.svg" 
                width="30" height="30" 
                className="d-inline-block align-top" alt="" />
          </Link>
          <ul className="nav">
            <li className="nav-item">
             <Link to="/About" className="nav-link active" ></Link>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default Nav;
