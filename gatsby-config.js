/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

const path = require('path')

module.exports = {
  siteMetadata: {
    title: 'Adoptium',
    description: 'Eclipse Adoptium provides prebuilt OpenJDK binaries from a fully open source set of build scripts and infrastructure. Supported platforms include Linux, macOS, Windows, ARM, Solaris, and AIX.',
    author: 'Eclipse Adoptium',
    siteUrl: 'https://adoptium.net'
  },
  plugins: [
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'asciidoc-pages',
        path: path.join(__dirname, 'src/asciidoc-pages')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, 'locales'),
        name: 'locale'
      }
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'locale',
        languages: ['en', 'en-GB', 'es', 'de', 'zh-CN'],
        defaultLanguage: 'en',
        i18nextOptions: {
          transSupportBasicHtmlNodes: true,
          transKeepBasicHtmlNodesFor: ['u', 'a']
        }
      }
    },
    'gatsby-transformer-asciidoc',
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
        normalizer: ({ data }) =>
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
    'gatsby-plugin-netlify',
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
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-bootstrap-5',
        short_name: 'gb5-starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'standalone',
        icon: 'src/images/adoptium-icon.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-gatsby-cloud'
  ]
}
