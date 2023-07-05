import React, { useState,useEffect } from 'react';

import {Link} from 'react-router-dom';
import Logo from '../pultemsoft.png';
import Salud from '../salud.jpeg';
import firebaseapp from '../config/firebase-config';
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import Error from './Error';
const auth = getAuth(firebaseapp);

const Login = () => {
  const [error, seterror] = useState(false);
  const [mensajeError, setmensajeError] = useState('');
  const OnSubmitHandler=(e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    Login(email, password);
  }
  const Login=async(email, password)=>{

    try {
      await signInWithEmailAndPassword(auth,email,password).then(userInfo => {
        return userInfo;
      })
    } catch (error) {
      seterror(true)
      setmensajeError(error.message)
    }
    
  }
  return (
    
  <div >
    <section >
  <div className="container-fluid py-5 h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col col-xl-10">
        <div className="card border_radius_1" >
          <div className="row g-0">
            <div className="col-md-6 col-lg-5 d-none d-md-block">
              <img
                src={Salud}
                alt="login form"
                className="img-fluid logo_radius" 
              />
            </div>
            <div className="col-md-6 col-lg-7 d-flex align-items-center">
              <div className="card-body p-4 p-lg-5 text-black">
                <form onSubmit={OnSubmitHandler}>
                  <div className="d-flex align-items-center mb-3 pb-1">
                    <i className="fas fa-cubes fa-2x me-3 fa-color" ></i>
                    <span className="h1 fw-bold mb-0 text-center">
                      <img src={Logo} alt="pultemsoft" className="img-fluid w-50"/>
                    </span>
                  </div>
                  {error ? (
              <Error mensaje={mensajeError}/>
            ): null}
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example17">Correo</label>
                    <input type="text" id="email" className="form-control form-control-lg" />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form2Example27">Contraseña</label>
                    <input type="password" id="password" className="form-control form-control-lg" />
                  </div>
                  <div className="pt-1 mb-4 d-grid mx-5">
                    <button className="btn btn-green btn-lg btn-block" type="submit">Iniciar sesion</button>
                        
                  </div>

                  <p className="mb-5 pb-lg-2 dn-account text-center" >No tienes cuenta? <Link to="/register">Registrate</Link></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  </div>);
};

export default Login;
