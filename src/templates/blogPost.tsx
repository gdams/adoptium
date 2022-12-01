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

export const formatDiv = props => {
  // convert inline code to code blocks
  if (props.dangerouslySetInnerHTML.__html.includes('class="language-text"')) {
    return <code {...props} />
  } else {
    return <div {...props} />;
  }
}

const components = {
  GuestPost,
  blockquote: props => <blockquote style={{ paddingLeft: '1.5rem', borderLeft: '.3rem solid hsla(0,0%,0%,0.9)' }} className='blockquote' {...props} />,
  table: props => <table className='table table-hover' {...props} />,
  thead: props => <thead className='table-dark' {...props} />,
  li: props => <li style={{ marginBottom: '1.5em' }} {...props} />,
  div: formatDiv
};

const BlogPostTemplate = ({ data, pageContext, location, children }) => {
  const post = data.mdx;
  const { previous, next } = pageContext;
  const author = AuthorData[post.frontmatter.author];
  const tags = post.frontmatter.tags;

  return (
    <Layout>
        <section className='py-5 container'>
            <div className='row py-lg-5'>
                <div className='col-lg-9 col-md-9 mx-auto'>
                    <article>
                        <header className='pb-5'>
                        <h1 className='mb-0' style={{fontWeight: '900'}}>{post.frontmatter.title}</h1>
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
                    </div>
                </div>
            </div>
        </section>
    </Layout>
  );
};

export default BlogPostTemplate;

export const Head = ({ data }) => {
  const post = data.mdx;
  let twitterCard = '';

  if (post.frontmatter && post.frontmatter.featuredImage) {
    twitterCard = post.frontmatter.featuredImage.childImageSharp.gatsbyImageData.images.fallback.src;
  }
  return (
    <Seo
      title={post.frontmatter.title}
      description={post.frontmatter.description || post.excerpt}
      twitterCard={twitterCard}
    />
  );
};

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
