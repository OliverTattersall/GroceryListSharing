import { useState } from 'react';
import { pushItemToList } from '../../api/api';
import { Checkmark } from '../common/Checkmark';
import { GarbageCan } from '../common/GarbageCan';
import { DeleteCross } from '../common/DeleteCross';

export const AddItemRow = ({listIdx, refetch, closeFunction}) => {

    const [item, updateItem] = useState('');
    const [quantity, updateQuantity] = useState('');

    const onChange = (updater)=>(event)=>{
        updater(event.target.value);
    }

    const onSubmit = ()=>{
        pushItemToList(listIdx, item, quantity).then(()=>{
            refetch();
            closeFunction();
        })
    }

    return (
        <div style={{width:'100%'}}>
            <div style={{width:'20%', display:'inline-block'}}>
                <Checkmark onClick={onSubmit} styles={{float:'left'}}/>
                {/* <button onClick={onSubmit} style={{padding:'0'}} >
                    <img src={process.env.PUBLIC_URL + "images/check-mark-symbol.jpg"} style={{width:'30px'}} alt="" />
                </button> */}
                
                {/* <button onClick={closeFunction}>Ca</button> */}
            </div>
            <div className='newRowInput' >
                <label htmlFor="itemForm">Item</label>
                <input className="inputBar" type="text" id="itemForm" onChange={onChange(updateItem)} value={item}/>
            </div>
            <div className='newRowInput' >
                <label htmlFor="quantityForm">Quantity</label>
                <input className="inputBar" type="text" id="quantityForm" onChange={onChange(updateQuantity)} value={quantity}/>
            </div>
            <div style={{ display:'inline-block', marginLeft:'5%' }}>
                <DeleteCross onClick={closeFunction} styles={{float:'right'}}/>
            </div>
            
        </div>
    );
}
