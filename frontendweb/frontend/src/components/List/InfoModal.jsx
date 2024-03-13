import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem';

export const InfoModal = ({title, owner="test#test", users=["Test 1", "Test 2"], date, show, handleClose, openEditModal}) => {

    const changeToEdit = () => {
        openEditModal();
        handleClose();
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit List Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>List Title: {title}</p>
                <p>Date Created: {date}</p>
                <p>Owner: {owner.name}</p>
                <p>Users: </p>
                <ListGroup>
                    {users.map((user)=>{
                        return <ListGroupItem key={user}>{user}</ListGroupItem>
                    })}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                {openEditModal ? <Button variant='success' onClick={changeToEdit}>Edit</Button> : null}
                
                <Button variant="primary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );

}
