import Dashboard from './pages/Dashboard';
import CreatePortfolio from './pages/CreatePortfolio';
import Portfolio from './pages/Portfolio';
import Home from './pages/Home';
import LeadCapture from './pages/LeadCapture';
import PortfolioSummary from './pages/PortfolioSummary';
import PackageInquiry from './pages/PackageInquiry';
import CareerAgent from './pages/CareerAgent';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Dashboard": Dashboard,
    "CreatePortfolio": CreatePortfolio,
    "Portfolio": Portfolio,
    "Home": Home,
    "LeadCapture": LeadCapture,
    "PortfolioSummary": PortfolioSummary,
    "PackageInquiry": PackageInquiry,
    "CareerAgent": CareerAgent,
}

export const pagesConfig = {
    mainPage: "Dashboard",
    Pages: PAGES,
    Layout: __Layout,
};