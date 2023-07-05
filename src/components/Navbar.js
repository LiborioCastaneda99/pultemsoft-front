import React from 'react';
import Logo from '../pultemsoft.png';

const Navbar = ({button,name}) => {
  return <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <a className="navbar-brand" href="#">
      <img
        src={Logo}
        height="36"
        alt="Pultemsoft"
        loading="lazy"
      />
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        </li>
      </ul>
      <div className="d-flex">
        <p className="btn px-3 me-2 btn-user" >
          {name}
        </p>
        <p>
        {button}
        </p>
      </div>
    </div>
  </div>
</nav>
  </div>;
};

export default Navbar;
