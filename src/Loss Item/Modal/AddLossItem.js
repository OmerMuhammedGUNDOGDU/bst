import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import firebase from "firebase";
import database from "../../firebase/firebase";

const AddLossItem = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        database.collection("LossItemTbl").add({
            lossItemName: e.target.lossItemName.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setShow(false);
    }
  
return (
    <div className="container">     
        <>
        <Button className="btn-block" variant="primary" onClick={handleShow}>
            <strong> Yeni Gider Kalemi Ekle</strong>
        </Button>
        
         <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>                
                <Modal.Title id="contained-modal-title-vcenter">            
                    Gider Kalemi Ekleme Ekranı
                </Modal.Title>        
            </Modal.Header>
        
            <Modal.Body>
                <Row>
                    <Col sm={6}>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group ControlID="lossItemName">
                                <Form.Label>
                                    Gider Kalemi Seçiniz
                                </Form.Label>
        
                                <Form.Control
                                    type="text"
                                    name="lossItemName"
                                >                                  
                                </Form.Control>
                            </Form.Group>
        
                            <Form.Group>
                                <Button variant="success" type="submit">
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
    )
}
export default AddLossItem;