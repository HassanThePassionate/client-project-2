import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboardPage/Dashboard";
import InvestPage from "./components/InvestPage/InvestPage";
import PortfolioPage from "./components/portfolioPage/PortfolioPage";
import PropertyLoanDetails from "./components/propertyDetail/PropertyDetail";
import Register from "./components/AuthPages/Register";
import Login from "./components/AuthPages/Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Jab user root path (/) pe aaye, Register dikhe */}
        <Route path='/' element={<Register />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        {/* Baaki layout ke andar wale pages */}
        <Route path='/dashboard' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='invest' element={<InvestPage />} />
          <Route path='portfolio' element={<PortfolioPage />} />
          <Route path='property-detail' element={<PropertyLoanDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
