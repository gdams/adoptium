/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

interface Props {
  title: string
}

const Seo = ({ title }: Props): JSX.Element => {
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

  const siteTitle = title + " | Adoptium"

  return (
    <>
      <title>{siteTitle}</title>
      <meta name="description" content={site.siteMetadata.description} />
      <meta name="og:title" content={siteTitle} />
      <meta name="og:description" content={site.siteMetadata.description} />
      <meta name="og:type" content="website" />
      <meta name="og:image" content="https://adoptium.net/images/social-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@adoptium" />
      <meta name="twitter:image" content="https://adoptium.net/images/social-image.png" />
      <meta name="twitter:creator" content="@adoptium" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={site.siteMetadata.description} />
      <link rel='stylesheet' type='text/css' href='//www.eclipse.org/eclipse.org-common/themes/solstice/public/stylesheets/vendor/cookieconsent/cookieconsent.min.css' />
      <script src='//www.eclipse.org/eclipse.org-common/themes/solstice/public/javascript/vendor/cookieconsent/default.min.js' />
    </>
  )
}

Seo.defaultProps = {
  title: 'Adoptium'
}

Seo.propTypes = {
  title: PropTypes.string.isRequired
}

export default Seo
