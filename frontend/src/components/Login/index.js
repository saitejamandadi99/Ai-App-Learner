import { useState,useNavigate } from 'react'
import './index.css'
import axios from 'axios';
const Login = () =>{ 
    const [error, setError] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState('')
    const [isLoading, setLoading] = useState(false)
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
            const navigate = useNavigate();
            localStorage.setItem('token',token)
            setSuccess('Login Successful');
            setLoading(false);
            navigate('/');
            
        }
        else{
            setError('Login Failed:',response.data.message);
            setLoading(false);
            return;
        }
        }
        catch(e){
            setError(e)
        }
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
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
                {error &&<p className='text-red-500 mt-2'>{error}</p>}
                {success && <p className='text-green-500 mt-2'>{success}</p>} 
            </form>
        </div>
    )
}

export default Login