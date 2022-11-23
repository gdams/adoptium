import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Link } from 'gatsby-plugin-react-i18next';

const Tags = (props) => {

  const tags = props.tags;

  const tagsStyle = {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  };

  const tagStyle = {
    alignItems: 'center',
    backgroundColor: '#dadada',
    borderRadius: '4px',
    color: '#4a4a4a',
    display: 'inline-flex',
    fontSize: '.75rem',
    height: '2em',
    lineHeight: '1.5',
    marginRight: '1em',
    paddingLeft: '.75em',
    paddingRight: '.75em',
    marginBottom: '.75em'
  };

  if (!tags) {
    return null;
  }

  return (
    <div style={tagsStyle}>
      {tags.map(tag => (
        <Link className='light-link no-underline' key={tag} to={`/blog/tags/${tag}`}>
          <span key={tag} style={tagStyle}><FaTag style={{marginRight: '.75em'}}/>{tag}</span>
        </Link>
      ))}
    </div>
  );
};

export default Tags;
