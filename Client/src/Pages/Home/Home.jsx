import { useState, useContext, useEffect } from "react"
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer"
import Book from "../../Components/BookMain/Book"
import "tailwindcss";

export default function Home() {
    return (
      <div className="contain">
            <NavBar />
            <Book />
            <Footer />
      </div>

    )
}