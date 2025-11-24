import "./App.css";
import Authentication from "./components/Authentication.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar />
      <Authentication />
      <Footer />
      <ScrollToTopButton />
    </div>
    </BrowserRouter>
  
  );
}

export default App;
