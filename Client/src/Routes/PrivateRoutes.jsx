import { Navigate } from "react-router-dom";
import { useAuth } from '../firebaseauth/AuthContext';

export default function PrivateRoutes({ children }) {
   const {user, loading} = useAuth();
   if(loading) return <p>Loading ... </p>;
   return user ? children : <Navigate to="/Login" replace />
}
