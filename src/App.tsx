import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboardPage/Dashboard";
import InvestPage from "./components/InvestPage/InvestPage";
import PortfolioPage from "./components/portfolioPage/PortfolioPage";
import PropertyLoanDetails from "./components/propertyDetail/PropertyDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='/invest' element={<InvestPage />} />
          <Route path='/portfolio' element={<PortfolioPage />} />
          <Route path='/property-detail' element={<PropertyLoanDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
