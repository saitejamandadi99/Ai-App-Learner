
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/index.js';

function App() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<h1>Welcome to the Home Page</h1>} />
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<Login />} />
        <Route path = '/mainpage' element = {
          <ProtectedRoutes>
            <h1>Welcome to the main Page</h1>
          </ProtectedRoutes>
          } />
      </Routes>
    </>
  );
}

export default App;
