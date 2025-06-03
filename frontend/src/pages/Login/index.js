import { useState } from 'react'
import {useNavigate,Link} from 'react-router-dom';
import Cookie from 'js-cookie'
import './index.css'
import axios from 'axios';
const Login = () =>{ 
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setLoading] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true)
        setError('');
        setSuccess('')
        try{
            
        if(email ==='' || password === ''){
            setError('Please provide all the details');
            setLoading(false);
            return;
        }
        const url = 'http://localhost:5000/api/users/login'
        const response = await axios.post(url, {email,password});
        const token = response.data.user.token;
        if(token){
            Cookie.set('token', token, { expires: 7 }); // Set cookie with 7 days expiration
            setSuccess('Login Successful');
            setLoading(false);
            navigate('/');
            
        }
        else{
            setError(response.data.message || "Login failed token not found");
            setLoading(false);
            return;
        }
        }
        catch(e){
            console.error('login error details:', e);
            setLoading(false);
            if (e.response){
                setError(e.response.data.message || 'Login failed. Please check your inputs');
            }
            else if (e.request){
                setError('Cannot connect to the server. Please check your internet connection or try again later.');
            }
            else{
                setError('An unexpected error occurred. Please try again.')
            }

        }
    }

    return(
        <div>
            <h1>Login page</h1>

            <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <form className="d-flex flex-column w-50" onSubmit={handleSubmit}>

                <label htmlFor='emailInput'>Email</label>
                <input type='email' 
                       id = 'emailInput' 
                       value={email} 
                       onChange={(e)=>setEmail(e.target.value)} 
                       required />
                       
                <label htmlFor='passwordInput' >Password</label>
                <input type='password' 
                       id ='passwordInput' 
                       value={password} 
                       onChange={(e)=>setPassword(e.target.value)} 
                       required  />

                <button className='btn btn-primary mt-3' type='submit' disabled={isLoading}>{isLoading?'Loggin in ...':'Login'}</button> 
            </form>
            {error && <div className='alert alert-danger mt-3 text-center'>{error}</div>}
            {success && <div className='alert alert-success mt-3 text-center'>{success}</div>}
                
            <div className="text-center mt-3">
              <span>Don't have an account? </span>
              <Link to="/register">Register here</Link>
            </div>
        </div>
        </div>
    )
}

export default Login