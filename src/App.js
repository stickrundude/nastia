import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import './App.css';

function App() {
  return (
    <Router basename="/nastia">  {/* Specify the base path here */}
      <Routes>
        {/* Redirect /nastia to home */}
        <Route path="/nastia" element={<Navigate to="/" />} />

        {/* Other routes */}
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </Router>
  );
}

export default App;
