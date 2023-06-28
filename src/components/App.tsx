import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <AuthProvider>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <Router>
          <Routes>
            <Route path="/signup" element={<SignUp />}/>
            <Route path="/login" element={<SignUp />}/>
            <Route path="/dashboard" element={<SignUp />}/>
            <Route path="/update-profile" element={<SignUp />}/>
          </Routes>
        </Router>
      </Container>
    </AuthProvider>
  )
}

export default App
