import React, { useEffect } from 'react'
import {MapContainer,TileLayer,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import L from 'leaflet';
import { useTenant } from '../../../Context/TenantContext';


function Map() {
    const icon = L.icon({
        //iconUrl: require("../../../img/icons8-location-50.png"),
        iconSize: [50, 50],
        iconAnchor: [25, 32]
      });
      const {name,enlem,boylam}=useTenant();
      const position=[enlem,boylam ];

  return (
    <div>
      <MapContainer key={enlem} center={position} zoom={13} scrollWheelZoom={false} style={{width:'450px', height:'250px'}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position} icon={icon} >
      <Popup>
        {name}
      </Popup>
    </Marker>
  </MapContainer>,
    </div>
  )
}

export default Map
