import React from 'react';
import {
  TwitterShareButton,
  XIcon,
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

const ShareButton = (props) => {
  const { location, siteMetadata, post } = props;
  const twitter = [ siteMetadata.social.twitter ];
  const url = siteMetadata.siteUrl + location.pathname;

  const iconSize = 30;
  const iconStyle = {
    paddingRight: '0.3em',
    marginBottom: '0.2em'
  };

  return (
    <>
      <TwitterShareButton aria-label='x' url={url} title={post.title} hashtags={post.tags} related={twitter} style={iconStyle}>
        <XIcon size={iconSize}/>
      </TwitterShareButton>

      <LinkedinShareButton aria-label='linkedin' url={url} title={post.title} source={siteMetadata.siteUrl} style={iconStyle}>
        <LinkedinIcon size={iconSize}/>
      </LinkedinShareButton>

      <FacebookShareButton aria-label='facebook' url={url} style={iconStyle}>
        <FacebookIcon size={iconSize}/>
      </FacebookShareButton>

      <RedditShareButton aria-label='reddit' url={url} title={post.title} style={iconStyle}>
        <RedditIcon size={iconSize}/>
      </RedditShareButton>

      <EmailShareButton aria-label='email' url={url} subject={post.title} style={iconStyle}>
        <EmailIcon size={iconSize}/>
      </EmailShareButton>
    </>
  );
};

export default ShareButton;
