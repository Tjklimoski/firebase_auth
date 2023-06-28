import { ReactNode, createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, User, UserCredential, updateEmail, updatePassword } from "firebase/auth";

interface AuthContextValue {
  user: User | null
  signup: (email: string, password: string) => Promise<UserCredential>
  login: (email: string, password: string) => Promise<UserCredential>
  logout: () => Promise<void>
  reset: (email: string) => Promise<void>
  updateUserEmail: (email: string) => Promise<void>
  updateUserPassword: (password: string) => Promise<void>
  updateUserEmailAndPassword: (email: string, password: string) => Promise<void>
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

  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }

  function reset(email: string) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateUserEmail(email: string) {
    if (user == null) return Promise.reject(new Error('user not found'));
    return updateEmail(user, email)
  }

  function updateUserPassword(password: string) {
    if (user == null) return Promise.reject(new Error('user not found'));
    return updatePassword(user, password)
  }

  async function updateUserEmailAndPassword(email: string, password: string) {
    try {
      await updateUserEmail(email)
      await updateUserPassword(password);
    } catch {
      return Promise.reject()
    } finally {
      return Promise.resolve()
    }
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
    signup,
    login,
    logout,
    reset,
    updateUserEmail,
    updateUserPassword,
    updateUserEmailAndPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
