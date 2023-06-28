import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";

function App() {

  return (
    <AuthProvider>
      <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
        <SignUp />
      </Container>
    </AuthProvider>
  )
}

export default App
