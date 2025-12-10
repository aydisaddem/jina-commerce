import "./styles/App.css";
import Layout from "./layout.jsx";
import { Outlet } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
