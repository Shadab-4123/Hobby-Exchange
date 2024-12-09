// // GroupDetails.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../axiosConfig'; // Use centralized Axios instance
// import { useAuth } from '../context/AuthContext';
// import './GroupDetails.css';
// import ChatRoom from '../components/ChatRoom';  // Import ChatRoom component

// const GroupDetails = () => {
//   const { id } = useParams(); // Group ID
//   const { user } = useAuth();
//   const [group, setGroup] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [newPost, setNewPost] = useState('');
//   const [showChat, setShowChat] = useState(false);  // State to control chat visibility

//   useEffect(() => {
//     const fetchGroup = async () => {
//       try {
//         const res = await axios.get(`/groups/${id}`);
//         setGroup(res.data);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch group details');
//       }
//     };

//     const fetchPosts = async () => {
//       try {
//         const res = await axios.get(`/groups/${id}/posts`);
//         setPosts(res.data);
//       } catch (err) {
//         console.error(err);
//         alert('Failed to fetch posts');
//       }
//     };

//     fetchGroup();
//     fetchPosts();
//   }, [id]);

//   const handleJoin = async () => {
//     if (group.members.some(member => member._id === user._id)) { // Use _id
//       alert('You are already a member of this group!');
//       return; // Prevent joining again
//     }
    
//     try {
//       await axios.post(`/groups/${id}/join`);
//       alert('Joined the group!');
//       setGroup(prevGroup => ({ 
//         ...prevGroup, 
//         members: [...prevGroup.members, { _id: user._id, username: user.username }] 
//       }));
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Failed to join group');
//     }
//   };

//   const handlePost = async (e) => {
//     e.preventDefault();
//     if (!newPost.trim()) {
//       alert('Post content cannot be empty');
//       return;
//     }
//     try {
//       const res = await axios.post(`/groups/${id}/posts`, { content: newPost });
//       setPosts([res.data, ...posts]);
//       setNewPost('');
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || 'Failed to create post');
//     }
//   };

//   const toggleChat = () => {
//     setShowChat(!showChat);  // Toggle chat visibility
//   };

//   if (!group) return <div>Loading...</div>;

//   const isMember = group.members.some(member => member._id === user._id); // Use _id

//   return (
//     <div className="group-details-container">
//       <h2>{group.name}</h2>
//       <p>{group.description}</p>
//       <p className="group-category">Category: {group.category}</p>
//       <p className="group-members">Members: {group.members.length}</p>
//       {!isMember && (
//         <button onClick={handleJoin} className="join-group-button">
//           Join Group
//         </button>
//       )}

//       {/* Button to toggle Chat Room */}
//       {isMember && (
//         <button onClick={toggleChat} className="chat-room-toggle">
//           {showChat ? 'Hide Chat Room' : 'View Group Chat'}
//         </button>
//       )}

//       <h3>Posts</h3>
//       {isMember ? (
//         <form onSubmit={handlePost} className="post-form">
//           <input
//             type="text"
//             placeholder="Write a post..."
//             value={newPost}
//             onChange={(e) => setNewPost(e.target.value)}
//             required
//             className="post-input"
//           />
//           <button type="submit" className="post-button">
//             Post
//           </button>
//         </form>
//       ) : (
//         <p>You must join the group to post.</p>
//       )}

//       <div className="posts-list">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <div key={post._id} className="post-card">
//               <p>
//                 <strong>
//                   {post.authorId ? post.authorId.username : 'Unknown User'}
//                 </strong>
//                 : {post.content}
//               </p>
//               <p className="post-date">
//                 {new Date(post.createdAt).toLocaleString()}
//               </p>
//             </div>
//           ))
//         ) : (
//           <p>No posts yet.</p>
//         )}
//       </div>

//       {/* Display Chat Room if showChat is true */}
//       {showChat && <ChatRoom groupId={id} />}
//     </div>
//   );
// };

// export default GroupDetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig'; // Use centralized Axios instance
import { useAuth } from '../context/AuthContext';
import './GroupDetails.css';
import ChatRoom from '../components/ChatRoom';  // Import ChatRoom component
import EventList from '../components/EventList'; // Import EventList component
import EventForm from '../components/EventForm'; // Import EventForm component for event creation

const GroupDetails = () => {
  const { id } = useParams(); // Group ID
  const { user } = useAuth();
  const [group, setGroup] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [showChat, setShowChat] = useState(false);  // State to control chat visibility
  const [showEventForm, setShowEventForm] = useState(false);  // State to control event form visibility

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await axios.get(`/groups/${id}`);
        setGroup(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch group details');
      }
    };

    const fetchPosts = async () => {
      try {
        const res = await axios.get(`/groups/${id}/posts`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        alert('Failed to fetch posts');
      }
    };

    fetchGroup();
    fetchPosts();
  }, [id]);

  const handleJoin = async () => {
    if (group.members.some(member => member._id === user._id)) { // Use _id
      alert('You are already a member of this group!');
      return; // Prevent joining again
    }
    
    try {
      await axios.post(`/groups/${id}/join`);
      alert('Joined the group!');
      setGroup(prevGroup => ({ 
        ...prevGroup, 
        members: [...prevGroup.members, { _id: user._id, username: user.username }] 
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to join group');
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newPost.trim()) {
      alert('Post content cannot be empty');
      return;
    }
    try {
      const res = await axios.post(`/groups/${id}/posts`, { content: newPost });
      setPosts([res.data, ...posts]);
      setNewPost('');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create post');
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);  // Toggle chat visibility
  };

  const toggleEventForm = () => {
    setShowEventForm(!showEventForm);  // Toggle event creation form visibility
  };

  if (!group) return <div>Loading...</div>;

  const isMember = group.members.some(member => member._id === user._id); // Use _id

  return (
    <div className="group-details-container">
      <h2>{group.name}</h2>
      <p>{group.description}</p>
      <p className="group-category">Category: {group.category}</p>
      <p className="group-members">Members: {group.members.length}</p>
      {!isMember && (
        <button onClick={handleJoin} className="join-group-button">
          Join Group
        </button>
      )}

      {/* Button to toggle Chat Room */}
      {isMember && (
        <button onClick={toggleChat} className="chat-room-toggle">
          {showChat ? 'Hide Chat Room' : 'View Group Chat'}
        </button>
      )}

      {/* Button to toggle Event Form */}
      {isMember && (
        <button onClick={toggleEventForm} className="create-event-button">
          {showEventForm ? 'Cancel Event Creation' : 'Create Event'}
        </button>
      )}

      {/* Show Event Form if toggled */}
      {showEventForm && <EventForm groupId={id} setShowEventForm={setShowEventForm} />}

      <h3>Posts</h3>
      {isMember ? (
        <form onSubmit={handlePost} className="post-form">
          <input
            type="text"
            placeholder="Write a post..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            required
            className="post-input"
          />
          <button type="submit" className="post-button">
            Post
          </button>
        </form>
      ) : (
        <p>You must join the group to post.</p>
      )}

      <div className="posts-list">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              <p>
                <strong>
                  {post.authorId ? post.authorId.username : 'Unknown User'}
                </strong>
                : {post.content}
              </p>
              <p className="post-date">
                {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No posts yet.</p>
        )}
      </div>

      {/* Display Chat Room if showChat is true */}
      {showChat && <ChatRoom groupId={id} />}

      {/* Event List */}
      <h3>Upcoming Events</h3>
      {isMember ? (
        <EventList groupId={id} />
      ) : (
        <p>You must join the group to see events.</p>
      )}
    </div>
  );
};

export default GroupDetails;
