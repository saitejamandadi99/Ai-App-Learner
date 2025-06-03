import './index.css'
import { useState } from 'react';
import {useNavigate,Link} from 'react-router-dom';
import Cookie from 'js-cookie';
import axios from 'axios';
const Register = () =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading ,setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');
        if(name === '' || email === "" || password === '' || confirmPassword === ''){
            setError('Please provide all the details');
            setLoading(false);
            return;
        }
        if(password !== confirmPassword){
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        try {
            const url = 'http://localhost:5000/api/users/register';
            const response = await axios.post(url, {name, email, password});
            const token = response.data.user.token;
            if(token){
                Cookie.set('token', token, {expires:7});
                setSuccess(response.data.message || 'Registration successful');
                setLoading(false);
                navigate('/mainpage');
            }
            else{
                setError(response.data.message || 'Registration failed');
                setLoading(false);
                return;
            }

        } catch (e) {
            setLoading(false); 
            setSuccess('');
            console.error('Registration error details:', e); 

            if (e.response) {
                setError(e.response.data.message || 'Registration failed. Please check your inputs.');
            } else if (e.request) {
                setError('Cannot connect to the server. Please check your internet connection or try again later.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        }
    }
    return(
        <div>
            <h3>Register App</h3>
            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                <form className="d-flex flex-column w-50" onSubmit={handleSubmit}>
                    <label htmlFor='inputName'>Name</label>
                    <input type="text" id="inputName" value={name} onChange={(e)=>setName(e.target.value)} required />
                    <label htmlFor='inputEmail'>Email</label>
                    <input type="text" id="inputEmail" value ={email} onChange={(e)=>setEmail(e.target.value)} required />
                    <label htmlFor='inputPassword'>Password</label>
                    <input type="password" id="inputPassword" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    <label htmlFor='inputConfirmPassword'>Confirm Password</label>
                    <input type="password" id="inputConfirmPassword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required />
                    <button className="btn btn-primary mt-3" type='submit' disabled={isLoading} >Register</button>
                </form>
                {error && <div className='alert alert-danger mt-3'>{error}</div>}
                {success && <div className='alert alert-success mt-3'>{success}</div>}

                <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/login">Login here</Link>
            </div>
        </div>
    </div>
    )
}

export default Register