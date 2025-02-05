import React from "react";
import Header from "./Components/Header";
import Nav from "./Components/LandingPageNavigation";
import Content from "./Components/Contentland";
import Footer from "./Components/Footer.tsx";

function App() {
  return (
    <React.Fragment>
      <Header />
      <Nav />
      <Content />
      <Footer />
    </React.Fragment>
  );
}

export default App;
