import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';

function PrivateRoute({ children }) {
    const isAuthenticated = !!localStorage.getItem('loggedInUser'); // Check if user is logged in
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Navigate to="/home" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
        {/* Protect the Home route with PrivateRoute */}
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }/>
      </Routes>
    </div>
  );
}

export default App;
