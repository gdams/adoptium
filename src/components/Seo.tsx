/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function Seo ({ description, lang, meta, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null}
      meta={[
        {
          name: 'description',
          content: metaDescription
        },
        {
          property: 'og:title',
          content: title
        },
        {
          property: 'og:description',
          content: metaDescription
        },
        {
          property: 'og:type',
          content: 'website'
        },
        {
          name: 'og:image',
          content: 'https://adoptium.net/images/social-image.png'
        },
        {
          name: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          name: 'twitter:site',
          content: '@adoptium'
        },
        {
          name: 'twitter:image',
          content: 'https://adoptium.net/images/social-image.png'
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata?.author || ''
        },
        {
          name: 'twitter:title',
          content: title
        },
        {
          name: 'twitter:description',
          content: metaDescription
        }
      ].concat(meta)}
    >
      {/* Eclipse Cookie Consent Banner */}
      <link rel='stylesheet' type='text/css' href='//www.eclipse.org/eclipse.org-common/themes/solstice/public/stylesheets/vendor/cookieconsent/cookieconsent.min.css' />
      <script src='//www.eclipse.org/eclipse.org-common/themes/solstice/public/javascript/vendor/cookieconsent/default.min.js' />
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: 'en',
  meta: [],
  description: ''
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
}

export default Seo
