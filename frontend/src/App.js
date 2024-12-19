import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import MapView from './components/MapView';
import SignupPage from './pages/Signup';
import PrivateRoute from './PrivateRoute';
import HomePage from './components/HomePage';
import LoginPage from './pages/login';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
function App() {
  const user = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage/>} />
        {/* <Route path="/nearbyhospitals" element={<MapView />} /> */}
        <Route path="/nearbyhospitals" element={(user) ? <MapView /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
