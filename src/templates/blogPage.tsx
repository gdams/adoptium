import React from 'react';
import { graphql } from 'gatsby';
import LocalizedLink from '../components/LocalizedLink';

import Seo from '../components/Seo';
import AuthorData from '../json/authors.json';
import ArticlePreview from '../components/ArticlePreview';

const BlogPage = ({ data, pageContext }) => {
  const posts = data.allMdx.edges;
  const { previousPageNumber, nextPageNumber } = pageContext;
  const previousPageLink = previousPageNumber === 1 ? '/blog' : `/blog/page/${previousPageNumber}`;

  return (
    <section className='py-5 container'>
        <div className='row py-lg-5'>
            <div className='col-lg-9 col-md-9 mx-auto'>
                {posts.map(({ node }) => {
                    const title = node.frontmatter.title;
                    const author = AuthorData[node.frontmatter.author];

                    return (
                        <ArticlePreview
                            key={node.fields.slug}
                            author={author.name}
                            date={node.frontmatter.date}
                            postPath={node.fields.postPath}
                            title={title}
                            description={node.frontmatter.description}
                            identifier={node.frontmatter.author}
                            excerpt={node.excerpt}
                            tags={node.frontmatter.tags}
                        />
                    );
                })}
                <div>
                    <ul
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        listStyle: 'none',
                        padding: 0,
                    }}
                    >
                    <li>
                        {previousPageNumber && (
                        <LocalizedLink to={previousPageLink} rel='prev'>
                            ← Previous page
                        </LocalizedLink>
                        )}
                    </li>
                    <li>
                        {nextPageNumber && (
                        <LocalizedLink to={`/blog/page/${nextPageNumber}`} rel='next'>
                            Next page →
                        </LocalizedLink>
                        )}
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
  );
};

export default BlogPage;

export const Head = ({ pageContext }) => {
  const { currentPageNumber } = pageContext;
  return (
    <Seo
      title={`All posts – Page ${currentPageNumber}`}
    />
  );
};

export const blogPageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: {frontmatter: {date: DESC}}, limit: $limit, skip: $skip) {
      edges {
        node {
          excerpt
          fields {
            slug
            postPath
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            author
            tags
          }
        }
      }
    }
  }
`;
