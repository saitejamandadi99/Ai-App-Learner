
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
    <>
      <h1>Welcome to the app</h1>
      <Routes>
        <Route path = '/register' element = {<Register />} />
        <Route path = '/login' element = {<Login />} />
      </Routes>
    </>
  );
}

export default App;
