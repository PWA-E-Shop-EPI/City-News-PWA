import React, { useState } from 'react';
import { Row, Col, Table, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler, UncontrolledDropdown, Dropdown, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert, Collapse, FormText } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Delete, Info, Settings, XCircle } from 'react-feather';
import toast from 'react-hot-toast';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';
import dynamic from 'next/dynamic';


const moment = require('moment')
const response = [
    {
        id: 1,
        type: "Catastrophe Naturelle",
        title: "Tremblement de terre dans le centre ville",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.",
        date: "2022-11-20T15:13:32+00:00",
        lat: 49.1984,
        lng: 2.4732,
        expires: 2
    },
    {
        id: 2,
        type: "Fait divers",
        title: "Ouverture du marché de Noel",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.",
        date: "2022-10-20T15:13:32+00:00",
        lat: 49.1984,
        lng: 2.4732,
        expires: -1
    },
    {
        id: 3,
        type: "Fait divers",
        title: "Ouverture du marché de Noel",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean est lectus, pharetra id gravida quis, tempus pulvinar diam. Curabitur congue, libero non porttitor vulputate, ipsum risus vulputate lacus, eget dapibus dolor diam ac elit. Praesent et tellus vulputate, consequat dolor ut, tincidunt lectus. Etiam vestibulum sodales dui nec ornare. Vivamus sodales fringilla gravida. Fusce sit amet sagittis magna, mattis fermentum neque. Donec nisi purus, varius ac volutpat at, consectetur et metus. Vestibulum est nibh, gravida ut sapien at, finibus viverra tortor. Integer non sapien metus. Phasellus ac lacinia elit. Vestibulum faucibus turpis massa, et placerat metus consectetur nec.Nulla rhoncus sapien vitae aliquet iaculis. Sed rutrum turpis quis risus pretium sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc leo justo, ultricies non mi vitae, lobortis facilisis dui. Vestibulum auctor vulputate leo. Aliquam gravida nunc at dolor faucibus, at laoreet lectus dictum. Nam pretium porttitor justo ut vehicula. Praesent sem erat, faucibus ut erat in, vestibulum venenatis massa. Donec enim mauris, bibendum et tincidunt eu, bibendum vel felis. Etiam lobortis diam dui, non interdum magna vulputate id. Sed ornare interdum diam, nec interdum justo congue condimentum. Nullam elementum arcu non porta scelerisque. Aliquam magna justo, volutpat ultrices viverra ut, tristique eu quam.Proin id fringilla dui. Quisque pulvinar aliquam ante a dapibus. Duis molestie porta ipsum quis venenatis. Vivamus congue augue eget elit facilisis suscipit sit amet in nisl. Aenean non libero urna. Donec fringilla at felis ac sollicitudin. Fusce sit amet nisl ultricies, rhoncus tellus at, mattis tortor.",
        date: "2022-10-20T15:13:32+00:00",
        lat: 49.1984,
        lng: 2.4732,
        expires: 1
    }
]

function NewMarker() {
    const { user, isLoading } = useUser();

    const [event, setEvent] = useState(response[0]);

    const MapWithNoSSR = dynamic(() => import("../components/Map"), {
        ssr: false
    });

    const addNews = () => {
        toast.success('Votre evenement a été ajouté!');
        window.location.href = '/'
    }

    return (
        <>
            {isLoading && <Loading />}
            {user && (
                <div className='container' style={{ marginTop: 16 }}>
                    <h1 style={{textAlign: "center"}}>Créer un nouvel évênement</h1>
                    <Row style={{ marginTop: 16 }}>
                        <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                        >
                            <Form>
                                <FormGroup>
                                    <Label for="exampleSelect">Type d'evenement</Label>
                                    <Input type="select" name="select" id="exampleSelect">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Titre</Label>
                                    <Input type="text" name="title" id="exampleEmail" placeholder="with a placeholder" value={event.title} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleText">Description</Label>
                                    <Input type="textarea" name="text" id="exampleText" value={event.text} rows={10} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleEmail">Validité</Label>
                                    <Input type="number" name="validite" id="exampleEmail" min={0} max={31} value={1} />
                                    <FormText>
                                        Entre 1 et 31 jours.
                                    </FormText>
                                </FormGroup>
                            </Form>
                        </Col>
                        <Col
                            xs="12"
                            sm="12"
                            md="6"
                            lg="6"
                            style={{ minHeight: 300 }}
                        >
                            <MapWithNoSSR coordinate={[event.lat, event.lng]} />
                        </Col>
                        <Col
                            xs="12"
                            sm="12"
                            md="12"
                            lg="12"
                            style={{ marginTop: 16 }}
                        >
                            <Button color='success' style={{ margin: "auto", display: "block", maxWidth: 300, width: "100%", borderRadius: 6 }} onClick={() => addNews()}>Ajouter</Button>
                        </Col>
                    </Row>
                </div>
            )}
        </>
    );
}

export default withPageAuthRequired(NewMarker, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
