import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import Home from "./pages/Home";
import Steam from "./pages/Steam";
import SessionGuard from "./component/SessionGuard";

function App() {
  return (
    <div className="bg-[#18181B]">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <SessionGuard>
              <Home />
            </SessionGuard>
          }
        />
        <Route
          path="/steam"
          element={
            <SessionGuard>
              <Steam />
            </SessionGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
