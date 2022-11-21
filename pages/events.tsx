import React, { useState } from 'react';
import { Row, Col, Table, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler, UncontrolledDropdown, Dropdown, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input, Alert, Collapse } from 'reactstrap';
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Delete, Info, Settings, XCircle } from 'react-feather';
import toast from 'react-hot-toast';

import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Highlight from '../components/Highlight';
import dynamic from 'next/dynamic';


const moment = require('moment')

function Profile() {
    const { user, isLoading } = useUser();

    const [modal, setModal] = useState(false);
    const [event, setEvent] = useState(null);

    const MapWithNoSSR = dynamic(() => import("../components/Map"), {
        ssr: false
    });

    const toggle = () => setModal(!modal);

    const saveEvent = () => {
        toast.success('Vos modifications ont bien été enregistrées!');
    }

    const deleteEvent = (event) => {
        console.log(event)
        if (confirm("Êtes-vous sur de vouloir supprimer cet évenement ?")) {
            toast.success('Evenement supprimé avec succès!');

        }
    }

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

    return (
        <>
            {isLoading && <Loading />}
            {user && (
                <div className='container' style={{ marginTop: 16 }}>
                    <p style={{ fontWeight: "bold" }}>Mes évenements actifs:</p>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date d'ajout</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                response.filter((event) => event.expires > 0).map((event, index) => {
                                    return (<tr key={index + "index"}>
                                        <th scope="row">{event.id}</th>
                                        <td>{event.type}</td>
                                        <td>{event.title}</td>
                                        <td>{event.text.slice(0, 50) + "..."}</td>
                                        <td>{moment(event.date).format("YYYY-MM-DD HH:mm:ss")}</td>
                                        <td style={{ display: 'inline-flex' }}>
                                            <Button color="info" onClick={() => { toggle(), setEvent(event) }} style={{ borderRadius: 6 }}>
                                                <Info />
                                            </Button>
                                            <span style={{ width: 6 }}>{' '}</span>
                                            <Button color="danger" onClick={() => { deleteEvent(event) }} style={{ borderRadius: 6 }}>
                                                <XCircle />
                                            </Button>
                                        </td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                    <p style={{ fontWeight: "bold" }}>Mes évenements expirés:</p>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Type</th>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date d'ajout</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                response.filter((event) => event.expires <= 0).map((event, index) => {
                                    return (<tr key={index + "index"}>
                                        <th scope="row">{event.id}</th>
                                        <td>{event.type}</td>
                                        <td>{event.title}</td>
                                        <td>{event.text.slice(0, 50) + "..."}</td>
                                        <td>{moment(event.date).format("YYYY-MM-DD HH:mm:ss")}</td>
                                        <td style={{ display: 'inline-flex' }}>
                                            <Button color="info" onClick={() => { toggle(), setEvent(event) }} style={{ borderRadius: 6 }}>
                                                <Info />
                                            </Button>
                                            <span style={{ width: 6 }}>{' '}</span>
                                            <Button color="danger" onClick={() => { deleteEvent(event) }} style={{ borderRadius: 6 }}>
                                                <XCircle />
                                            </Button>
                                        </td>
                                    </tr>)
                                })
                            }
                        </tbody>
                    </Table>
                    <Modal isOpen={modal} toggle={toggle} size='xl' centered>
                        <ModalHeader toggle={toggle}>Informations sur mon evenement</ModalHeader>
                        <ModalBody>
                            {event && (
                                <Row>
                                    <Col
                                        xs="12"
                                        sm="12"
                                        md="12"
                                        lg="12"
                                    >
                                        {
                                            event.expires > 0 ? (
                                                <Alert color={event.expires === 1 ? "warning" : "success"}>
                                                    Votre evenement expire dans {event.expires} jour(s).
                                                </Alert>
                                            ) : (
                                                <Alert color="danger">
                                                    Votre evenement à expiré.
                                                </Alert>
                                            )
                                        }

                                    </Col>
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

                                </Row>

                            )}
                        </ModalBody>
                        <ModalFooter>
                            {event?.expires > 0 && (
                                <Button color="primary" onClick={() => { toggle(); saveEvent() }} style={{ borderRadius: 6 }}>
                                    Modifier
                                </Button>
                            )}
                            <Button color="secondary" onClick={toggle} style={{ borderRadius: 6 }}>
                                Fermer
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            )}
        </>
    );
}

export default withPageAuthRequired(Profile, {
    onRedirecting: () => <Loading />,
    onError: error => <ErrorMessage>{error.message}</ErrorMessage>
});
