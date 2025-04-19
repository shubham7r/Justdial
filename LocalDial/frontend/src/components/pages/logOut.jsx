import React from 'react';
import { IoIosLogOut } from "react-icons/io";

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    alert('Logged out successfully!');
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout} className="logout-button mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:text-orange-200 transition duration-300 no-underline flex items-center">
      <IoIosLogOut />  Logout
    </button>
  );
};

export default LogoutButton;
