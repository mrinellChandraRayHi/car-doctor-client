import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";

export const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const [user, setUser]=useState(null);
    const [loader, setLoader]=useState(true);
    // createUser
    const createUser=(email, password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // signIn
    const signIn=(email, password)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // signOut
    const signOUT=()=>{
        setLoader(true);
        return signOut(auth);
    }
    // observing
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth, (currentUser)=>{
            setLoader(false);
            setUser(currentUser);
            console.log('observing', currentUser);
        });
        return(()=>{
            unsubscribe()
        })
    },[])
    const authInfo={
        user,
        loader,
        createUser,
        signIn,
        signOUT
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;