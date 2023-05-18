import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/post-details" element={<PostDetails />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;