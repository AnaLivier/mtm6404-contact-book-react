import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ContactDetails from './pages/ContactDetails';
import AddContact from './pages/AddContact';
import EditContact from './pages/EditContact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;