import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import Head from 'next/head';

//config
import paths from 'config/paths';

//components
import Layout from 'components/global/Layout/Layout';

//styles
import * as Styled from 'styles/pages/new-event';
import * as GlobalStyled from 'styles/globals';

//common
import { EventType } from 'common/enum';
import { LeafletMapProps } from 'common/types';
import API from 'common/API/API';

export const getServerSideProps = withPageAuthRequired({
  returnTo: paths.home.newEvent.index
});

interface Marker {
  markerOnMap: any;
  position: {
    x: number;
    y: number;
  };
}

interface State {
  leafletMapProps: LeafletMapProps;
  marker: Marker | null;
}

export const NewEvent = (): JSX.Element => {
  const [state, setState] = useState<State>({
    leafletMapProps: {
      map: null
    },
    marker: null
  });
  const stateRef = useRef<State>();
  stateRef.current = state;
  const { user } = useUser();
  console.log('newState =>', state);

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

  const handleOnClickDeleteEmptyMarker = (map: any, marker: any): void => {
    map.closePopup();
    map.removeLayer(marker);
    setState(prevState => {
      return {
        ...prevState,
        marker: null
      };
    });
  };

  const displayPopup = (map: any, marker: any): JSX.Element => {
    return (
      <GlobalStyled.Popup>
        <Styled.DeleteMarkerButton onClick={() => handleOnClickDeleteEmptyMarker(map, marker)} type="primary" danger>
          Delete
        </Styled.DeleteMarkerButton>
      </GlobalStyled.Popup>
    );
  };

  const handleOnClickMap = (map: any, coords: any): void => {
    var L = require('leaflet');
    var marker = L.marker(coords);
    map.addLayer(marker);

    const newMarker: Marker = {
      markerOnMap: marker,
      position: {
        x: coords.lat,
        y: coords.lng
      }
    };

    marker
      .bindPopup(ReactDOMServer.renderToString(<div id={'popupContent_0'}></div>), {
        className: 'leaflet-popupCustom'
      })
      .on('popupopen', function (e: any) {
        ReactDOM.render(displayPopup(map, marker), document.querySelector('#popupContent_0'));
      });
    if (stateRef.current) {
      setState({ ...stateRef.current, marker: newMarker });
    }
    /*setState(prevState => {
      console.log("setState");
      return {
        ...prevState,
        marker: newMarker
      };
    });*/
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
      iconRetinaUrl: '/leaflet/marker-icon-2x.png',
      iconUrl: '/leaflet/marker-icon.png',
      shadowUrl: '/leaflet/marker-shadow.png'
    });

    map.on('click', (event: any) => {
      var coords = event.latlng;
      console.log(stateRef.current);
      if (stateRef.current && stateRef.current.marker === null) handleOnClickMap(map, coords);
    });
  };

  const handleOnFinishForm = (values: any) => {
    if (state.marker === null) {
      alert('Please add a marker on the map');
    } else {
      console.log('ok');
      console.log(user || user.email)
      if (!user || !user.email)
        return;
      console.log({
        user: user.email,
        type: values.type,
        title: values.title,
        desc: values.desc,
        lat: state.marker.position.x,
        lng: state.marker.position.y,
        expires: 2,
      })
      API.events().POST({
        body: {
          user: user.email,
          type: values.type,
          title: values.title,
          desc: values.desc,
          lat: state.marker.position.x,
          lng: state.marker.position.y,
          expires: 2,
        }
      });
    }
  };

  return (
    <>
      <Head>
        <title>City News | New event</title>
      </Head>
      <Layout keySelected={1}>
        <Styled.NewEvent>
          <Styled.Map id="map"></Styled.Map>
          <Styled.MyForm
            name="event"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleOnFinishForm}
            onFinishFailed={() => null}
            autoComplete="off">
            <Styled.MyForm.Item
              label="Event type"
              name="type"
              initialValue={[EventType.POPULAR_EVENT]}
              rules={[{ required: true, message: "Please input the event's title!" }]}>
              <Styled.EventType
                defaultValue={EventType.POPULAR_EVENT}
                style={{ width: '100%' }}
                onChange={() => null}
                options={[
                  {
                    value: EventType.MARKETS_EVENTS,
                    label: EventType.MARKETS_EVENTS
                  },
                  {
                    value: EventType.NATURAL_DISASTER,
                    label: EventType.NATURAL_DISASTER
                  },
                  {
                    value: EventType.PEOPLE,
                    label: EventType.PEOPLE
                  },
                  {
                    value: EventType.POPULAR_EVENT,
                    label: EventType.POPULAR_EVENT
                  },
                  {
                    value: EventType.OTHER,
                    label: EventType.OTHER
                  }
                ]}
              />
            </Styled.MyForm.Item>
            <Styled.MyForm.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input the event's title!" }]}>
              <Styled.Title />
            </Styled.MyForm.Item>
            <Styled.MyForm.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please input the event's description!" }]}>
              <Styled.Description autoSize={{ minRows: 2, maxRows: 6 }} />
            </Styled.MyForm.Item>
            <Styled.Submit>
              <Styled.SubmitButton type="primary" htmlType="submit">
                Submit
              </Styled.SubmitButton>
            </Styled.Submit>
          </Styled.MyForm>
        </Styled.NewEvent>
      </Layout>
    </>
  );
};

export default NewEvent;
