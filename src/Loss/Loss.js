import React, { useState,useEffect  } from 'react';
import { Table } from 'react-bootstrap';
import AddLoss from '../Loss/Modal/AddLoss';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditLoss } from '../Loss/Modal/EditLoss';

import firebase from "firebase";
import database from "../firebase/firebase";

const Loss = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow (true);

    const[value, setValue] = useState([]);
    const getLossData = async () => {
        await database
        .collection("LossTbl")
        .onSnapshot((snapshop) => {
            setValue(
              snapshop.docs.map((doc) => ({
                id: doc.id,
                loss: doc.data(),
              }))
            );
        }); 
        console.log('loss', value);       
    }
  useEffect(() => {
    getLossData();
},[]);

        return (
            <div>
                <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Gider </th>
                            <th>Meblağ</th>
                            <th>Kar Zarar</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>

                    <tbody>
                       {value.map(xyz=>                           
                            <tr key={xyz.id}>
                                <td>{xyz.id}</td>
                                <td>{xyz.loss.lossName}</td>
                                <td>{xyz.loss.price}</td>
                                <td>{xyz.loss.kz}</td>
                                <td>
                                    <ButtonToolbar>
                                    <Button>
                                        Güncelle
                                    </Button>

                                    <Button className="ml-2" variant="danger">
                                        Sil
                                    </Button>
                                        {/* <EditLoss
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            mvId={mvid} 
                                            mvName={mvname} 
                                            fiyatMv={fiyatmv}
                                            kzMv={kzmv}
                                        /> */}
                                    </ButtonToolbar>
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
                <AddLoss />
            </div>
        )
    }
    export default Loss ;