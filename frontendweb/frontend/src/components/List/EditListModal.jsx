import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addUserToList, putListInfo, removeUserFromList} from '../../api/api';
// import { addUserToList, putListInfo, removeUserFromList } from '../../api/noDB';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { UserContext } from '../../App';

export const EditListModal = ({show, handleClose, ogTitle, listId, refetch, users}) => {

    const [title, updateTitle] = useState(ogTitle);
    const [deletedUsers, updateDeletedUsers] = useState([]);
    const [editableUsers, updateEditableUsers] = useState(users);
    const [addUser, updateAddUser] = useState(null);
    const [addedUsers, updateAddedUsers] = useState([])
    const userObject = useContext(UserContext);

    const onChange = (event) => {
        updateTitle(event.target.value);
    }

    useEffect(() => {
        updateEditableUsers([...users]);
    }, [users]);

    const saveChange = async () => {

        for(let i = 0; i < deletedUsers.length; ++i){
            await removeUserFromList(listId, deletedUsers[i]);
        }

        for(let i = 0; i < addedUsers.length; ++i){
            await addUserToList(listId, addedUsers[i]);
        }
        
        await putListInfo(listId, title);
        await refetch();
        updateDeletedUsers([]);
        handleClose();
    }

    const onCancel = () => {
        updateEditableUsers([...users]);
        updateAddedUsers([]);
        handleClose();
    }

    const tempRemoveUser = (user) => () => {
        deletedUsers.push(user);
        updateDeletedUsers([...deletedUsers]);
        updateEditableUsers(editableUsers.filter((val)=>(val!=user)));
        // users = users.filter((val)=>(val!=user));
    }

    const onSelectChange = (event) => {
        updateAddUser(event.target.value);
    }

    const tempAddUser = () => {
        if(!addUser) return;
        addedUsers.push(addUser);
        editableUsers.push(addUser);
        updateAddedUsers([...addedUsers]);
        updateEditableUsers([...editableUsers])
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit List Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row}  className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column>List Title:</Form.Label>
                        <Col md="auto" >
                            <Form.Control type="text"  defaultValue={title } />
                        </Col>
                    </Form.Group>
                </Form>
                <ListGroup> 
                    {editableUsers?.map((user)=>{
                        if(user===userObject.currentUser.id) return null;
                        return (<ListGroupItem key={user}>
                                    {userObject.currentUser.friendMap[user]}
                                    <Button variant="danger" style={{float:'right'}} onClick={tempRemoveUser(user)}>Delete</Button>
                                </ListGroupItem>);
                    })}
                    <ListGroupItem>
                        <div className='addUserSelect'>
                            <Form.Select aria-label="Default select example" onChange={onSelectChange}>
                                <option>Pick A friend</option>
                                {userObject.currentUser.friends.map((friend) => {
                                    return <option key={friend.id} value={friend.id}>{friend.name}</option>
                                })}
                            </Form.Select>
                        </div>
                    
                        <Button variant='success' 
                        style={{float:"right"}}
                        onClick={tempAddUser}
                        >Add User</Button>
                    </ListGroupItem> 
                    {/* Not ADDED YET */}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={saveChange}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}