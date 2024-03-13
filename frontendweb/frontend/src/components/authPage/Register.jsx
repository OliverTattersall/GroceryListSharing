import { useState } from "react";


export const Register = () => {
    const [email, updateEmail] = useState(''); 
    const [password, updatePassword] = useState('');
    const [username, updateUsername] = useState('');

    const onChange = (updater) => (event) => {
        updater(event.target.value);
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
      );
}