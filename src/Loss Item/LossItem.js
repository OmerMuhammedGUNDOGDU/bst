import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import  AddLossItem  from '../Loss Item/Modal/AddLossItem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import  EditLossItem  from '../Loss Item/Modal/EditLossItem';

import firebase from "firebase";
import database from "../firebase/firebase";

const  LossItem = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const [value, setValue] = useState([]);
    const getLossItemData = async () => {
          await database
          .collection("LossItemTbl")
          .onSnapshot((snapshop) => {
              setValue(
                snapshop.docs.map((doc) => ({
                  id: doc.id,
                  lossItem: doc.data(),
                }))
              );
          }); 
          console.log('lossItem', value);       
      }

    useEffect(() => {
        getLossItemData();
},[]);

        return (
            <div> 
                <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                    <thead>
                        <tr>                        
                            <th>#</th>
                            <th>Gider Kalemleri</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {value.map(asd =>
                            <tr key={asd.id}>
                                <td>{asd.id}</td>
                                <td>{asd.lossItem.lossItemName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button onClick={handleShow}>
                                            Güncelle
                                        </Button>

                                        <Button className="ml-2" variant="danger" onClick={handleShow} >
                                            Sil
                                        </Button>
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <AddLossItem/>
            </div>
        )    
}
export default LossItem;