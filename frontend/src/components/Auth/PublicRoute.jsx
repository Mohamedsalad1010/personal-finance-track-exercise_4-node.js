
import { isAuthenticated } from "@/utils/auth";
import { Navigate } from "react-router";


 const PublicRoute = ({children}) => {
    return !isAuthenticated ? children : <Navigate to='/dashboard' />
}
  
export default  PublicRoute
