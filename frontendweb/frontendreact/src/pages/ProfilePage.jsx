import Container from "react-bootstrap/esm/Container"
import { NavBurger } from "../components/NavBurger/NavBurger"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useContext, useState } from "react";
import { UserContext } from "../App";
import Button from "react-bootstrap/esm/Button";
import { addFriend, changeDisplayName, changeEmail, removeFriend, verifyEmail } from "../api/api";
import { DeleteCross } from "../components/common/DeleteCross";
import { useCheckAuth } from "../hooks/useCheckAuth";


export const ProfilePage = () => {

    const [editablePage, updateEditablePage] = useState(false);
    const [editAddNewFriend, updateEditAddNewFriend] = useState('');
    const userObject = useContext(UserContext);
    const user = useContext(UserContext).currentUser;
    useCheckAuth(user, userObject); 
    const [editableEmail, updateEditableEmail] = useState(user?.email);
    const [editableUsername, updateEditableUsername] = useState(user?.displayName);

    const onChange = (e) => {
        updateEditAddNewFriend(e.target.value);
    }

    const onInputChange = (stateUpdater) => (e) => {
        stateUpdater(e.target.value);
    }

    const onAddFriend = async () => {
        await addFriend(user.id, editAddNewFriend, user.displayName);
        userObject.refreshUser();
    }
    
    const removeFriendHandler = (friendId) => async () => {
        await removeFriend(user.id, friendId);
        userObject.refreshUser();
    }

    const saveChanges = async () => {
        if(user.email !== editableEmail){
            await changeEmail(user.id, editableEmail);
        }
        if(user.displayName !== editableUsername){
            await changeDisplayName(user.id, editableUsername);
        }
        updateEditablePage(false);
    }

    const updatePageState = (state) => () => {
        updateEditableEmail(user?.email);
        updateEditableUsername(user?.displayName);
        updateEditablePage(state);
    }

    const handleVerifyEmail = async () => {
        await verifyEmail();
        alert("An email has been sent. If it doesn't appear check spam or try again. Once verified Refresh page. You may need to sign out and log back in. ")
    }

    return (
        <>
            <NavBurger />
            <div className="Profilecontainer">
                <h1>Your Profile</h1>
                <Container>
                    <Form>
                        <Form.Group as={Row}  className="mb-3" controlId="formPlaintext">
                            <Form.Label column>Username: </Form.Label>
                            <Col md="auto" >
                                <Form.Control 
                                    {...(!editablePage ? {readOnly : true, plaintext: true} : {})} 
                                    placeholder={user?.displayName } 
                                    value={editableUsername}
                                    onChange={onInputChange(updateEditableUsername)}
                                    />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column >Email: </Form.Label>
                            <Col >
                                <Form.Control 
                                    {...(!editablePage ? {readOnly : true, plaintext: true} : {})} 
                                    placeholder={user?.email} 
                                    value={editableEmail}
                                    onChange={onInputChange(updateEditableEmail)}
                                    />
                                    {user && !user?.emailVerified ? 
                                        <Button variant="danger" onClick={handleVerifyEmail}>Email Not Verified. Please Verify To access rest of page</Button> 
                                        : null}
                            </Col>
                            
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextId">
                            <Form.Label column >Id: </Form.Label>
                            <Col  md="auto">
                                <Form.Control plaintext readOnly placeholder={user?.id} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <p>Friends:</p>
                    {user?.friends.map((friend, idx) => {
                        
                        return <>{idx % 3 === 0 && idx !== 0? <br/> : null} <div className="friend">
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
                        user?.emailVerified ? <Button onClick={updatePageState(true)} >Edit Profile</Button> : null 
                        : 
                        <div style={{marginTop:"10px"}}>
                            <Button onClick={updatePageState(false)}>Stop Editing</Button>
                            <Button variant='success' style={{float:'right'}} onClick={saveChanges}>Save Changes</Button>
                        </div>}
                </Container>
            </div>
        </>
        
    )
}
