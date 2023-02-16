import { useContext, createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/config';
import { 
    GoogleAuthProvider, 
    signInWithPopup,
    signInWithRedirect,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    
    const [user, setUser] = useState({});

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    };


    const googleLogOut = () => {
        signOut(auth);
    };


    useEffect(() => {
        const  unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser);
        });

        return () => {
            unSubscribe()
        };
    }, []);

    return(
        <AuthContext.Provider value = {{ googleSignIn, googleLogOut, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext)
}