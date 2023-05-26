import React from 'react';
import { graphql, Slice } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import AuthorData from '../json/authors.json';
import ArticlePreview from '../components/ArticlePreview';


const AuthorPage = ({ data, pageContext }) => {
  const author = AuthorData[pageContext.author];
  const posts = data.allMdx.edges;

  const { previousPageNumber, nextPageNumber } = pageContext;
  const previousPageLink = previousPageNumber === 1 ? `/blog/author/${pageContext.author}` : `/blog/author/${previousPageNumber}`;

  return (
    <Layout>
        <section className='py-5 container'>
            <div className='row py-lg-5'>
                <div className='col-lg-9 col-md-9 mx-auto'>
                    <h1>{author.name}</h1>
                    <Slice alias='authorBio' />

                    <hr className='pb-5'/>

                    {posts.map(({ node }) => {
                        const title = node.frontmatter.title;
                        return (
                        <ArticlePreview
                            key={node.fields.slug}
                            author={author.name}
                            date={node.frontmatter.date}
                            postPath={node.fields.postPath}
                            title={title}
                            description={node.frontmatter.description}
                            identifier={pageContext.author}
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
                            <Link to={`/blog/author/${pageContext.author}/page/${nextPageNumber}`} rel='next'>
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

export default AuthorPage;

export const Head = ({ pageContext }) => {
  const author = AuthorData[pageContext.author];
  const { currentPageNumber } = pageContext;
  return (
    <Seo
      title={currentPageNumber === 1 ? author.name : `${author.name} - Page ${currentPageNumber}`}
      description={author.summary}
    />
  );
};

export const authorPageQuery = graphql`
  query authorPageQuery($author: String!, $skip: Int!, $limit: Int!, $language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {author: {eq: $author}}}
      sort: {frontmatter: {date: DESC}}
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
            postPath
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
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
