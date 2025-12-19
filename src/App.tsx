import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./component/layout/Navbar";
import Home from "./pages/Home";
import Steam from "./pages/Steam";
import Item from "./pages/Item";

import SessionGuard from "./component/SessionGuard";
import ScrollToTop from "./component/ScrollToTop";

function App() {
  return (
    <div className="bg-[#18181B]">
      <Navbar />
      <ScrollToTop />
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
        <Route
          path="/item"
          element={
            <SessionGuard>
              <Item />
            </SessionGuard>
          }
        />
        <Route
          path="/item/:groupName"
          element={
            <SessionGuard>
              <Item />
            </SessionGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
