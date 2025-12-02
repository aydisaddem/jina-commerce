import Navbar from "./components/navbar/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton.jsx";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ScrollToTopButton />
      <Footer />
            

    </>
  );
}