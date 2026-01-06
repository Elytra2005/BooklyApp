import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "@/firebaseauth/fireBaseAuth";


export default function Logout () {
    useEffect(() => {
        signOut(auth);
    }, [])

    return <Navigate to="/Login" replace />
    
}