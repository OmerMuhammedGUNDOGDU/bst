import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddDebt from '../Debt/Modal/AddDebt';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditDebt } from '../Debt/Modal/EditDebt';

import firebase from "firebase";
import database from "../firebase/firebase";

const Debt = () => {

    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[value, setValue] = useState([]);
    const getDebtData = async () => {
        await database
        .collection("DebtTbl")
        .onSnapshot((snapshop) => {
            setValue(
              snapshop.docs.map((doc) => ({
                id: doc.id,
                debt: doc.data(),
              }))
            );
        }); 
        console.log('debt', value);       
    }
    useEffect(() => {
        getDebtData();
},[]);
        
        return (
            <div >
                <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Borçlar </th>
                            <th>Meblağ</th>
                            <th>Kar Zarar</th>
                            <th>Seçenekler</th>
                        </tr>
                    </thead>

                    <tbody>
                       {value.map(abc=>                           
                            <tr key={abc.id}>
                                <td>{abc.id}</td>
                                <td>{abc.debt.debtName}</td>
                                <td>{abc.debt.price}</td>
                                <td>{abc.debt.kz}</td>
                                <td>
                                    <ButtonToolbar>
                                    <Button>
                                        Güncelle
                                    </Button>

                                    <Button className="ml-2" variant="danger">
                                        Sil
                                    </Button>
                                        {/* <EditDebt
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
                <AddDebt/>
            </div>
        )
    }
    export default Debt ;