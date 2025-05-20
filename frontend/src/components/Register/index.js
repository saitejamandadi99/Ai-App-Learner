import './index.css'

const Register = () =>{

    return(
        <div>
            <h3>Register App</h3>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <form className="d-flex flex-column w-50">
                    <label>Name</label>
                    <input type="text" id="inputName" required />
                    <label>Email</label>
                    <input type="text" id="inputEmail" required />
                    <label>Password</label>
                    <input type="password" id="inputPassword" required />
                    <label>Confirm Password</label>
                    <input type="password" id="inputConfirmPassword" required />
                    <button className="btn btn-primary mt-3">Submit</button>
                </form>
        </div>
    </div>
    )
}

export default Register