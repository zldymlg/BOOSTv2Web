import React from "react";
import Header from "./Components/Header.tsx";
import LandingNav from "./Components/LandingPageNavigation.tsx";
import Footer from "./Components/Footer.tsx";
import "bootstrap/dist/css/bootstrap.css";

function Login() {
  return (
    <React.Fragment>
      <Header />
      <LandingNav />
      <Footer />
    </React.Fragment>
  );
}
export default Login;
