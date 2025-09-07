import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MoviesList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import ActorDetail from "./pages/ActorDetail";
import DirectorDetail from "./pages/DirectorDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/actors/:id" element={<ActorDetail />} />
          <Route path="/directors/:id" element={<DirectorDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
