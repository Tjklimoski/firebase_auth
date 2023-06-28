import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Update from "./Update";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

function App() {

  return (
    <AuthProvider>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />

            {/* User must be logged in to access following routes: */}
            <Route element={<ProtectedRoutes/>}>
              <Route index element={<Dashboard />}/>
              <Route path="/update-profile" element={<Update />}/>
            </Route>

          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  )
}

export default App
