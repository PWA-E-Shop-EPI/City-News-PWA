import React, { useState } from 'react';
import toast from 'react-hot-toast';

import Hero from '../components/Hero';
import Content from '../components/Content';
import dynamic from "next/dynamic";
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const axios = require('axios');

// const response = [
//   {
//     "latitude": 50.103492,
//     "longitude": 1.834077,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Somme",
//     "region_code": "SO",
//     "county": "Abbeville",
//     "locality": "Abbeville",
//     "administrative_area": "Abbeville",
//     "neighbourhood": null,
//     "country": "France",
//     "country_code": "FRA",
//     "continent": "Europe",
//     "label": "Abbeville, France"
//   },
//   {
//     "latitude": 36.953783,
//     "longitude": -81.09951,
//     "type": "locality",
//     "name": "Wytheville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Virginia",
//     "region_code": "VA",
//     "county": "Wythe County",
//     "locality": "Wytheville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Wytheville, VA, USA"
//   },
//   {
//     "latitude": 34.17726,
//     "longitude": -82.379864,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "South Carolina",
//     "region_code": "SC",
//     "county": "Abbeville County",
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville, SC, USA"
//   },
//   {
//     "latitude": 34.227589,
//     "longitude": -82.454959,
//     "type": "county",
//     "name": "Abbeville County",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 0.4,
//     "region": "South Carolina",
//     "region_code": "SC",
//     "county": "Abbeville County",
//     "locality": null,
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville County, SC, USA"
//   },
//   {
//     "latitude": 51.96667,
//     "longitude": -8.58333,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Cork",
//     "region_code": null,
//     "county": null,
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "Ireland",
//     "country_code": "IRL",
//     "continent": "Europe",
//     "label": "Abbeville, Ireland"
//   },
//   {
//     "latitude": 41.19728,
//     "longitude": -81.8868,
//     "type": "locality",
//     "name": "Abbeyville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Ohio",
//     "region_code": "OH",
//     "county": "Medina County",
//     "locality": "Abbeyville",
//     "administrative_area": "York Township",
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeyville, OH, USA"
//   },
//   {
//     "latitude": 34.503448,
//     "longitude": -89.501226,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Mississippi",
//     "region_code": "MS",
//     "county": "Lafayette County",
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville, MS, USA"
//   },
//   {
//     "latitude": 29.972503,
//     "longitude": -92.127504,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Louisiana",
//     "region_code": "LA",
//     "county": "Vermilion Parish",
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville, LA, USA"
//   },
//   {
//     "latitude": 31.569269,
//     "longitude": -85.247748,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Alabama",
//     "region_code": "AL",
//     "county": "Henry County",
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville, AL, USA"
//   },
//   {
//     "latitude": 31.992534,
//     "longitude": -83.307102,
//     "type": "locality",
//     "name": "Abbeville",
//     "number": null,
//     "postal_code": null,
//     "street": null,
//     "confidence": 1,
//     "region": "Georgia",
//     "region_code": "GA",
//     "county": "Wilcox County",
//     "locality": "Abbeville",
//     "administrative_area": null,
//     "neighbourhood": null,
//     "country": "United States",
//     "country_code": "USA",
//     "continent": "North America",
//     "label": "Abbeville, GA, USA"
//   }
// ]

export default function Index() {
  const [city, setCity] = useState("")
  const [modal, setModal] = useState(false);
  const [response, setResponse] = useState([])
  const [coordinates, setCoordinates] = useState([48.866667, 2.333333])

  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });

  const toggle = () => setModal(!modal);

  const changeCoordinate = (city) => {
    const findFromResponse = response.filter(r => r.label === city)[0];
    setCity(findFromResponse.label)
    setCoordinates([findFromResponse.latitude, findFromResponse.longitude])
    setModal(!modal)
  }

  const checkKey = async (key) => {
    if (key === 'Enter') {
      const list = await axios.get('http://api.positionstack.com/v1/forward?access_key=014ea62fff1d48222ffa2f94345a0bdf&query=' + city)
        .then(response => {
          return (response.data.data);
        }).catch(_error => {
          return [];
        });
      setResponse(list);
      if (list.length > 1) {
        setModal(true);
      } else if (list.length === 1) {
        setCoordinates([list[0].latitude, list[0].longitude])
      } else {
        toast.error('Aucun résultat. Merci de réessayer avec une autre ville');
      }
    }
  }


  return (
    <>
      {/* <Hero />
      <hr /> */}
      <Input style={{
        position: 'absolute',
        zIndex: 10,
        width: "100%",
        maxWidth: 500,
        top: 135,
        left: "50%",
        transform: 'translate(-50%, -50%)',
      }}
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => checkKey(e.key)}
      />
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Plusieurs Choix possible</ModalHeader>
        <ModalBody>
          <p>Merci de choisir parmis la ville correspondante parmis la liste proposée:</p>
          <Input type='select' onChange={(e) => changeCoordinate(e.target.value)}>
            <option selected disabled>--- {response?.length} réponse(s) ----</option>
            {response?.map((city, index) =>
              <option key={index} value={city.label}> {city.label} </option>
            )}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
      <MapWithNoSSR coordinate={coordinates} />
    </>
  );
}
