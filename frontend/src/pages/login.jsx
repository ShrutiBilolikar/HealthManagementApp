
import React, { useState, useContext } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext'; 

const auth = getAuth(app);

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext); 
  const navigate = useNavigate();

  const loginUser = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((value) => {
        console.log('Success');
        setUser(value.user); 
        navigate('/'); 
      })
      .catch((err) => {
        alert('Invalid credentials');
      });
  };

  return (
    <div className="login-page">
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="email"
      />
      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        placeholder="password"
      />
      <button onClick={loginUser}>Login</button>
      <a href="/signup">Don't have an account?</a>
    </div>
  );
};

export default LoginPage;
