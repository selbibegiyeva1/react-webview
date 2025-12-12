import "./App.css";

import { Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";

import Navbar from "./component/layout/Navbar";
import Home from "./pages/Home";
import Steam from "./pages/Steam";
import Call from "./pages/Call";

import { useCreateSession } from "./hooks/useCreateSession";

function App() {
  const { createSession } = useCreateSession();
  const bootstrapped = useRef(false);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;

    const token = localStorage.getItem("session_token");
    if (token) return;

    createSession();
  }, [createSession]);

  return (
    <div className="bg-[#18181B]">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/steam" element={<Steam />} />
        <Route path="/call" element={<Call />} />
      </Routes>
    </div>
  );
}

export default App;
