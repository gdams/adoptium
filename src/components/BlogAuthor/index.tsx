import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link } from 'gatsby';

import ProfilePic from '../ProfilePic';

export const GitHubLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='GitHub Profile' href={`https://github.com/${props.name}`}><FaGithub /></a>
  );
};

export const TwitterLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='Twitter Profile' href={`https://x.com/${props.name}`}><FaXTwitter /></a>
  );
};

export const LinkedinLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='LinkedIn Profile' href={`https://www.linkedin.com/in/${props.name}`}><FaLinkedin /></a>
  );
};

const BlogAuthor = (props) => {
  const author = props.author;
  const identifier = props.identifier;
  const href = `/blog/author/${identifier}`;

  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      <ProfilePic identifier={identifier} name={author.name} />
      <p>
        Posted by <Link to={href}>{author.name}</Link>
        {author.summary &&
         <>– {author.summary}</>
        }
        {' '}
        <GitHubLink name={author.github} />
        {' '}
        <TwitterLink name={author.twitter} />
        {' '}
        <LinkedinLink name={author.linkedin} />
      </p>
    </div>
  );
};

export default BlogAuthor;
