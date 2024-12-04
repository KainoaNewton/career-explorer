import { BrowserRouter as Router } from "react-router-dom";
import Admin from "./pages/Admin";

function AdminApp() {
  return (
    <Router>
      <Admin />
    </Router>
  );
}

export default AdminApp;