import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Manageauthors from "./components/Manageauthors";
import Managebooks from "./components/Managebooks";
import { Button } from "./components/ui/button";
function App() {
  return (
    <Router> {/* Wrap your Routes inside BrowserRouter */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/manageauthors" element={<Manageauthors />} />
        <Route path="/managebooks" element={<Managebooks />} />
      </Routes>
    </Router>
  
  );

}

export default App;
