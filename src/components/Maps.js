import React, { useState,useCallback }from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import credentials from '../config/credentials';



const Map = ({latitud,longitud}) => {
  const lat=parseFloat(latitud)
  const lng=parseFloat(longitud)
  const containerStyle = {
    height: '50vh'
  };
  const center = {
    // eslint-disable-next-line use-isnan
    lat: 4.6777463,
    lng: -74.0929682
  };
  
  const { isLoaded } = useJsApiLoader({
    id: 'jdvpl',
    googleMapsApiKey: credentials.mapsKey,
    latitud,
    longitud
  })
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])


  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        // eslint-disable-next-line use-isnan
        center=  { center}
        zoom={20}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={{lat:lat,lng:lng}}></Marker>
        <></>
      </GoogleMap>
  ) : <></>
}

export default Map;





