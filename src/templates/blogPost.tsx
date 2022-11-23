import React from 'react';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-plugin-react-i18next'
import { MDXProvider } from '@mdx-js/react';

import Layout from '../components/Layout';
import Seo from '../components/Seo';
import BlogAuthor from '../components/BlogAuthor';
import AuthorData from '../json/authors.json';
import GuestPost from '../components/GuestPost';
import Byline from '../components/Byline';
import ShareButton from '../components/Share';
import Tags from '../components/Tags';
import Comments from '../components/Comments';

const components = {
  GuestPost
};

const BlogPostTemplate = ({ data, pageContext, location, children }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;
  const author = AuthorData[post.frontmatter.author];
  const tags = post.frontmatter.tags;

  let twitterCard = '';

  if (post.frontmatter && post.frontmatter.featuredImage) {
    twitterCard = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images.fallback.src;
  }

  return (
    <Layout>
        <Seo
            title={post.frontmatter.title}
            description={post.frontmatter.description || post.excerpt}
            twitterCard={twitterCard}
        />
        <section className='py-5 container'>
            <div className='row py-lg-5'>
                <div className='col-lg-9 col-md-9 mx-auto'>
                    <article>
                        <header className='pb-5'>
                        <h1 className='mb-0'>{post.frontmatter.title}</h1>
                        <Byline date={post.frontmatter.date} author={author.name} identifier={post.frontmatter.author} />
                        <ShareButton location={location} siteMetadata={data.site.siteMetadata} post={post.frontmatter}/>
                        </header>
                        <MDXProvider components={components}>
                        {children}
                        </MDXProvider>
                        <Tags tags={tags}/>
                        <Comments/>
                        <hr className='p-3'/>
                        <footer className='pb-5'>
                        <BlogAuthor identifier={post.frontmatter.author} author={author} />
                        </footer>
                    </article>

                    <nav>
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
                            {next && (
                            <Link to={next.fields.postPath} rel='next'>
                                ← {next.frontmatter.title}
                            </Link>
                            )}
                        </li>
                        <li>
                            {previous && (
                            <Link to={previous.fields.postPath} rel='prev'>
                                {previous.frontmatter.title} →
                            </Link>
                            )}
                        </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $language: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        social {
          twitter
        }
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      body
      frontmatter {
        title
        author
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              layout: FIXED
            )
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
