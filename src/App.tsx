import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Notes from './pages/Notes';
import Surveys from './pages/Surveys';

function App() {

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/surveys" element={<Surveys />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
