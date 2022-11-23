import React from 'react';

const Comments = () => {
  return (
    <p
      style={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        backgroundColor: '#e3e3e3',
        borderRadius: '4px',
        padding: '0.5em',
        marginTop: '1em',
      }}
    >
      <em>Do you have questions or want to discuss this post? Hit us up on the <a href='https://adoptium.slack.com/'>Adoptium Slack workspace</a>!</em>
    </p>
  );
};

export default Comments;
