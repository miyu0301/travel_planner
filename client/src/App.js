import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import React, { useContext } from "react";
import Top from "./pages/Top";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import Footer from "./components/Footer";
import UserContext from "./context/UserContext.jsx";

function App() {
  const { loading } = useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            {!loading && <Route path="/" element={<Top/>}/>}
            <Route path="/register" element={<Register/>}/>
            <Route path="/create/:id" element={<Create/>}/>
          </Routes>    
          <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
