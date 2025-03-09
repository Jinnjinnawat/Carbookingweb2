import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import Navbarhome from "./components/Navbarhome";
import Footer from "./components/Footer";
import Home from "./components/home";
import Carousell from "./components/Carousell";
import Login from "./components/Login";
import Register from "./components/Reg";
import AdminPage from "./components/admin";
import Putcar from "./components/putcar"

function AppContent({ user, setUser }) {
  const location = useLocation();

  useEffect(() => {
    // โหลดข้อมูลผู้ใช้จาก localStorage ถ้ามี
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return (
    <>
      <Navbarhome user={user} setUser={setUser} /> {/* ส่ง user ไปที่ Navbar */}
      <Routes>
        <Route path="/" element={<><Carousell /></>} />
        <Route path="/home" element={<Home />} />
        <Route path="/Login" element={<Login setUser={setUser} />} /> {/* ส่ง setUser ไปที่ Login */}
        <Route path="/Reg" element={<Register/>} />
        <Route path="/admin" element={<AdminPage/>} />
        <Route path="/putcar" element={<Putcar/>} />
      </Routes>
      {location.pathname !== "/Login" && <Footer />} {/* ไม่แสดง Footer ในหน้า Login */}
    </>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
