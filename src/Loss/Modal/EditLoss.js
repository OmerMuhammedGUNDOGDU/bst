import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditLoss extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            ags: [],
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
   
    componentDidMount() {
        fetch('http://localhost:50868/api/aylıkgiderkalemi').then(response => response.json())
            .then(data => {
                this.setState({
                    ags: data
                })
            })
    }
   
    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:50868/api/aylıkgider',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    AylıkGiderID: e.target.AylıkGiderID.value,
                    AylıkGiderName: e.target.AylıkGiderName.value,
                    Fiyat: e.target.Fiyat.value,
                    KarZarar: e.target.KarZarar.value
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
                            Aylık Gider Ekleme Ekranı
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlID="AylıkGiderID">
                                        <Form.Label>
                                            Sıra Numrası
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="AylıkGiderID"
                                            disabled
                                            defaultValue={this.props.agId}
                                            placeholder="Sıra Numarası"
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="AylıkGiderName">
                                        <Form.Label>
                                            Gider Kalemi Seçiniz
                                         </Form.Label>

                                        <Form.Control
                                            as="select"
                                            defaultValue={this.props.agName}
                                            name="AylıkGiderName"
                                        >
                                            {this.state.ags.map(ag =>
                                                <option key={ag.GiderID}>
                                                    {ag.GiderName}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlID="Fiyat">
                                        <Form.Label>
                                        Fiyat
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="Fiyat"
                                            required
                                            defaultValue={this.props.fiyatMt}
                                            placeholder="Fiyat Giriniz.."
                                        />
                                    </Form.Group>

                            
                                    <Form.Group controlID="KarZarar">
                                        <Form.Label>
                                        Kar Zarar Durumu
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="KarZarar"
                                            required
                                            defaultValue={this.props.kzId}
                                            placeholder="Kar Zarar Durumu Giriniz.."
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