import React,{useState,useEffect} from 'react';
import firebaseapp from '../config/firebase-config';
import { useHistory,Link } from 'react-router-dom';
import axios from 'axios';
import {getAuth,signInWithEmailAndPassword,onAuthStateChanged} from 'firebase/auth';
import Error from './Error';
import Logo from '../pultemsoft.png';
import Mundial from '../mundial.jpeg';


const Registro = () => {
  const auth = getAuth(firebaseapp);
  let history = useHistory();
  const [error, seterror] = useState(false);
  const [mensajeError, setmensajeError] = useState('');

  let latitud;
  let longitud;
  navigator.geolocation.getCurrentPosition(function (position) {
    latitud=position.coords.latitude;
    longitud=position.coords.longitude
  })
  useEffect(() => {

    onAuthStateChanged(auth,(usuarioFirebase)=>{
      if(usuarioFirebase){
        history.push('/')
      }
    })
  }, [auth, history]);

  
  

  const OnSubmitHandler =(e)=>{
    e.preventDefault();
    const  name = e.target.elements.name.value;
    const documen = e.target.elements.document.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const eps = e.target.elements.eps.value;
    const phone = e.target.elements.phone.value;
    if(name.trim()==='' || documen.trim()==='' || eps.trim()===''|| email.trim()==='' || password.trim()==='' || phone.trim()===''){
      seterror(true);
      setmensajeError("Todos los campos son obligatorios")
      return;
     }else{
       seterror(false);
       setmensajeError('');
       if(latitud!=null && longitud !=null){
         try {
           regitarUsuario(name,documen,eps,email, password,phone,latitud,longitud);
         } catch (error) {
           console.log(error);
         }
       }else{
         seterror(true);
         setmensajeError("No hemos detectado tu ubicacion");
       }
     }
  }

  const regitarUsuario= async (name,documen,eps,email,password,phone,latitud,longitud) => {
      const data={name:name,document:documen,eps:eps,email:email,password:password,lat:latitud,lng:longitud,phone:phone}
      const url='https://us-central1-pultemsoft.cloudfunctions.net/app/createUser';
      try {
        const response=await axios.post(url,data);
      if(response.status ===200){
        Login(email,password);
        history.push('/')
      }
      console.log(response)
      } catch (error) {
        
        seterror(true)
        setmensajeError("Documento ya registrado.")
      }
      
  }

  const Login=async(email, password)=>{

    try {
      const user=await signInWithEmailAndPassword(auth,email,password).then(userInfo => {
        return userInfo;
      })
    } catch (error) {
      seterror(true)
      setmensajeError(error.message)
    }
    
  }

  return  <div >
  <section >
<div className="container-fluid py-5 h-100">
  <div className="row d-flex justify-content-center align-items-center h-100">
    <div className="col col-xl-10">
      <div className="card border_radius_1" >
        <div className="row g-0">
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
                  <label className="form-label" htmlFor="form2Example17">Nombre</label>
                  <input type="text" id="name" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example17">Cedula</label>
                  <input type="text" id="document" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example17">Eps</label>
                  <input type="text" id="eps" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example17">Telefono</label>
                  <input type="tel" id="phone" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="form2Example17">Correo</label>
                  <input type="email" id="email" className="form-control form-control-lg" />
                </div>
                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="password" required>Contraseña</label>
                  <input type="password" id="password" className="form-control form-control-lg" />
                </div>
                <div className="pt-1 mb-4 d-grid mx-5">
                  <button className="btn btn-green btn-lg btn-block" type="submit">Registrame</button>
                </div>
                <p className="mb-5 pb-lg-2 dn-account text-center" >Ya tienes cuenta? <Link to="/">Iniciar sesion</Link></p>
              </form>
            </div>
          </div>

          <div className="col-md-6 col-lg-5 d-none d-md-block mt-5">
            <img
              src={Mundial}
              alt="login form"
              className="img-fluid logo_radius "  
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
</div>;
};

export default Registro;
