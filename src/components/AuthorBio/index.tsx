import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

import ProfilePic from '../ProfilePic';

const GitHubLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='GitHub Profile' href={`https://github.com/${props.name}`}><FaGithub /></a>
  );
};

const TwitterLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='Twitter Profile' href={`https://twitter.com/${props.name}`}><FaTwitter /></a>
  );
};

const LinkedinLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className='no-underline' aria-label='LinkedIn Profile' href={`https://www.linkedin.com/in/${props.name}`}><FaLinkedin /></a>
  );
};


const AuthorBio = (props) => {
  const author = props.author;
  const identifier = props.identifier;

  return (
    <div
        className='pb-2'
        style={{
            display: 'flex',
        }}
    >
      <ProfilePic identifier={identifier} name={author.name} />
      <p>
        {author.summary &&
         <>{author.summary}</>
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

export default AuthorBio;
