
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoutes/index.js';
import HistoryPage from './pages/History'
function App() {
  return (
    <>
    <title>AI Learner</title>
      <Routes>
        <Route exact path = '/' element = {<LandingPage />} />
        <Route exact path = '/register' element = {<Register />} />
        <Route exact path = '/login' element = {<Login />} />
        <Route exact path = '/mainpage' element = {<ProtectedRoutes><MainPage /></ProtectedRoutes>} />
        <Route exact path = '/history' element = {<ProtectedRoutes><HistoryPage /> </ProtectedRoutes>} />
      </Routes>
    </>
  );
}

export default App;
