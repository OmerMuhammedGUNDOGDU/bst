import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditDebt extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            mbs: [],
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
        fetch('http://localhost:50868/api/toplamborçkalemi').then(response => response.json())
            .then(data => {
                this.setState({
                    mbs: data
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:50868/api/toplamborç',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    MevTopBorçlarID: e.target.MevTopBorçlarID.value,
                    MevTopBorçlarName: e.target.MevTopBorçlarName.value,
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
                        Borç Güncelleme Ekranı
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                
                                <Form.Group controlID="MevTopBorçlarID">
                                        <Form.Label>
                                        Mevcut Toplam Borçlar
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="MevTopBorçlarID"
                                            disabled
                                            defaultValue={this.props.mbId}
                                            placeholder="MevTopBorçlarID Giriniz.."
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="MevTopBorçlarName">
                                        <Form.Label>
                                            Borç Kalemi Seçiniz
                                         </Form.Label>

                                        <Form.Control
                                            as="select"
                                            defaultValue={this.props.mbName}
                                            name="MevTopBorçlarName"
                                        >
                                            {this.state.mbs.map(mb =>
                                                <option key={mb.MevTopBorçlarID}>
                                                    {mb.MevTopBorçKalemiName}
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
                                            defaultValue={this.props.fiyatMb}
                                            placeholder="Meblağ Giriniz.."
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="KarZarar">
                                        <Form.Label>
                                            Kar Zarar
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="KarZarar"
                                            required
                                            defaultValue={this.props.kzMb}
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