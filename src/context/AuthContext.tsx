import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, User as firebaseUser } from "firebase/auth";

interface AuthContextValue {
  user: firebaseUser | null
  signup: (email: string, password: string) => void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<firebaseUser | null>(null)

  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
    //we return the function's promise here, and in the client, where we call `signup`, is where we'll check for errors.
  }

  //this is like an event listener, we only want it to be setup once.
  useEffect(() => {
    //observer from firebase to get info on current signed-in user.
    //fired when the user's signed in state changes.
    //the cb func is passed a user object by firebase
    const unsubscribe = onAuthStateChanged(auth, setUser)

    return unsubscribe;
  }, [])

  const value = {
    user,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
