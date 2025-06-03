import {Navigate} from 'react-router-dom';
import Cookie from 'js-cookie';

const ProtectedRoutes = ({children}) =>{
   
    const token = Cookie.get('token')
    if(!token){
        return <Navigate to = '/login' replace />  //replace used to prevent going back to the protected route and changes the history stack.
    }
    return children;
}

export default ProtectedRoutes;