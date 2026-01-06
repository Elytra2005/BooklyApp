import '../Footer/Footer.css'
import 'tailwindcss'
import { Link } from 'react-router-dom';
import FooterLogo from '../../assets/Bookly.png';
export default function Footer() {

  const date = new Date();
  const year = date.getFullYear();

    return (
      <>

      <footer className='footer-main'>
          <div className='footer-content'>

             <div className='content-main'>
                <img src={FooterLogo} alt='logo bookly' className='logo-width logo-mobile-footer' />
                <p>Book your appointment directly with bookly. <br /> The fastest secure booking system that makes booking appointments easy.</p>
             </div>

              <div className='content-main contain-link-footer'>
                <h2 className='font-bold'>Quick Links</h2>
                <Link to="/Home">Home</Link>
                <Link to="/About">About</Link>
                <Link to="/Login">Login</Link>
                <Link to="/SignUp">SignUp</Link>
              </div>

              <div className='content-main'>
                <h2 className='font-bold'>Contact Us</h2>
                <p>Email: support@bookly.com</p>      
                <p>Phone: (123) 456-7890</p>  
                {/*<!-- fake address obv --> */}
                <p>Address: 123 Book St, Reading, PA 19601</p>
              </div>
          </div>
      </footer>
      
      <section className='bottom-bar'>
            <p>© {year} Bookly. All rights reserved.</p>
      </section>

      </>

    )
  }


