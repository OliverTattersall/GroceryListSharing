// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lists } from './pages/Lists';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element = {<Lists></Lists>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
