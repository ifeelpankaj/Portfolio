import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./Components/Header/Menu";
import Home from "./Components/Home/Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { getUser, loadUser } from "./Redux/Actions/UserAction";
import AddProject from "./Components/Admin/AddProject";
import AddSkills from "./Components/Admin/AddSkills";
import AdminLogin from "./Components/Admin/AdminLogin";
import AdminPannel from "./Components/Admin/AdminPannel";
import AddCertificate from "./Components/Admin/AdminCertificate";


function App() {
  const dispatch = useDispatch();
  
  // const user = useSelector((state) => state.user);
  const { isAuthenticated } = useSelector((state) => state.login);
  // console.log(user);

  const [ratio, setRatio] = useState(window.innerWidth / window.innerHeight);
  useEffect(() => {
    const resizeRatio = () => {
      setRatio(window.innerWidth / window.innerHeight);
    };

    window.addEventListener("resize", resizeRatio);

    return () => {
      window.removeEventListener("resize", resizeRatio);
    };
  }, [ratio]);
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/" element={<Home ratio={ratio} />} />
          <Route path="/projects" element={isAuthenticated ? <AddProject/> : <AdminLogin />} />
          <Route path="/skills" element={isAuthenticated ? <AddSkills/>: <AdminLogin />} />
          <Route path="/login" element={isAuthenticated ? <AdminPannel /> : <AdminLogin />} />
          <Route path="/certificate" element={isAuthenticated ? <AddCertificate/> :<AdminLogin />} />

          <Route
              path="/account"
              element={isAuthenticated ? <AdminPannel /> : <AdminLogin />}
            />
        </Routes>
        <Toaster/>
      </Router>
    </>
  );
}

export default App;
