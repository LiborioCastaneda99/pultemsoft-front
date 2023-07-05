/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import firebaseapp from '../config/firebase-config';
import {getAuth,signOut} from 'firebase/auth';
import Navbar from './Navbar';
import Salud from '../salud.jpeg';
import Map from './Maps';
import Update from './Update';

const auth = getAuth(firebaseapp);

const Data = ({data}) => {
  
 const {id,name,email,document,lat,lng,illnesses,status,eps,temp,spo2,hr,phone,created_At}=data;
  var timeDate=created_At;
  var date = new Date(timeDate);
  let enfermedades=[]
  if(illnesses !=null){
    illnesses.map((val)=>enfermedades.push(val))
  }
  const fecha_completa="Date: "+date.getDate()+
          "/"+(date.getMonth()+1)+
          "/"+date.getFullYear()+
          " "+date.getHours()+
          ":"+date.getMinutes()+
          ":"+date.getSeconds();
  return (
  <div >
  <Navbar button={
  <button onClick={()=>signOut(auth)}
    className="btn-green btn"
   >Cerrar sesion</button>}
    name={data.name}
   />

<div className="container mt-3">
<div className="card">
  <h5 className="card-header">{name}</h5>
  <div className="card-body">
    <h5 className="card-title text-center"> Mi informacion: </h5>
  <div className="row">

  <div className="col-md-4">
  <img src={Salud} alt="Generic placeholder image" className="img-fluid w-sm-50" />
  </div>
   
      <div className="col-md-4">
      <h5>Documento</h5>
      <p>{document}</p>
      <h5>Correo</h5>
      <p>{email}</p>
      <h5>Eps</h5>
      <p>{eps}</p>
        <h5>Sintomas</h5>
      {         
        enfermedades.map((il) =>
        <li key={il}>{il}</li>
        )
        }
      <h5>Estado:</h5>
      {status==="available" ? "Disponible" : "No disponible"}
       
      </div>
      <div className="col-md-4">
      <h5>Temperatura</h5>
      {temp}
      <h5>Saturacion</h5>
      {spo2}
      <h5>BPM </h5>
      {hr} 
      <h5>Telefono</h5>
      {phone}
      <h5>Latitud</h5>
        <p>
        {lat}
        </p>
      <h5>Longitud</h5>
        {lng}
      </div>
    </div>
      <h5 className='text-center'>Fecha de registro</h5>
      <h6 className='text-center'>{fecha_completa}</h6>
  </div>
</div>

<div className="row my-3">
  <div className="col-md-6 col-sm-12">
  <Map
    latitud={lat}
    longitud={lng}
   />
  </div>
  <div className="col-md-6">
    <Update
      id={id}
      lat={lat}
      lng={lng}
    />
  </div>
</div>
</div>




   
  </div>

  );
};

export default Data;
