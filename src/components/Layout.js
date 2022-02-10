import * as React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Navbar from './Navbar'
import Footer from './Footer'
import './layout.scss'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div
      className='container-fluid p-0'
      style={{
        backgroundColor: 'var(--bg)',
        color: 'var(--text-normal)',
        transition: 'color 0.2s ease-out, background 0.2s ease-out'
      }}
    >
      <Navbar siteTitle={data.site.siteMetadata?.title || 'Title'} />
      <main>
        <main>{children}</main>
      </main>
      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
