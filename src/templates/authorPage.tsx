import React from 'react';
import { graphql } from 'gatsby';

import AuthorBio from '../components/AuthorBio';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import AuthorData from '../json/authors.json';
import ArticlePreview from '../components/ArticlePreview';


const AuthorPage = ({ data, pageContext }) => {
  const author = AuthorData[pageContext.author];
  const posts = data.allMdx.edges;

  return (
    <Layout>
        <section className='py-5 container'>
            <div className='row py-lg-5'>
                <div className='col-lg-9 col-md-9 mx-auto'>
                    <h1>{author.name}</h1>
                    <AuthorBio identifier={pageContext.author} author={author} />

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
                </div>
            </div>
        </section>
    </Layout>
  );

};

export default AuthorPage;

export const Head = ({ pageContext }) => {
  const author = AuthorData[pageContext.author];
  return (
    <Seo
      title={author.name}
      description={author.summary}
    />
  );
};

export const authorPageQuery = graphql`
  query authorPageQuery($author: String!, $limit: Int!, $language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {author: {eq: $author}}}
      sort: {frontmatter: {date: DESC}}
      limit: $limit
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
