import React, {  } from 'react';
import  Gain  from '../Gain/Gain'
import  Loss  from '../Loss/Loss'
import  Debt  from '../Debt/Debt'
import  Asset  from '../Asset/Asset'

const Home = () =>  {
    return (
        <div style={{ maxWidth: '100%' }}>
            <div className="mt-5 d-flex justify-content-left">
                <h3>
                    <strong>Aylık Hesap Cetveli</strong> 
                </h3>   
            </div>
            <Gain/>
            <Loss/>
            <Debt/>
            <Asset/>                
        </div>
    )
}
export default Home; 