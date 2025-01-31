import "../styles/navbar.css";
import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import AdminNav from './AdminNav';
import UserNav from './UserNav';

function Navbar() {
  const { email } = useContext(UserContext);
  
  // Check if the email is admin or user and render respective navigation bar
  const renderNavBar = () => {
    if (email !== "admin@gmail.com" ) {
      return <UserNav />;
    } else {
      return <AdminNav />;
    }
  }

  return (
    <>
      {renderNavBar()}
    </>
  );
}

export default Navbar;
