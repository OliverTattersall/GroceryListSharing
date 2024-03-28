import { useContext, useState } from "react";
import { register } from "../../api/api";
import { useNavigate } from "react-router";
import { UserContext } from "../../App";


export const Register = () => {
    const [email, updateEmail] = useState(''); 
    const [password, updatePassword] = useState('');
    const [username, updateUsername] = useState('');
    const userObject = useContext(UserContext); 

    const navigate = useNavigate(); 

    const onChange = (updater) => (event) => {
        updater(event.target.value);
    } 

    const handleRegister = async () => {
      try{
            const user = await register(email, username, password);
        
            if(user){
                userObject.updateCurrentUser(user);
                navigate('/');
            }
      }catch(err){
            console.error(err);
      }
    }

    return (
            <div>
              <h3 className="Auth-form-title">Register</h3>
              <div className="form-group mt-3">
                <label>Name/Username</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="e.g Jane Doe"
                  value={username}
                  onChange={onChange(updateUsername)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  value={email}
                  onChange={onChange(updateEmail)}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Password"
                  value={password}
                  onChange={onChange(updatePassword)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-primary" onClick={handleRegister}>
                  Register
                </button>
              </div>
            </div>
      );
}