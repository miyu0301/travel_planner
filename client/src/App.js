import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Top from "./pages/Top";
import WithAxios from "./pages/WithAxios";
import WithFetch from "./pages/WithFetch";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/axios" element={<WithAxios/>}/>
          <Route path="/fetch" element={<WithFetch/>}/>
          <Route path="/" element={<Top/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create/:id" element={<Create/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
