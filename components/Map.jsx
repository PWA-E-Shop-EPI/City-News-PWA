import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState } from "react";

function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 18)
        },
    })
    // map.flyTo({ lat: coordinate[0], lng: coordinate[1] }, 14)
    map.locate()

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

const Map = (props) => {
    const MAPBOX_API_KEy = "pk.eyJ1IjoiZXJyb29vcnJycjQwNCIsImEiOiJjbDllMDVnbHYweG8yM3ZvMGhyZTFyaGxhIn0.ENTMGsdczrL5hNnYVscDtg"
    return (
        <MapContainer
            center={props.coordinate ?? [48.866667, 2.333333]}
            zoom={14}
            scrollWheelZoom={true}
            zoomAnimation={true}
            style={{ height: "100%", width: "100%", zIndex: 5 }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEy}`}
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <LocationMarker />

        </MapContainer>
    );
};

export default Map;
