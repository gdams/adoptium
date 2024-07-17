/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

import path from 'path'
import adapter from 'gatsby-adapter-netlify'
import locales from './locales/i18n'

import type { GatsbyConfig } from 'gatsby'
import type { MDXPage, AsciidocPage } from './src/types'

interface LocalSearchNormalizerArgs {
  data: {
    allAsciidoc: {
      edges: Array<{ node: AsciidocPage }>;
    };
  };
}

type SiteMetadata = GatsbyConfig['siteMetadata'] & {
    siteUrl: string;
};

interface AllMdxQueryResult {
  allMdx: MDXPage;
  site: {
    siteMetadata: SiteMetadata;
  }
}

const config: GatsbyConfig = {
  adapter: adapter(),
  siteMetadata: {
    title: 'Adoptium',
    description: 'Eclipse Adoptium provides prebuilt OpenJDK binaries ...',
    author: 'Eclipse Adoptium',
    siteUrl: 'https://adoptium.net',
    social: {
      twitter: 'Adoptium'
    }
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'asciidoc-pages',
        path: path.join(__dirname, 'content/asciidoc-pages'),
        ignore: ['**/*.md', '**/_partials/**']
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'blog',
        path: path.join(__dirname, 'content/blog')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: path.join(__dirname, 'static/images/authors')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'locale',
        path: path.join(__dirname, 'locales'),
        ignore: ['**/*.md', 'i18n.js']
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: Object.keys(locales),
        defaultLanguage: 'en',
        i18nextOptions: {
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['u', 'a']
        },
        pages: [
          {
            matchPath: '/:lang?/docs/:uid',
            getLanguageFromPath: true
          },
          {
            matchPath: '/:lang?/temurin/commercial-support/',
            getLanguageFromPath: true
          },
          {
            matchPath: '/:lang?/about/',
            getLanguageFromPath: true
          },
          {
            matchPath: '/:lang?/installation/:uid',
            getLanguageFromPath: true
          }
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }: { query: AllMdxQueryResult }) => {
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.postPath,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.postPath
                })
              })
            },
            query: `
              {
                allMdx(sort: {frontmatter: {date: DESC}}, limit: 100) {
                  totalCount
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
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Adoptium Blog',
            match: undefined
          }
        ]
      }
    },
    {
      resolve: 'gatsby-transformer-asciidoc',
      options: {
        safe: 'server'
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md'],
        mdxOptions: {
          remarkPlugins: [
            // Add GitHub Flavored Markdown (GFM) support
            require('remark-gfm')
          ]
        },
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 720
            }
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [
          'G-9HHPS5RX9D' // Adoptium project tag
        ],
        gtagConfig: {
          anonymize_ip: true // GDPR
        },
        pluginConfig: {
          head: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5WLCZXC', // Eclipse Foundation tag
        includeInDevelopment: true
      }
    },
    {
      resolve: 'gatsby-plugin-local-search',
      options: {
        name: 'docs',
        engine: 'flexsearch',
        query: `
          {
            allAsciidoc {
              edges {
                node {
                  id
                  document {
                    title
                  }
                  fields {
                    slug
                  }
                  html
                }
              }
            }
          }
        `,
        index: ['title', 'body'],
        store: ['id', 'path', 'title'],
        normalizer: ({ data }: LocalSearchNormalizerArgs) =>
          data.allAsciidoc.edges.map((result) => ({
            id: result.node.id,
            path: result.node.fields.slug,
            title: result.node.document.title,
            body: result.node.html
          }))
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          'gatsby-remark-code-titles'
        ]
      }
    },
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: path.join(__dirname, 'src/images/')
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'src/images/')
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          precision: 6
        },
        cssLoaderOptions: {
          modules: {
            namedExport: false,
            exportLocalsConvention: 'camelCaseOnly'
          }
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eclipse Adoptium',
        short_name: 'adoptium',
        start_url: '/',
        background_color: '#14003C',
        theme_color: '#14003C',
        display: 'standalone',
        icon: 'src/images/adoptium-icon.png' // This path is relative to the root of the site.
      }
    }
  ]
}

export default config
