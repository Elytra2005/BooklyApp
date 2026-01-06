import '../NavBar/NavBar.css'
import "tailwindcss";
import Logo from '../../assets/Bookly.png';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../../firebaseauth/AuthContext';

export default function NavBar() {

    const [clickStatus, isClicked] = useState(false);
    const {user, loading} = useAuth();



    const clickDisplay = () => {
        isClicked(!clickStatus);
    } 
 

    return (
    <>
        <nav className='nav-bar'> 

            <div className="contain-2mobile flex flex-row justify-between items-center">
                    <div className=''>
                        {/* responsive logo: small on mobile, larger on md/lg screens, preserve aspect ratio */}
                        <img src={Logo} alt='logo bookly' className='logo-width flex-shrink-0 sm:w-48 md:w-64 lg:w-80 h-auto block' />
                    </div>

                    <div className='contain-burger'>
                             {!clickStatus ? <FontAwesomeIcon  onClick={clickDisplay} className='burger-menue' icon={faBars} /> : <FontAwesomeIcon  onClick={clickDisplay} className='burger-menue' icon={faXmark} />}   
                    </div>
            </div>
        


            
            <div className='contain-link'>
                <Link to="/Home">Home</Link>   
                <Link to="/About">About</Link>
               {user ? null : <Link to="/Login">Login</Link>} 
               {user ? null : <Link to="/SignUp">SignUp</Link> } 
               {user ? <Link to='/Logout'>Logout</Link> : null}
            </div>

    

        <div className="contain-mobile">
    
        

                <div className={clickStatus ? 'contain-link-mobile' : 'contain-link-mobile hide'}> 
                        <Link className='url-link' to="/Home">Home</Link>
                        <Link className='url-link' to="/About">About</Link>
                        <Link className='url-link' to="/Login">Login</Link>
                        <Link className='url-link' to="/SignUp">SignUp</Link>
                    </div>
        </div>

        </nav>

    </>
       
    )
}