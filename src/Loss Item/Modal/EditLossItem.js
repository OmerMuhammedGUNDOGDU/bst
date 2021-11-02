import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

const EditLossItem = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mvs = [];     
    const initialEditLossState ={
        editLossItemName:""
    };

    const [editLossItem, setEditLossItem] = useState(initialEditLossState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const {name,value} =event.target;
        setEditLossItem({...editLossItem, [name]: value });
    };
    
        return (
            <div className="container">              

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Yeni Gider Kalemi Ekleme Ekranı
            </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onClick={handleShow}>

                                    <Form.Group controlID="GiderID">
                                        <Form.Label>
                                            Sıra Numarası
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="GiderID"
                                            required
                                            disabled
                                            defaultValue={this.props.agiderid}
                                            placeholder="Gider Kalemi Ekleyin.."
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="GiderName">
                                        <Form.Label>
                                            Gider Kalemleri
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="GiderName"
                                            required
                                            defaultValue={this.props.agidername}
                                            placeholder="Gider Kalemi Ekleyin.."
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit" onClick={handleShow}>
                                            Güncelle
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleShow}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
export default EditLossItem;