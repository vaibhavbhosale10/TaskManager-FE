import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./components/homepage/homepage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import DataFetch from "./components/dataFetching/dataFetch";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={Homepage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/data" Component={DataFetch} />
      </Routes>
    </div>
  );
}

export default App;
