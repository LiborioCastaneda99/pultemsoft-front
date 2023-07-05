import React, { useState,useEffect } from 'react';
import Login from './Login';
import Data from './Data';
import axios from 'axios';

import firebaseapp from '../config/firebase-config';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
const auth = getAuth(firebaseapp);


const Home = () => {

  const [user, setuser] = useState(null);
  const [data, setdata] = useState({});


  useEffect(() => {
    onAuthStateChanged(auth,(usuarioFirebase)=>{
      if(usuarioFirebase){
        setuser(usuarioFirebase)
        const id=usuarioFirebase.uid;
        getData(id);
      }else{
        setuser(null);
      }
    })
  }, []);
  

  const getData = async (id) =>{
    const url=`https://us-central1-pultemsoft.cloudfunctions.net/app/api/user/${id}`;
    try {
      const response=await axios.get(url).then(dat =>{
        const info=dat.data;
        setdata(info);
      })
      return response;
      
    } catch (error) {
      
    }
  }

  return (
    <div>
    {user ? <Data data={data}/> : <Login/>}
    </div>
  );
};

export default Home;
