import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Sidebar from "./components/SIdebar";
import LandingPage from "./components/LandingPage";
import CoinsPage from "./components/CoinsPage";
import MarketHighlights from "./components/MarketHIghlights";

function AppWrapper() {
  const location = useLocation();
  const showSidebar = location.pathname !== "/";
  return (
    <>
      {showSidebar && <Sidebar />}
      <main className={showSidebar ? "main-content" : ""}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/coins" element={<CoinsPage />} />
          <Route path="/highlights" element={<MarketHighlights />} />
        </Routes>
      </main>
    </>
  );
}
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
