import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Navigate } from "react-router-dom";

const PrivateRouter = ({children}) => {
    const {user, loader}=useContext(AuthContext);
    if(user?.email){
        return children;
    }
    if(loader){
        <div><progress className="progress w-56"></progress></div>
    }
    return (
        <div>
            <Navigate to='/login'/>
        </div>
    );
};

export default PrivateRouter;