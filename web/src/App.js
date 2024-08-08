import Form from "./Components/Form";
import './global.css';
import './layout.css';
import './Components/components.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import DashboardMain from "./Components/DashboardMain";
import Register from "./Components/Register";
import Employees from "./Components/Employees";
import PrivateRoutes from "./utils/PrivateRoutes";
import DashboardSort from "./Components/DashboardSort";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/register" element={<div className="form-container"><Register /></div>} />
          <Route path="/" element={<Form />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard /> }>
              <Route path="employees" element={<Employees />} />
              <Route path="main" element={<DashboardMain />} />
              <Route path="sort" element={<DashboardSort />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;