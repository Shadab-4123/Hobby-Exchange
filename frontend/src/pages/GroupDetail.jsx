import React from 'react';
import ChatRoom from '../components/ChatRoom';

const GroupDetail = ({ groupId }) => {
  return (
    <div className="group-detail">
      <h2>Group Details</h2>
      {/* Add your group details here */}
      <ChatRoom groupId={groupId} />
    </div>
  );
};

export default GroupDetail;
