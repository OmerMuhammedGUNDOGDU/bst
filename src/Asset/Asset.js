import React, { useState, useEffect } from 'react';
import AddAsset from '../Asset/Modal/AddAsset';
import { Modal, Button, Row, Col, Form, ButtonToolbar, Table } from 'react-bootstrap';
import EditAsset from '../Asset/Modal/EditAsset';

import firebase from "firebase";
import database from "../firebase/firebase";

const Asset = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState([]);
    const [assetItem, setAssetItem] = useState([]);
    const [mv, assetname, pricemv, kzmv] = useState([]);

    const getAssetData = async () => {
        await database
            .collection("AssetTbl")
            .onSnapshot((snapshop) => {
                setValue(
                    snapshop.docs.map((doc) => ({
                        id: doc.id,
                        asset: doc.data(),
                    }))
                );
            });
        console.log('asset', value);
    }
    useEffect(() => {
        getAssetData();
    }, []);



    const updateSubmit = (e) => {
        e.preventDefault();
        database.collection("AssetTbl").doc("DC").update({
            assetName: e.target.assetName.value,
            price: e.target.price.value,
            kz: e.target.kz.value
        })
            .then((docRef) => {
                console.log("Document successfully updated!", docRef.id);
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        setShow(false);
    }



    database.collection("AssetTbl").doc("DC").delete()
        .then((docRef) => {
            console.log("Document successfully deleted!", docRef.id);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });



    return (
        <div>
            <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Varlıklar</th>
                        <th>Meblağ</th>
                        <th>Kar Zarar</th>
                        <th>Seçenekler</th>
                    </tr>
                </thead>

                <tbody>
                    {value.map(asd =>
                        <tr key={asd.id}>
                            <td>{asd.id}</td>
                            <td>{asd.asset.assetName}</td>
                            <td>{asd.asset.price}</td>
                            <td>{asd.asset.kz}</td>
                            <td>
                                <div>
                                    <>
                                        <ButtonToolbar>
                                            <Button variant="primary" onClick={(handleShow) => ({
                                                // handleShow: true,
                                                assetname: mv.assetName,
                                                pricemv: mv.price,
                                                kzmv: mv.kz
                                            })}>
                                                Güncelle
                                            </Button>

                                            <Button className="ml-2" variant="danger" onClick={() => assetItem.delete(asd.asset.assetName)}>
                                                Sil
                                            </Button>

                                            <EditAsset
                                                show={handleShow}
                                                onHide={handleClose}
                                                assetNAME={assetname}
                                                priceMv={pricemv}
                                                kzMv={kzmv}
                                            />
                                        </ButtonToolbar>

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
                                                        <Form onSubmit={updateSubmit}>
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
                            </td>
                        </tr>
                    )}
                </tbody>
                <tr>
                    <th colSpan="2">TOPLAM</th>
                    <th select>Toplam</th>
                    <th>Toplam</th>
                </tr>
            </Table>
            <AddAsset />
        </div >
    )
}
export default Asset;