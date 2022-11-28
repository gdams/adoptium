import * as React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import SSRProvider from 'react-bootstrap/SSRProvider'

import NavBar from '../NavBar'
import Banner from '../Banner'
import Footer from '../Footer'
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
    <SSRProvider>
      <div
        className='container-fluid p-0'
        style={{
          backgroundColor: 'var(--bg)',
          color: 'var(--text-normal)',
          transition: 'color 0.2s ease-out, background 0.2s ease-out'
        }}
      >
        <NavBar />
        <Banner />
        <main>
          {children}
        </main>
        <Footer />
      </div>
    </SSRProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
