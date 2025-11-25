import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";

import { TransitionProvider, usePageTransition } from "./transitions/usePageTransition";
import PageTransition from "./transitions/PageTransition";

function AppContent() {
  const { transitionData } = usePageTransition();

  return (
    <>
      <PageTransition data={transitionData} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:abbr" element={<TeamPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <TransitionProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TransitionProvider>
  );
}
