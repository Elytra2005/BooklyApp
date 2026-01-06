import './App.css'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Pages/Home/Home'
import SignUp from './Pages/SignUp/Signup';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Logout from './pages/Logout/Logout';
import PrivateRoutes from "./Routes/privateroutes";
import { AuthProvider } from './firebaseauth/AuthContext';
import "tailwindcss";
export default function App() {
 
    useEffect(() => {
      // i could make the padding smaller instead of zooming out the body but this works for now
      document.title = "Bookly - Appointment Booking System";
      document.body.style.zoom = "90%";
    }, []);
  

  return (
      <AuthProvider>
          <Router>
            <Routes>
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/About" element={<About />} />
     
              <Route path="/" element={<PrivateRoutes>
                <Navigate to="/Home" replace />
              </PrivateRoutes>} />


              <Route path="/Home" element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }></Route>

              

               <Route path='/Logout' element={<PrivateRoutes>
                    <Logout />
               </PrivateRoutes>}>
               
               </Route>
              <Route path="*" element={<div><h1>404 - Page Not Found</h1></div>} />
            </Routes> 
          </Router>
      
      </AuthProvider>
 )

}

