import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Top from "./pages/Top";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";
import UserContextProvider from "./context/UserContextProvider";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/" element={<Top/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/create/:id" element={<Create/>}/>
            </Routes>    
            <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
