import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import firebase from "firebase";
import database from "../../firebase/firebase";

const AddGain = () => {
    
    const [show, setShow] = useState(false);
    const [gainItem, setGainItem] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        database.collection("GainTbl").add({
            gainName: e.target.gainName.value,
            price: e.target.price.value,
            kz: e.target.kz.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setShow(false);
    }

    const getGainItemData = async () => {
        await database
            .collection("GainItemTbl")
            .onSnapshot((snapshop) => {
                setGainItem(
                    snapshop.docs.map((doc) => ({
                        id: doc.id,
                        gain: doc.data(),
                    }))
                );
            });
            console.log('gain, gainItem');
    }
    useEffect(() => {
        getGainItemData();
    },[]);

    return ( 
        <div className="container">
            <>
            <Button className="btn-block" variant="primary" onClick={handleShow}>
                <strong> Gelir Ekle</strong>
            </Button>
    
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>                
                    <Modal.Title id="contained-modal-title-vcenter">            
                        Gelir Ekleme Ekranı
                    </Modal.Title>
    
                </Modal.Header>
    
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group ControlID="gainName">
                                    <Form.Label>
                                        Gelir Kalemi Seçiniz
                                    </Form.Label>
    
                                    <Form.Control
                                        as="select"
                                        name="gainName"
                                    >
                                        {gainItem.map(mb => 
                                            <option key={mb.id}>
                                                {mb.gain.gainItemName}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
    
                                <Form.Group controlID="price">
                                    <Form.Label>
                                         Fiyat
                                     </Form.Label>
    
                                    <Form.Control
                                        type="text"
                                        name="price"
                                        required
                                        placeholder="Meblağ Giriniz.."
                                    />
                                </Form.Group>
    
                                <Form.Group controlID="kz">
                                    <Form.Label>
                                        Kar Zarar
                                    </Form.Label>
    
                                    <Form.Control
                                        type="text"
                                        name="kz"
                                        required
                                        placeholder="Kar Zarar Durumu Giriniz.."
                                   />
                                </Form.Group>
    
                                <Form.Group>
                                    <Button variant="success" type="submit" >
                                        Ekle
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
    
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>               
                </Modal.Footer>
            </Modal>
            </>
        </div>
        );
    }        
export default AddGain;