import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import Top from "./pages/Top";
import Create from "./pages/Create";
import Update from "./pages/Update";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top/>}/>
          <Route path="/create/:id" element={<Create/>}/>
          <Route path="/update/:id" element={<Update/>}/>
        </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
