import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ArticlePreview from '../components/ArticlePreview';
import AuthorData from '../json/authors.json';

const Tags = ({ pageContext, data }) => {
  const tags = data.allMdx.edges;

  return (
    <Layout>
        <section className='py-5 container'>
            <div className='row py-lg-5'>
                <div className='col-lg-9 col-md-9 mx-auto'>
                    <h1>{pageContext.tag}</h1>
                    <hr className='pb-5'/>
                    {tags.map(({ node }) => {
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
                        />
                        );
                    })}
                </div>
            </div>
        </section>
    </Layout>
  );
};


export default Tags;

export const Head = ({ pageContext }) => {
  return (
    <Seo
      title={pageContext.tag}
      description={pageContext.tag}
    />
  );
};

export const tagsPageQuery = graphql`
  query tagsPageQuery($tag: String!, $language: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: {frontmatter: {tags: {eq: $tag}}}
      sort: {frontmatter: {date: DESC}}
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
            author
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
