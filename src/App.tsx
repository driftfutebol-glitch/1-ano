import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Presente from "@/pages/Presente";
import FotoDestaque from "@/pages/FotoDestaque";
import Admin from "@/pages/Admin";
import Roleta from "@/pages/Roleta";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/presente" element={<Presente />} />
        <Route path="/foto-destaque" element={<FotoDestaque />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/roleta/:token" element={<Roleta />} />
        <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
      </Routes>
    </Router>
  );
}
