import React, { createContext, useContext, useState } from 'react'
import * as Google from "expo-google-app-auth"
import { 
GoogleAuthProvider,
onAuthStateChanged,
signInWithCredential,
signOut,
} from "@firebase/auth";
import { auth } from "../firebase"

const AuthContext = createContext({})

const config = {
    androidClientId: "716473907866-u91djp14bj54sb58jfmnrlfoajanacb4.apps.googleusercontent.com",
    iosClientId: "716473907866-u9mvqtjkfiudblekl4dr05225qs1lup6.apps.googleusercontent.com",
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);

    const signInWithGoogle = async() => {
        await Google.logInAsync(config).then(async (logInResult) => {
           if(logInResult.type === "success") {
               //login...
               const { idToken, accessToken } = logInResult;
               const credential = GoogleAuthProvider.credential(idToken, accessToken);

               await signInWithCredential(auth, credential);
           }

           return Promise.reject();

           
        }).catch(error => setError(error));
    };

    return (
        <AuthContext.Provider value={{
            user: null,
            signInWithGoogle
        }}>
           {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}


