// src/app/homepage/page.jsx
"use client";
import Sidebar from '../../components/sidebar/sidebar';
import Footer from '../../components/footer/footer';
import Button from '../../components/button/button';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const userCookie = getCookie('access_token');
    setUser(userCookie);

    console.log(userCookie)
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>User: {user}</p>
    </div>
  );
}