
import React from 'react';
import { useState } from 'react';
import Modal from '../modal/modal';
import Cart from '../cart/cart.jsx';
import { useCart } from '../../components/ContextReducer/ContextReducer.jsx';
import { useNavigate, Link } from 'react-router-dom';
import {useUser} from "../../components/ContextReducer/ContextReducer"


const Navbar = () => {
  const { userEmail, login, logout } = useUser();
  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const items = useCart();

  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin', // Include cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Clear JWT cookie on successful logout
        logout();
        localStorage.removeItem('token');
        navigate("/login") // Redirect to login page
      } else {
        console.error('Logout failed:', response.statusText);
        // Handle logout failure if needed
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error if needed
    }
  };


  const loadCart = () => {
    setCartView(true)
}
  return (
    <div className="navbar bg-base-100">
    <div className="navbar-start">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><Link to="/user">Home</Link></li>
          <li><Link to="/order">
            Order History
            </Link>
            
          </li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li>
            <a className='btn' onClick={handleLogout}>Logout</a>
            
          </li>
        </ul>
      </div>
      <a className="btn btn-ghost text-xl">Digi-Dine</a>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
        <li><Link to="/user">Home</Link></li>
        <li> <Link to="/order"> Order History </Link>      </li>
        <li><Link to="/feedback">Feedback</Link></li>
        <a className='btn' onClick={handleLogout}>Logout</a>
      </ul>
    </div>
    <div className="navbar-end">
      <a className="btn" onClick={loadCart}>Cart</a>
      {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
    </div>
  </div>
  )
};

export default Navbar;
