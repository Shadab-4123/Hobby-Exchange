// // src/components/Navbar.jsx
// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import './Navbar.css';

// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-container container">
//         <Link to="/" className="navbar-brand">
//           Hobby Exchange
//         </Link>
//         <div className="navbar-links">
//           {user ? (
//             <>
//               <Link to="/dashboard" className="navbar-link">
//                 Dashboard
//               </Link>
//               <button onClick={handleLogout} className="navbar-button">
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="navbar-link">
//                 Login
//               </Link>
//               <Link to="/register" className="navbar-link">
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand">
          Hobby Exchange
        </Link>
        <div className="navbar-links">
          <Link to="#" className="navbar-link">
            Contact
          </Link>
          <Link to="#" className="navbar-link">
            About Us
          </Link>
          <Link to="#" className="navbar-link">
            FAQ
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" className="navbar-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="navbar-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">
                Login
              </Link>
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
