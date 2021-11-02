import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

import firebase from "firebase";
import database from "../../firebase/firebase";

export class EditDebtItem extends Component {
    constructor(props) 
    {
        super(props);
        this.state =
        {
            snackbaropen: false, //ilk başta kapalı olacak
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    snackbarClose = () => 
    {
        this.setState({
            snackbaropen: false
        });
    }
    handleSubmit(e) 
    {
        e.preventDefault();
        fetch('http://localhost:50868/api/ToplamBorçKalemi',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MevTopBorçKalemiID: e.target.MevTopBorçKalemiID.value,
                    MevTopBorçKalemiName: e.target.MevTopBorçKalemiName.value  
                })
            })

            .then(res => res.json())
                .then((result)=> 
                {
                    this.setState({
                        snackbaropen:true,
                        snackbarmsg:result
                    });
                },
                    (error) => 
                    {
                        this.setState({
                            snackbaropen:true,
                            snackbarmsg:'Failed'
                        });
                    }
                )
    }

    render() 
    {
        return (
            <div className="container">
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }} //nerede görünmesini istiyorsak konumlandırmaya yarıyor 
                    open={this.state.snackbaropen} //butona basılınca açılacak
                    autoHideDuration={3000} // 3 saniye sonra kendiliğinden kapanacak
                    onClose={this.snackbarClose} // kaydetme işleminden snr snackbar 3 saniye göründü sonradan true olan değerini tekrar false yapsın dedik

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}

                    action={[
                        <IconButton key="close" aria-label="Close" color="inherit" onClick={this.snackbarClose}>
                            x
                        </IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                         Borç Kalemi Güncelleme Ekranı
            </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                
                                    <Form.Group controlID="MevTopBorçKalemiID">
                                        <Form.Label>
                                            Borç Kalemleri
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="MevTopBorçKalemiID"
                                            required
                                            disabled
                                            defaultValue={this.props.borckalemiID}
                                            placeholder="MevTopBorçKalemiID"
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="MevTopBorçKalemiName">
                                        <Form.Label>
                                            Borç Kalemleri
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="MevTopBorçKalemiName"
                                            required
                                            defaultValue={this.props.borckalemiName}
                                            placeholder="MevTopBorçKalemiName"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Güncelle
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Kapat</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}