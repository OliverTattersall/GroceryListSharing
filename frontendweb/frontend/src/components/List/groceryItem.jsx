import { Checkbox } from '../checkbox/checkbox';
import './List.css'


export const GroceryItem = ({checkedProp, item, quantity, onCheckChange}) => {

    return (<>
        <div className='groceryItem'>
            <Checkbox onChange={onCheckChange} checked = {checkedProp}/>
        </div>
        <div className='groceryItem'>{item}</div> 
        <div className="groceryItem" style={{marginLeft: '5%'}}>{quantity}</div>
    </>);

}