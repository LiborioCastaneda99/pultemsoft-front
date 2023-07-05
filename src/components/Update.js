import React,{useState} from 'react';
import CreatableSelect from "react-select/creatable";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import Error from './Error';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Update = ({id,lat,lng}) => {
    const [error, seterror] = useState(false);
    const [mensajeError, setmensajeError] = useState('');
    let history = useHistory();



    const options=[
        {value:"Vomito ",label:"Vomito"},
        {value:"Diarrea ",label:"Diarrea"},
        {value:"Gripa ",label:"Gripa"},
        {value:"Dolor cabeza ",label:"Dolor cabeza"},
        {value:"Malestar ",label:"Malestar"},
        {value:"Dolor huesos ",label:"Dolor huesos"},
        {value:"Asma ",label:"Asma"},
        {value:"covid ",label:"covid"},
        {value:"Corazon ",label:"Corazon"},
        {value:"Tos ",label:"Tos"},
        {value:"cancer ",label:"cancer"},
        {value:"Ebola ",label:"Ebola"}
    ];
    let latitud;
    let longitude;
    navigator.geolocation.getCurrentPosition(function (position) {
        latitud=position.coords.latitude;
        longitude=position.coords.longitude
    })
    const [selectedOption, setselectedOption] = useState([]);
    const handleChange=(selectedOption)=>{
        setselectedOption(selectedOption);
    }
    const dataTosend=[]
    selectedOption.map( (data)=> dataTosend.push(data["value"]));
    const OnSubmitHandler =(e)=>{
        e.preventDefault();
        const  temp = e.target.elements.temp.value;
        const  spo2 = e.target.elements.spo2.value;
        const  bpm = e.target.elements.bpm.value;

        if(temp.trim()==='' || spo2.trim()==='' || bpm.trim()==='' || dataTosend.length===0){
            seterror(true);
            setmensajeError("Todos los campos son obligatorios")
            return;
        }else{
            seterror(false)
            setmensajeError('')
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-info me-5'
                },
                buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
                title: 'Quieres actualizar tu ubicacion actual?',
                text: "Al seleccionar 'Si quiero' el navegador tomara la nueva ubicacion.",
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Si quiero!',
                cancelButtonText: 'No actualizar ubicacion!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {

                    if(latitud!=null && longitude !=null){
                        updateData(id,latitud,longitude,dataTosend,temp,spo2,bpm);
                        swalWithBootstrapButtons.fire(
                            'Datos actualizados!',
                            'Tus datos han sidos actualizados',
                            'success'
                        )
                    }
                } else if (
                  /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
                ) {
                    updateData(id,lat,lng,dataTosend,temp,spo2,bpm);
                swalWithBootstrapButtons.fire(
                    'Actualizado',
                    'Tus datos han sidos actualizados',
                    'info'
                )
                }
            })
        }
        
    }

    const updateData=async(id,latitud,longitud,illnesses,temp,spo2,bpm)=>{
        console.log(id,latitud,longitud,illnesses,temp,spo2,bpm);
        const data={lat:latitud,lng:longitud,illnesses:illnesses,temp:temp,spo2:`${spo2}%`,hr:bpm}
        const url=`https://us-central1-pultemsoft.cloudfunctions.net/app/api/user/${id}`;
        try {
          const response=await axios.put(url,data);
        if(response.status ===200){
          history.go(0)
        }
        } catch (error) {
          
          seterror(true)
          setmensajeError("Error")
        }
        
    }


       

  return <div>
    <form  onSubmit={OnSubmitHandler}>
    {error ? (
        <Error mensaje={mensajeError}/>
        ): null}

      <div className="form-outline mb-4">
      <label className="form-label" htmlFor="illnesses">Selecciona tus sintomas</label>
      <CreatableSelect 
          className="basic-single"
          classNamePrefix="select"
          name="illnesses"
          options={options}
          onChange={handleChange}
          isMulti
          closeMenuOnSelect={false}
          value={selectedOption}
          id="illnesses"
        />
        </div>
        {
            (dataTosend.length>0)? <h5>Sintomas</h5> : ""
        }
        {         
        dataTosend.map((ill) =>
        <li key={ill}>{ill}</li>
        )
        }
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="temp">Temperatura</label>
                <input type="number" id="temp" className="form-control form-control-lg" step="any" />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="spo2">Porcentaje de SPO2</label>
                <input type="number" id="spo2" className="form-control form-control-lg" step="any" />
            </div>
            <div className="form-outline mb-4">
                <label className="form-label" htmlFor="bpm">BPM</label>
                <input type="number" id="bpm" className="form-control form-control-lg" step="any" />
            </div>
            <div className="pt-1 mb-4 text-center">
                <button className="btn btn-green " type="submit">Actualizar</button>
            </div>
      </form>
  </div>;
};

export default Update;
