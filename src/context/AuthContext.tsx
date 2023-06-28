import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, User, UserCredential } from "firebase/auth";

interface AuthContextValue {
  user: User | null
  signup: (email: string, password: string) => Promise<UserCredential>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextValue);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  function signup(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password)
    //we return the function's promise here, and in the client, where we call `signup`, is where we'll check for errors.
  }

  //this is like an event listener, we only want it to be setup once.
  useEffect(() => {
    //observer from firebase to get info on current signed-in user.
    //fired when the user's signed in state changes.
    //the cb func is passed a user object by firebase
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user)
      //just because loading is set to false doesn't mean there was a user. it just means firebased finished it's initial check for one.
      setLoading(false)
    })

    return unsubscribe;
  }, [])

  const value = {
    user,
    signup
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
