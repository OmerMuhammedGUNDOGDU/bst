import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import AddGainItem from '../Gain Item/Modal/AddGainItem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditGainItem } from '../Gain Item/Modal/EditGainItem';

import firebase from "firebase";
import database from "../firebase/firebase";

const GainItem = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[value, setValue] = useState([]);
    const getGainItemData = async () => {
        await database 
        .collection("GainItemTbl")
        .onSnapshot((snapshop) => {
            setValue(
                snapshop.docs.map((doc) => ({
                    id:doc.id,
                    gainItem:doc.data(),
                }))
            );
        });
        console.log('gainItem',value);
    }
    useEffect(() => {
        getGainItemData();
    }, []); //useEffect'in hangi durumda çalışacağını belirtmiş oluyoruz. İlgili state içerisinde ekleme yapılırken çalışsın ama güncelleme vs yapılırken çalışmasın diye    ,[] özelliği kullanıldı 

    return (
        <div>
            <Table striped bordered hover variant="dark" className='mt-4' size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gelir Kalemleri</th>
                        <th>Seçenekler</th>
                    </tr>
                </thead>

                <tbody>
                    {value.map(dep =>
                        <tr key={dep.id}>
                            <td>{dep.id}</td>
                            <td>{dep.gainItem.gainItemName}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button>
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
                <AddGainItem/>
            </div>
        )    
}
export default GainItem;