import React from 'react';
import { GitHubLink, TwitterLink, LinkedinLink } from '../BlogAuthor';

import ProfilePic from '../ProfilePic';

const AuthorBio = ({ sliceContext }) => {
  const { author, identifier } = sliceContext;

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
