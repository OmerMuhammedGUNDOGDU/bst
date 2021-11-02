import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import firebase from "firebase";
import database from "../../firebase/firebase";

const EditAsset = () => {

    const [show, setShow] = useState(false);
    const [assetItem, setAssetItem] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        database.collection("AssetTbl").add({
            assetName: e.target.assetName.value,
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

    const getAssetItemData = async () => {
        await database
            .collection("AssetItemTbl")
            .onSnapshot((snapshop) => {
                setAssetItem(
                    snapshop.docs.map((doc) => ({
                        id: doc.id,
                        asset: doc.data(),
                    }))
                );
            });
        console.log('asset', assetItem);
    }
    useEffect(() => {
        getAssetItemData();
    }, []);

    return (
        <div className="container">
            <>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Varlık Güncelleme Ekranı
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group controlID="assetName" >
                                        <Form.Label>
                                            Varlık Kalemi Seçiniz
                                        </Form.Label>

                                        <Form.Control
                                            as="select"
                                            name="assetName"
                                            defaultValue={useState.assetNAME}
                                        >
                                            {assetItem.map(mb =>
                                                <option key={mb.id}>
                                                    {mb.asset.assetItemName}
                                                </option>
                                            )}
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlID="price">
                                        <Form.Label>
                                            Meblağ
                                        </Form.Label>

                                        <Form.Control
                                            type="text"
                                            name="price"
                                            required
                                            defaultValue={useState.priceMv}
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
                                            defaultValue={useState.kzMv}
                                            placeholder="Kar Zarar Durumu Giriniz.."
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="success" type="submit">
                                            Güncelle
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Kapat
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
}
export default EditAsset;