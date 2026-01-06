import { useState, useContext, useEffect } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer"
import '../SignUp/signup.css'
import {createUserandPass} from '../../firebaseauth/fireBaseAuth';
import { useNavigate } from "react-router-dom";


const submitForm = async (e, redirect) => {
    e.preventDefault();
    const formInput = new FormData(e.currentTarget);
    const fullName = formInput.get("name");
    const [firstName, lastName] = fullName.split(' ');

    const email = formInput.get('email');
    const password = formInput.get('password');
    try {
        await createUserandPass({email, firstName, lastName, password});
        redirect("/Home");

    } catch (e) {
        console.error(e);
    }
    
    
}

export default function SignUp() {
    const Navigate = useNavigate();
    return (
      <>
      
         <NavBar />
         <section className="signup-section">
                          
                    <div className='contain-signup'>
                         <div className='dot-1'></div>
                         <div className='dot-2'></div>
                         <div className='dot-3'></div>
                         <div className='dot-4'></div>
                        <h2>Lets Get You Started Pal!</h2>
                            <form method="POST" onSubmit={(e) => submitForm(e, Navigate)} className='form-signup'>
                              <div className='form-group'>
                                    <label htmlFor='name'>Full Name:</label>
                                    <input type='name' id='Rname' name='name'  placeholder='Enter your name' required />                           
                                </div>


                                <div className='form-group'>
                                    <label htmlFor='email'>Email:</label>
                                    <input type='email' id='Remail' name='email'  placeholder='Enter your email' required />                           
                                </div>

                                 <div className='form-group'>
                                    <label htmlFor='number'>Phone Number:</label>
                                    <input type='number' id='Rnumber' name='number'  placeholder='Enter your phone number' required />                           
                                </div>
                                <div className='form-group'>
                                    <label htmlFor='password'>Password:</label>
                                    <input type='password' id='Rpassword' name='password' placeholder='Enter your password' required />    
                                </div>
                                <button type='submit' id="submitSignUp" className='signup-button bg-special cursor-pointer'>Sign Up</button>
                            </form>
                        </div>
            </section>
         <Footer />
      </>
    )
}