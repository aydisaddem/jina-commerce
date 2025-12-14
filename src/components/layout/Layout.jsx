import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import ScrollToTopButton from "./ScrollToTopButton.jsx";
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
