import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import  AddGain  from '../Gain/Modal/AddGain';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditGain } from '../Gain/Modal/EditGain';

import firebase from "firebase";
import database from "../firebase/firebase";

const Gain = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[value, setValue] = useState([]);        
    const getGainData = async () => {
        await database
        .collection("GainTbl")
        .onSnapshot((snapshop) => {
            setValue(
              snapshop.docs.map((doc) => ({
                id: doc.id,
                gain: doc.data(),
              }))
            );
        }); 
        console.log('gain', value);       
    }
  useEffect(() => {
    getGainData();
},[]);

      return (
        <div >
            <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gelir </th>
                        <th>Meblağ</th>
                        <th>Kar Zarar</th>
                        <th>Seçenekler</th>
                    </tr>
                </thead>

                <tbody>
                   {value.map(klm=>                           
                        <tr key={klm.id}>
                            <td>{klm.id}</td>
                            <td>{klm.gain.gainName}</td>
                            <td>{klm.gain.price}</td>
                            <td>{klm.gain.kz}</td>
                            <td>
                                <ButtonToolbar>
                                <Button>
                                    Güncelle
                                </Button>

                                <Button className="ml-2" variant="danger">
                                    Sil
                                </Button>

                                    {/* <EditGain
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
            <AddGain/>
        </div>
    )
}
export default Gain ;