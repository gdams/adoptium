import React from 'react';

const GuestPost = ({ children }) => {
  return (
    <p style={{ padding: '0.5em', backgroundColor: '#e3e3e3'}}>
      <em>{children} – Adoptium Team</em>
    </p>
  );
};

export default GuestPost;
