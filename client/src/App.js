import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Top from "./pages/Top";
import Login from "./pages/Login";
import Create from "./pages/Create";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/create/:id" element={<Create/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
