import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Rectangle, Circle, LayerGroup, LayersControl, FeatureGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { useState } from "react";

function LocationMarker() {
    const [position, setPosition] = useState(null)
    // console.log(position)
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

const center = [51.505, -0.09]
const rectangle = [
    [51.49, -0.08],
    [51.5, -0.06],
]


const Map = (props) => {
    const MAPBOX_API_KEy = "pk.eyJ1IjoiZXJyb29vcnJycjQwNCIsImEiOiJjbDllMDVnbHYweG8yM3ZvMGhyZTFyaGxhIn0.ENTMGsdczrL5hNnYVscDtg"
    return (
        <MapContainer
            center={props.coordinate ?? [48.866667, 2.333333]}
            zoom={14}
            scrollWheelZoom={true}
            zoomAnimation={true}
            zoomControl={false}
            style={{ height: "100%", width: "100%", zIndex: 5 }}
        >
            <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${MAPBOX_API_KEy}`}
            // attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
            />
            <LocationMarker />
            {/* <LayersControl position="topright"> */}
                {/* <LayersControl.Overlay name="Marker with popup">
                    <Marker position={props.coordinate}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker>
                </LayersControl.Overlay>
                <LayersControl.Overlay checked name="Layer group with circles">
                    <LayerGroup>
                        <Circle
                            center={center}
                            pathOptions={{ fillColor: 'blue' }}
                            radius={200}
                        />
                        <Circle
                            center={center}
                            pathOptions={{ fillColor: 'red' }}
                            radius={100}
                            stroke={false}
                        />
                        <LayerGroup>
                            <Circle
                                center={[51.51, -0.08]}
                                pathOptions={{ color: 'green', fillColor: 'green' }}
                                radius={100}
                            />
                        </LayerGroup>
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Feature group">
                    <FeatureGroup pathOptions={{ color: 'purple' }}>
                        <Popup>Popup in FeatureGroup</Popup>
                        <Circle center={[51.51, -0.06]} radius={200} />
                        <Rectangle bounds={rectangle} />
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl> */}
        </MapContainer>
    );
};

export default Map;
