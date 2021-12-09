import { createContext, useState, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth"
import {auth} from "../firebase-config"

export const UserContext = createContext()

export function UserContextProvider(props) {


  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

  const [currentUser, setCurrentUser] = useState();
  const [loadingData, setLoadingData] = useState(true);
  console.log("MAJ", currentUser);
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser)
      setLoadingData(false)
    })

    return unsubscribe;

  }, [])


  // modal
  const [modalState, setModalState] = useState({
    signUpModal: false,
    signInModal: false
  })

  const toggleModals = modal => {
    if(modal === "signIn") {
      setModalState({
        signUpModal: false,
        signInModal: true
      })
    }
    if(modal === "signUp") {
      setModalState({
        signUpModal: true,
        signInModal: false
      })
    }
    if(modal === "close") {
      setModalState({
        signUpModal: false,
        signInModal: false
      })
    }
  }

  return (
    <UserContext.Provider value={{modalState, toggleModals, signUp, currentUser, signIn}}>
      {!loadingData && props.children}
    </UserContext.Provider>
  )
}