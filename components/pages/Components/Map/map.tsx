import React, { useEffect, useState } from 'react';
import moment from 'moment';

//styles
import * as Styled from './styles';

//hooks
import useStore from 'hooks/useStore';

//store
import eventsStoreConfig, { EventsStore } from 'store/events';

//common
import { LeafletMapProps } from 'common/types';

interface State {
  leafletMapProps: LeafletMapProps;
  displayingMap: boolean;
  eventSelected: number;
}

export const Map = (): JSX.Element => {
  const [state, setState] = useState<State>({
    leafletMapProps: {
      map: null
    },
    displayingMap: false,
    eventSelected: -1
  });
  const [eventsStore, dispatchEventsStore] = useStore<EventsStore>(new EventsStore(eventsStoreConfig));

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position);
        state?.leafletMapProps?.map?.setView([position.coords.latitude, position.coords.longitude], 13);
      },

      function (error) {
        console.error('Error Code = ' + error.code + ' - ' + error.message);
      }
    );
  }, [state.displayingMap]);

  const displayDescription = (): JSX.Element => {
    if (state.eventSelected === -1) return <></>;
    const eventsStoreValues = eventsStore.getValues();
    const date = moment(eventsStoreValues.events[state.eventSelected].date).locale('en').format('LLL');
    return (
      <Styled.EventDescription>
        <Styled.EventDescriptionTitle>
          {eventsStoreValues.events[state.eventSelected].title}
        </Styled.EventDescriptionTitle>
        <p>Event type: {eventsStoreValues.events[state.eventSelected].type}</p>
        <p>
          Date: <Styled.EventDescriptionDate>{date}</Styled.EventDescriptionDate>
        </p>
        <Styled.EventDescriptionDescription>
          {eventsStoreValues.events[state.eventSelected].text}
        </Styled.EventDescriptionDescription>
      </Styled.EventDescription>
    );
  };

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
      /*iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png'*/
      iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    var greyMarkerIcon = new L.Icon({
      iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const eventsStoreValues = eventsStore.getValues();
    eventsStoreValues.events.forEach((event, index) => {
      let markerOnMap = null;
      if (event.expires > 0) {
        markerOnMap = L.marker([event.lat, event.lng]);
      } else if (event.expires <= 0 && event.expires > -7) {
        markerOnMap = L.marker([event.lat, event.lng], { icon: greyMarkerIcon });
      } else {
        return;
      }
      map.addLayer(markerOnMap);
      console.log(event);
      event.markerOnMap = markerOnMap;
      event.markerOnMap.on('click', function (e: any) {
        map.setView([event.lat, event.lng], map.getZoom() > 13 ? map.getZoom() : 13);
        setState(prevState => {
          return {
            ...prevState,
            eventSelected: prevState.eventSelected === -1 ? index : prevState.eventSelected === index ? -1 : index
          };
        });
      });
      map.on('click', function () {
        setState(prevState => {
          return {
            ...prevState,
            eventSelected: -1
          };
        });
      });
    });
    eventsStore.setValues(eventsStoreValues);
    dispatchEventsStore(eventsStore);
    setState({ ...state, displayingMap: true, leafletMapProps: { map: map } });
  };
  return (
    <Styled.MapWrapper>
      <Styled.Map id="map"></Styled.Map>
      {displayDescription()}
    </Styled.MapWrapper>
  );
};

export default Map;
