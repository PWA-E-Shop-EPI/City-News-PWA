import { UserProfile } from '@auth0/nextjs-auth0';
import React, { useEffect, useState } from 'react';

//styles
import * as Styled from './styles';

interface LeafletMapProps {
  map: any;
}

interface State {
  leafletMapProps: LeafletMapProps;
}

export const Map = (): JSX.Element => {
  const [state, setState] = useState<State>({
    leafletMapProps: {
      map: null
    },
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (state.leafletMapProps.map) {
        state.leafletMapProps.map.invalidateSize(true);
      }
    });
  }, []);

  useEffect(() => {
    createMap();
  }, []);

  const createMap = () => {
    var L = require('leaflet');

    // create the map
    let map: any = undefined;
    if (state.leafletMapProps.map) {
      state.leafletMapProps.map.off();
      state.leafletMapProps.map.remove();
    }
    map = L.map('map').setView([48.866667, 2.333333], 6);

    // the tile layer containing the image generated with `gdal2tiles --leaflet -p raster -w none <img> tiles`
    L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png'
    });

    /*const newMapStore = {...mapStore};
    newMapStore.mapsList[mapStore.mapSelected].markers.forEach((marker, index) => {
      const markerOnMap = L.marker([marker.position.x, marker.position.y]);
      map.addLayer(markerOnMap);
      marker.markerOnMap = markerOnMap;
      markerOnMap
        .bindPopup(
          ReactDOMServer.renderToString(
            <div id={"popupContent_" + index}></div>
          ),
          {
            className: styles.popupCustom,
          }
        )
        .on("popupopen", function (e: any) {
          ReactDOM.render(
            displayPopup(map, markerOnMap, index, marker.position),
            document.querySelector("#popupContent_" + index)
          );
        });
    });

    // set markers on click events in the map
    map.on("click", function (event: any) {
      // any position in leaflet needs to be projected to obtain the image coordinates
      var coords = rc.project(event.latlng);
      handleOnClickMap(map, rc.unproject(coords));
    });*/

    setState({ ...state, leafletMapProps: { map: map } });
    //setMapStore(newMapStore);
  };
  return <Styled.Map id='map'></Styled.Map>;
};

export default Map;
