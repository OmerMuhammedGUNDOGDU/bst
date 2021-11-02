import React, {useState} from 'react';
import  GainItem  from '../Gain Item/GainItem';
import  LossItem  from '../Loss Item/LossItem';
import  DebtItem  from '../Debt Item/DebtItem';
import  AssetItem  from '../Asset Item/AssetItem';

const DataItem = () => {
    return (
        <div style={{ maxWidth: '100%' }}>
            <div className="mt-5 d-flex justify-content-left"> 
                <h3>
                    <strong>Veri Kalemleri</strong>
                </h3>
            </div>
            
            <GainItem/>
            <LossItem/>
            <DebtItem/>
            <AssetItem/>                
        </div>
    )
}
export default DataItem;