
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/index.js';

function App() {
  return (
    <>
      <Routes>
        <Route exact path = '/' element = {<LandingPage />} />
        <Route exact path = '/register' element = {<Register />} />
        <Route exact path = '/login' element = {<Login />} />
        <Route exact path = '/mainpage' element = {
          <ProtectedRoutes>
            <h1>Welcome to the main Page</h1>
          </ProtectedRoutes>
          } />
      </Routes>
    </>
  );
}

export default App;
