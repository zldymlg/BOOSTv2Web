import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Nav from "./Components/LandingPageNavigation";
import Content from "./Components/Contentland";
import Footer from "./Components/Footer.tsx";
import SignUp from "./Signup";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<Content />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
}

export default App;
