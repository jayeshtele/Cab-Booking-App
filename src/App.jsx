import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from './components/AppLayout.jsx';
import ThemeSync from './components/ThemeSync.jsx';
import { useDocumentTitle } from './hooks/useDocumentTitle.js';
import BookRide from './pages/BookRide.jsx';
import MyTrips from './pages/MyTrips.jsx';
import Offers from './pages/Offers.jsx';
import Support from './pages/Support.jsx';
import NotFound from './pages/NotFound.jsx';

const pageTitles = {
  '/book': 'Book a Ride',
  '/trips': 'My Trips',
  '/offers': 'Offers',
  '/support': 'Support',
};

function AppTitle() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'Route Not Found';
  useDocumentTitle(`${title} | CabSwift`);
  return null;
}

export default function App() {
  return (
    <>
      <ThemeSync />
      <AppTitle />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/book" replace />} />
          <Route path="book" element={<BookRide />} />
          <Route path="trips" element={<MyTrips />} />
          <Route path="offers" element={<Offers />} />
          <Route path="support" element={<Support />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
