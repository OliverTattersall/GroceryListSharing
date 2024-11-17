// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lists } from './pages/Lists';
import { LoginPage } from './pages/LoginPage';

import { createContext, useState } from 'react';
import { Test } from './pages/Test';
import { ProfilePage } from './pages/ProfilePage';
import { getCurrentUser } from './api/firebase';
import { delay } from './api/util';

export const UserContext = createContext(null)

// TODO: Replace the following with your app's Firebase project configuration
// const firebaseConfig = {
//   //...
// };

// const app = initializeApp(firebaseConfig);

function App() {
  const [currentUser, updateCurrentUser] = useState();
  console.log('app');

  const refreshUser = async () => {
    getCurrentUser().then((res) => {
      updateCurrentUser(res);
    })
  }

  // getCurrentUser().then((res) => {
  //   console.log(res);
  // })
  // getUserInfo().then((res) => {
  //   updateCurrentUser(res);
  // }) // should remove when logging in is made
  return (
    <>
      <UserContext.Provider
        value={{currentUser, updateCurrentUser, refreshUser}}
      >
        <Router>
          <Routes>
            <Route exact path='/' element = {<Lists></Lists>} />
            <Route exact path='/login' element = {<LoginPage/>}/>
            <Route exact path='/profile' element = {<ProfilePage/>}/> 
            <Route exact path='/test' element = {<Test/>}/>
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
