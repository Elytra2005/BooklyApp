import '../404/404.css'
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer"
import Logo from '../../assets/Bookly.png';
export default function NotFound() {
    return (
        <>
            <NavBar />
            <section className="error-section">
                <div className='contain-error'>
                    <img src={Logo} alt="Bookly Logo" className='error-logo mb-4'/>
                    <h1>404 Error You are in the wrong page pal!</h1>
                    <button className='bg-special button-error cursor-pointer' onClick={() => {window.location.href = '/Home'}}>Go Back Home</button>
                </div>
            </section>
            <Footer />
        </>

    )
}