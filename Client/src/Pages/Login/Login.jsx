import '../Login/Login.css'
import 'tailwindcss'
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseauth/fireBaseAuth';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const navigate = useNavigate();

        const redirectLogin = async (e) => {
              e.preventDefault();
              const formdata = new FormData(e.currentTarget);
              const Email = formdata.get('email');
              const Password = formdata.get('password');
              try {
                await signInWithEmailAndPassword(auth, Email, Password);
                navigate("/Home", { replace: true }); 
              } catch (error) {
                alert(error);
              }
            
        }

    return (
        <>
            <NavBar />

                <section className="login-section">
                          
                    <div className='contain-login'>
                         <div className='dot-1'></div>
                         <div className='dot-2'></div>
                         <div className='dot-3'></div>
                         <div className='dot-4'></div>
                        <h2>Welcome Back Pal!</h2>
                            <form className='form-login' onSubmit={redirectLogin} method="POST">
                                <div className='form-group'>
                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' id='email' name='email'  placeholder='Enter your email' required />                           
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password:</label>
                                    <input type='password' id='password' name='password' placeholder='Enter your password' required />    
                                </div>
                                <button  type='submit' className='login-button bg-special cursor-pointer'>Login</button>
                            </form>
                        </div>
                </section>

            <Footer />
        </>
    )
}