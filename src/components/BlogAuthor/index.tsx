import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Link } from "gatsby";

import ProfilePic from "../ProfilePic";

const GitHubLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className="no-underline" href={`https://github.com/${props.name}`}><FaGithub /></a>
  );
};

const TwitterLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className="no-underline" href={`https://twitter.com/${props.name}`}><FaTwitter /></a>
  );
};

const LinkedinLink = (props) => {
  if (!props.name) {
    return null;
  }

  return (
    <a className="no-underline" href={`https://www.linkedin.com/in/${props.name}`}><FaLinkedin /></a>
  );
};

const BlogAuthor = (props) => {
  const author = props.author;
  const identifier = props.identifier;
  const href = `/author/${identifier}`;

  return (
    <div
      style={{
        display: "flex",
        // marginBottom: rhythm(2.5),
      }}
    >
      <ProfilePic identifier={identifier} name={author.name} />
      <p>
        Posted by <Link to={href}>{author.name}</Link>
        {author.summary &&
         <>– {author.summary}</>
        }
        {" "}
        <GitHubLink name={author.github} />
        {" "}
        <TwitterLink name={author.twitter} />
        {" "}
        <LinkedinLink name={author.linkedin} />
      </p>
    </div>
  );
};

export default BlogAuthor;
