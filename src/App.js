import Home from "./pages/Home";
import AddPages from "./pages/Add";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
        <div className="content">
          <div className="card">
            <div className="card-body">
          <Router>
            <Routes>
                <Route path="/"element={<Home/>}/>
                <Route path="/Add"element={<AddPages/>}/>
            </Routes>
          </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

