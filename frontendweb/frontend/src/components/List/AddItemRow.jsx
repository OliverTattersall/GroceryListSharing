import { useState } from 'react';
import { pushItemToList } from '../../api/api';


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
                <button onClick={onSubmit} style={{padding:'0'}} >
                    <img src={process.env.PUBLIC_URL + "images/check-mark-symbol.jpg"} style={{width:'30px'}} alt="" />
                </button>
                <button onClick={closeFunction}>Ca</button>
            </div>
            <div className='newRowInput' >
                <label htmlFor="itemForm">Item</label>
                <input type="text" id="itemForm" onChange={onChange(updateItem)} value={item}/>
            </div>
            <div className='newRowInput' >
                <label htmlFor="quantityForm">Quantity</label>
                <input type="text" id="quantityForm" onChange={onChange(updateQuantity)} value={quantity}/>
            </div>
            
        </div>
    );
}
