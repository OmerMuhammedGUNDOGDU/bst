import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditGain extends Component {
    constructor(props) {
        super(props);
        this.state =
        {
            deps: [],
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
        fetch('http://localhost:50868/api/department').then(response => response.json())
            .then(data => {
                this.setState({
                    deps: data
                })
            })
    }

    handleSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:50868/api/Employee',
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    EmployeeID: e.target.EmployeeID.value,
                    EmployeeName: e.target.EmployeeName.value,
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
                        Aylık Gelir Güncelleme Ekranı
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlID="EmployeeID">
                                        <Form.Label>
                                        Sıra Numarası
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="EmployeeID"
                                            disabled
                                            defaultValue={this.props.empid}
                                            placeholder="Sıra Numarası"
                                        />
                                    </Form.Group>

                                    <Form.Group controlID="EmployeeName">
                                        <Form.Label>
                                            Gelir Kalemi Seçiniz
                                         </Form.Label>

                                        <Form.Control 
                                            as="select" 
                                            defaultValue={this.props.empname}
                                            name="EmployeeName"    
                                        >
                                            {this.state.deps.map(dep =>
                                                <option key={dep.DepartmentID}>
                                                    {dep.DepartmentName}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlID="Fiyat">
                                        <Form.Label>
                                            Meblağ
                                         </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="Fiyat"
                                            required
                                            placeholder="Fiyat"
                                            defaultValue={this.props.depmt}
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
                                            placeholder="Kar Zarar Durumu Giriniz.."
                                            defaultValue={this.props.mailid}
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