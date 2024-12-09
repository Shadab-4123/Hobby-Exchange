// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Dashboard from './pages/Dashboard';
// import CreateGroup from './pages/CreateGroup';
// import GroupDetails from './pages/GroupDetails';
// import ChatRoom from './components/ChatRoom';  // Import ChatRoom component
// import { useAuth } from './context/AuthContext';

// const App = () => {
//   const { user } = useAuth();

//   // Protected Route Component
//   const PrivateRoute = ({ children }) => {
//     return user ? children : <Navigate to="/login" />;
//   };

//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute>
//                 <Dashboard />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/create-group"
//             element={
//               <PrivateRoute>
//                 <CreateGroup />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/groups/:id"
//             element={
//               <PrivateRoute>
//                 <GroupDetails />
//               </PrivateRoute>
//             }
//           />
//           {/* Add ChatRoom route under GroupDetails */}
//           <Route
//             path="/groups/:id/chat"
//             element={
//               <PrivateRoute>
//                 <ChatRoom />
//               </PrivateRoute>
//             }
//           />
//           <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
//           <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
//         </Routes>
//       </div>
//       {/* <ToastContainer /> is removed since react-toastify is not used */}
//     </Router>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateGroup from './pages/CreateGroup';
import GroupDetails from './pages/GroupDetails';
import ChatRoom from './components/ChatRoom';  // Import ChatRoom component
import EventDetails from './components/EventDetails'; // Import EventDetails component
import { useAuth } from './context/AuthContext';

const App = () => {
  const { user } = useAuth();

  // Protected Route Component
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-group"
            element={
              <PrivateRoute>
                <CreateGroup />
              </PrivateRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <PrivateRoute>
                <GroupDetails />
              </PrivateRoute>
            }
          />
          {/* Add Event Routes */}
          <Route
            path="/groups/:id/events"
            element={
              <PrivateRoute>
                <GroupDetails />  {/* Could show events list here as part of group details */}
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:eventId"
            element={
              <PrivateRoute>
                <EventDetails /> {/* Show event details */}
              </PrivateRoute>
            }
          />
          <Route
            path="/events/:eventId/participate"
            element={
              <PrivateRoute>
                <EventDetails /> {/* Handle participate functionality */}
              </PrivateRoute>
            }
          />
          {/* Add ChatRoom route under GroupDetails */}
          <Route
            path="/groups/:id/chat"
            element={
              <PrivateRoute>
                <ChatRoom />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
