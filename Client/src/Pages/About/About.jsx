import { useState, useContext, useEffect } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer"
import '../About/about.css'
export default function About() {
    return (
      <>
           <NavBar />
           <section className="about-section"> 
                <div className='contain-about'>
                      
                </div>
           </section>
           <Footer />
      </>
    )
}