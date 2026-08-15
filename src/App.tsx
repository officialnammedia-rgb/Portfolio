import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/Home";
import { ClientDeliveries } from "./pages/ClientDeliveries";
import { ComingSoon } from "./pages/ComingSoon";
import { Inquiry } from "./pages/Inquiry";
import {
  initializeGoogleAnalytics,
  trackPageView,
} from "./lib/analytics";

// Scroll to top on route change, or to a hash target when one is present.
const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const AnalyticsManager = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    initializeGoogleAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
};

function App() {
  return (
    <>
      <ScrollManager />
      <AnalyticsManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<ClientDeliveries />} />
        <Route path="/inquiry" element={<Inquiry />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
      </Routes>
    </>
  );
}

export default App;
