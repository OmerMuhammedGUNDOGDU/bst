import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditGainItem extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            snackbaropen: false, //ilk başta kapalı olacak
            snackbarmsg: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = () => {
        this.setState({
            snackbaropen: false
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:50868/api/Department',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    DepartmentID: e.target.DepartmentID.value,
                    DepartmentName: e.target.GelirKalemi.value
                })
            })

            .then(res => res.json())
            .then((result) => {
                this.setState({
                    snackbaropen: true,
                    snackbarmsg: result
                });
            },
                (error) => {
                    this.setState({
                        snackbaropen: true,
                        snackbarmsg: 'Failed'
                    });
                }
            )
    }

    render() {
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
                            Başlıkları Güncelleme Ekranı
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group>
                                        <Form.Label>
                                        Sıra Numarası
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="DepartmentID"
                                            required
                                            disabled
                                            defaultValue={this.props.depid}
                                            placeholder="DepartmentID"
                                        />
                                    </Form.Group>


                                    <Form.Group controlID="GelirKalemi">
                                        <Form.Label>
                                        Gelir Başlığını Güncelleyiniz
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="GelirKalemi"
                                            required
                                            defaultValue={this.props.depName}
                                            placeholder="Gelir Kalemi Giriniz.."
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