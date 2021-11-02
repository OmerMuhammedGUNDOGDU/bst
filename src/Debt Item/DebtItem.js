import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddDebtItem from '../Debt Item/Modal/AddDebtItem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditDebtItem } from '../Debt Item/Modal/EditDebtItem';

import firebase from "firebase";
import database from "../firebase/firebase";

const DebtItem =() => { 

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow (true);

    const [value, setValue] = useState([]);
    const getDebtItemData = async () => {
        await database
          .collection("DebtItemTbl")
          .onSnapshot((snapshop) => {
              setValue(
                snapshop.docs.map((doc) => ({
                  id: doc.id,
                  debtItem: doc.data(),
                }))
              );
          }); 
          console.log('debtItem', value);       
      }
    useEffect(() => {
        getDebtItemData();
},[]);

    return(
        <div>
            <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Borç Kalemleri</th>
                        <th>Seçenekler</th>
                    </tr>
                </thead>

                <tbody>
                    {value.map(mbk =>
                        <tr key={mbk.id}>
                            <td>{mbk.id}</td>
                            <td>{mbk.debtItem.debtItemName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button >
                                        Güncelle
                                    </Button>

                                    <Button className="ml-2" variant="danger">
                                        Sil
                                    </Button>
                                </ButtonToolbar>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <AddDebtItem/>
        </div>
    )    
}
export default DebtItem;       