import React from 'react'
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
export default function HomePage() {
    const { user } = useContext(AuthContext);
  return (
    <div>
        <h1>HELLO</h1>
        {user ? (
        // If user is not null, display user's information
        <div>
          <h2>Welcome, {user.displayName || user.email}!</h2>
          <p>Your email is: {user.email}</p>
          <a href='/nearbyhospitals'>Search hospitals</a>
        </div>
      ) : (
        // If user is null, display a message saying they are not logged in
        <p>Please log in to see your profile.</p>
      )}
    
        <p>HIIIIIIIIIIIIIIIII</p>
        <h1></h1>
    </div>
  )
}



