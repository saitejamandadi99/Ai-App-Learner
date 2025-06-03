import {Link} from 'react-router-dom'
import './index.css'

const LandingPage = () =>{
    return(
        <div className='landingPage'>
            <h1> Welcome to the ai app learner.. Our AI adapts to your progress, creating unique lessons just for you. Get immediate, easy-to-understand answers to your toughest questions.
            </h1>
            <h3>Intelligent lessons tailored to your needs, delivered instantly.</h3>
            <div className='landingpagebutton'>
                <button type='button' className='btn btn-primary m-2'><Link to='/login' className='landingpagebuttonlink'>Login</Link></button>
                <button type='button' className='btn btn-secondary m-2'><Link to='/register' className='landingpagebuttonlink'>Sign Up</Link> </button>
            </div>
        </div>
    )
}

export default LandingPage