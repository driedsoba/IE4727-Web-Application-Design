import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import MusicPage from './pages/MusicPage';
import JobsPage from './pages/JobsPage';
import PriceUpdatePage from './pages/PriceUpdatePage';
import SalesReportPage from './pages/SalesReportPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/admin/prices" element={<PriceUpdatePage />} />
          <Route path="/admin/reports" element={<SalesReportPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
