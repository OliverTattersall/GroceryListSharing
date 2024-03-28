import Container from "react-bootstrap/esm/Container"
import { NavBurger } from "../components/NavBurger/NavBurger"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Button from "react-bootstrap/esm/Button";
import { addFriend, removeFriend } from "../api/api";
import { DeleteCross } from "../components/common/DeleteCross";


export const ProfilePage = () => {

    const [editablePage, updateEditablePage] = useState(false);
    const [editAddNewFriend, updateEditAddNewFriend] = useState('');
    const userObject = useContext(UserContext);
    const user = useContext(UserContext).currentUser;
    console.log(user);

    const onChange = (e) => {
        updateEditAddNewFriend(e.target.value);
    }

    const onAddFriend = async () => {
        await addFriend(user.id, editAddNewFriend, user.displayName);
        userObject.refreshUser();
    }
    
    const removeFriendHandler = (friendId) => async () => {
        await removeFriend(user.id, friendId);
        userObject.refreshUser();
    }

    return (
        <>
            <NavBurger />
            <div className="Profilecontainer">
                <h1>Your Profile</h1>
                <Container>
                    <Form>
                        <Form.Group as={Row}  className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column>Username: </Form.Label>
                            <Col md="auto" >
                            <Form.Control {...(!editablePage ? {readOnly : true, plaintext: true} : {})} defaultValue={user?.displayName } />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column >Email: </Form.Label>
                            <Col  md="auto">
                            <Form.Control {...(!editablePage ? {readOnly : true, plaintext: true} : {})} placeholder={user?.email} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column >Id: </Form.Label>
                            <Col  md="auto">
                            <Form.Control plaintext readOnly placeholder={user?.id} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <p>Friends:</p>
                    {user?.friends.map((friend, idx) => {
                        
                        return <>{idx % 3 === 0 ? <br/> : null} <div className="friend">
                            {friend.name}
                            {editablePage ? <DeleteCross onClick={removeFriendHandler(friend.id)}></DeleteCross>
                            : null}
                            
                            </div></>
                    })}
                    <br/>
                    {editablePage ? 
                        <div>
                            <Form.Control 
                            {...(!editablePage ? {readOnly : true, plaintext: true} : {})} 
                            placeholder="Friend Id" 
                            value={editAddNewFriend}
                            onChange={onChange}
                            />
                            <Button variant='success'
                            onClick={onAddFriend}
                            >Add Friend</Button>
                        </div> 
                        : null}
                    
                    {!editablePage ? 
                        <Button onClick={()=>{updateEditablePage(true)}} >Edit</Button> : 
                        <div>
                            <Button onClick={()=>{updateEditablePage(false)}} >Stop Editing</Button>
                        </div>}
                </Container>
            </div>
        </>
        
    )
}
