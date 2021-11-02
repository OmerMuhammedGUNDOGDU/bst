import React, { useState,useEffect } from 'react';
import { Table } from 'react-bootstrap';
import  AddAssetItem  from '../Asset Item/Modal/AddAssetItem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { EditAssetItem } from '../Asset Item/Modal/EditAssetItem';

import firebase from "firebase";
import database from "../firebase/firebase";

const AssetItem = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState([]);
    const getAssetItemData = async () => {
          await database
          .collection("AssetItemTbl")
          .onSnapshot((snapshop) => {
              setValue(
                snapshop.docs.map((doc) => ({
                  id: doc.id,
                  assetItem: doc.data(),
                }))
              );
          }); 
          console.log('assetItem', value);       
      }
    useEffect(() => {
        getAssetItemData();
}, []);

return(
    <div>
        <Table striped bordered hover variant="dark" className='mt-4' size="sm">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Varlık Kalemleri</th>
                    <th>Seçenekler</th>
                </tr>
            </thead>

            <tbody>
                {value.map(mvk =>
                <tr key={mvk.id}>
                    <td>{mvk.id}</td>
                    <td>{mvk.assetItem.assetItemName}</td>
                    <td>
                        <ButtonToolbar>
                            <Button >
                                Güncelle
                            </Button>

                            <Button className="ml-2" variant="danger" >
                                Sil
                            </Button>
                        </ButtonToolbar>
                    </td>
                </tr>
                )}
            </tbody>
        </Table>
        <AddAssetItem/>
        </div>
    )    
}
export default AssetItem;