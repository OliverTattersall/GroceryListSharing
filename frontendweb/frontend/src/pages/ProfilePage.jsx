import Container from "react-bootstrap/esm/Container"
import { NavBurger } from "../components/NavBurger/NavBurger"
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useContext } from "react";
import { UserContext } from "../App";

export const ProfilePage = () => {

    const user = useContext(UserContext).currentUser;
    console.log(user);

    return (
        <>
            <NavBurger />
            <div className="Profilecontainer">
                <h1>Your Profile</h1>
                <Container>
                    <Form>
                        <Form.Group as={Row}  className="mb-3" controlId="formPlaintextEmail">
                            <Form.Label column>Username</Form.Label>
                            <Col md="auto" >
                            <Form.Control plaintext readOnly defaultValue={user?.displayName } />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                            <Form.Label column >Email</Form.Label>
                            <Col  md="auto">
                            <Form.Control plaintext readOnly placeholder={user?.email} />
                            </Col>
                        </Form.Group>
                    </Form>
                    <p>Friends:</p>
                    {user?.friends.map((friend, idx) => {
                        
                        return <>{idx % 3 === 0 ? <br/> : null} <div className="friend">{friend.name}</div></>
                    })}
                    
                    
                </Container>
            </div>
        </>
        
    )
}
