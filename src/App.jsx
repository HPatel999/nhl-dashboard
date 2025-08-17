import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TeamPage from "./pages/TeamPage";
import PlayerPage from "./pages/PlayerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team/:abbr" element={<TeamPage />} />
        <Route path="/player/:id" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
