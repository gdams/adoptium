import React from 'react';
import { FaTag } from 'react-icons/fa';
import { Link } from 'gatsby-plugin-react-i18next';

const Tags = (props) => {

  const tags = props.tags;

  if (!tags) {
    return null;
  }

  return (
    <>
      {tags.map(tag => (
        <Link className='badge bg-secondary text-dark m-2' key={tag} to={`/blog/tags/${tag}`}>
          <FaTag style={{marginRight: '.75em'}}/>{tag}
        </Link>
      ))}
    </>
  );
};

export default Tags;
