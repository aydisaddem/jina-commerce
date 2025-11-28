import "./App.css";
import Authentication from "./components/authentication/Authentication.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
      <div className="App">
      <Navbar />
      <Authentication />
      <Footer />
      <ScrollToTopButton />
    </div>
  
  
  );
}

export default App;
