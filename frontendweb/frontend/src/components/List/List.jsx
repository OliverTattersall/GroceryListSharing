import Accordion from 'react-bootstrap/Accordion';
import ListGroup from 'react-bootstrap/ListGroup';
import './List.css'
import { useContext, useState } from 'react';
import { GroceryItem } from './groceryItem';
import { AddItemRow } from './AddItemRow';
import { EditListModal } from './EditListModal';
import { InfoModal } from './InfoModal';
import { UserContext } from '../../App';
import { deleteItemsFromList, deleteList } from '../../api/api';

export const List = ({id, items, title, owner, people, refetch}) => {
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedValues, updateCheckedValues] = useState(new Array(items.length).fill(false));
    const [addNewItem, updateAddNewItem] = useState(false);
    const [showEditModal, updateShowEditModal] = useState(false);
    const [showInfoModal, updateShowInfoModal] = useState(false);

    const user = useContext(UserContext).currentUser;

    const onCheckChange = (itemId) => (val) => {
        setCheckedCount(checkedCount - 1 + 2 * val);
        checkedValues[itemId] = val;
        updateCheckedValues([...checkedValues]);
    }

    const onDelete = () => {
        let runDelete = window.confirm('Delete This list');
        if(runDelete){
            deleteList(id).then(()=>{
                refetch();
            })
        }
    }

    const onClear = () => {
        let itemIds = [];
        for(let i = 0; i < items.length; ++i){
            if(checkedValues[i]){
                itemIds.push(i);
            }
        }
        const deletePromise = deleteItemsFromList(id, itemIds);
        deletePromise.then(()=>{
            updateCheckedValues(checkedValues.filter((val)=>!(val)));
            refetch();
            // console.log(checkedValues.filter((val)=>!(val)))
            
        })
    }
    
    return (
        <>
        <div className='groceryList'>
            <Accordion >
                <Accordion.Item eventKey='0'>
                    <Accordion.Header>{title}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup>
                            <ListGroup.Item >
                                <div className='groceryItem'>Gotten</div> 
                                <div className='groceryItem'>Item</div> 
                                <div className="groceryItem" style={{marginLeft: '5%'}}>Quantity</div>
                                
                            </ListGroup.Item>

                            {items.map((item, itemIdx) => {
                                if(!item) return null;
                                return <ListGroup.Item>
                                        <GroceryItem checkedProp={checkedValues[itemIdx]} quantity={item.quantity} onCheckChange={onCheckChange(itemIdx)} item={item.item} />
                                    </ListGroup.Item>
                            })}
                            {addNewItem ? <AddItemRow listIdx={id} refetch={refetch} closeFunction={()=>{updateAddNewItem(false)}}></AddItemRow> : null }
                            
                            <ListGroup.Item>
                                <div>
                                    <button onClick={()=>{updateAddNewItem(true)}}>Add Another Item</button>
                                    <button onClick={onClear} style={{float: 'right'}} disabled={!checkedCount}>Clear checked items </button>
                                    {/* <p style={{float:'right'}}>{checkedCount}</p> */}
                                </div>
                            </ListGroup.Item>
                            <div>
                                <div style={{width:'fit-content', float:'right'}}>
                                    <button onClick={() => {updateShowInfoModal(true)}}>Info</button>
                                    <button onClick={() => {updateShowEditModal(true)}}
                                    disabled={owner?.id !== user?.id}
                                    >Edit</button>
                                    <button onClick={onDelete}
                                    disabled={owner?.id !== user?.id}>Del</button>
                                </div>
                            </div>
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            
        </div>
        <EditListModal
            key={'editModal'+id} 
            show={showEditModal} 
            handleClose={()=>{updateShowEditModal(false)}}
            ogTitle={title}
            listId={id}
            users={people}
            refetch={refetch}
        />
        <InfoModal
            key={'infoModal'+id}
            show={showInfoModal}
            handleClose={()=>{updateShowInfoModal(false)}}
            title={title}
            owner={owner}
            users={people}
            date = {(new Date()).toLocaleDateString()}
            {...(owner?.id === user?.id ? {openEditModal: ()=>{updateShowEditModal(true)}} : {})}
            // EditListModal = {(owner === useContext(UserContext).currentUser ? ()=>{updateShowEditModal(true)} : null)}
        />
        </>
    );
}
