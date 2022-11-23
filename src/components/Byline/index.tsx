import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';
import ProfilePicInline from '../ProfilePicInline';
import './Byline.scss';

const Byline = (props) => {
  const { author, date, identifier } = props;

  const href = `/blog/author/${identifier}`;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        marginTop: '1rem',
        marginBottom: '1rem',
        textDecoration: 'none'
      }}
      className='byline'
    >
      {date} – posted by &nbsp; <Link to={href}>{author}</Link> <ProfilePicInline identifier={identifier} name={author} />
    </div>
  );
};

export default Byline;