import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import AuthorData from '../json/authors.json';
import ArticlePreview from '../components/ArticlePreview';

const BlogPage = ({ data, pageContext }) => {
  const posts = data.allMdx.edges;
  const { previousPageNumber, nextPageNumber } = pageContext;
  const previousPageLink = previousPageNumber === 1 ? '/blog' : `/blog/page/${previousPageNumber}`;

  return (
    <Layout>
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
                            <Link to={previousPageLink} rel='prev'>
                                ← Previous page
                            </Link>
                            )}
                        </li>
                        <li>
                            {nextPageNumber && (
                            <Link to={`/blog/page/${nextPageNumber}`} rel='next'>
                                Next page →
                            </Link>
                            )}
                        </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
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
  query blogPageQuery($skip: Int!, $limit: Int!, $language: String!) {
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
    locales: allLocale(filter: {language: {eq: $language}}) {
        edges {
          node {
            ns
            data
            language
          }
        }
    }
  }
`;
