import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./routes/signin";
import Signup from "./routes/signup";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
