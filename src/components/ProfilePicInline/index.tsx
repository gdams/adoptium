import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const ProfilePicInline = (props) => {
  const data = useStaticQuery(graphql`
    query ProfilePicInlineQuery {
      avatar: allFile(filter: { absolutePath: { regex: "/authors/" } }) {
        edges {
          node {
            name
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width: 30
                height: 30
              )
            }
          }
        }
      }
    }
  `);

  const profilePicImg = data.avatar.edges.find(item => item.node.name === props.identifier);
  if (!profilePicImg) {
    return null;
  }

  return (
    <GatsbyImage
      image={profilePicImg.node.childImageSharp.gatsbyImageData}
      alt={props.name}
      style={{
        marginLeft: '0.5rem',
        marginBottom: 0,
        minWidth: 30,
        borderRadius: '100%',
      }}
      imgStyle={{
        borderRadius: '50%',
      }}
    />
  );
};

export default ProfilePicInline;
