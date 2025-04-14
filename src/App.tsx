import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboardPage/Dashboard";
import InvestPage from "./components/InvestPage/InvestPage";
import PortfolioPage from "./components/portfolioPage/PortfolioPage";
import PropertyLoanDetails from "./components/propertyDetail/PropertyDetail";
import Register from "./components/AuthPages/Register";
import Login from "./components/AuthPages/Login";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashBoard from "./components/admin/AdminDashBoard";
import Users from "./components/admin/Users";
import RegistrationRequest from "./components/admin/RegistrationRequest";
import InvestmentOpportunities from "./components/admin/InvestmentOpportunities";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='dashboard' index element={<AdminDashBoard />} />
          <Route path='users' element={<Users />} />
          <Route
            path='registration-request'
            element={<RegistrationRequest />}
          />
          <Route
            path='investment-opportunities'
            element={<InvestmentOpportunities />}
          />
        </Route>
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
