import * as React from 'react'
import PropTypes from 'prop-types'
import { Slice } from 'gatsby'
import SSRProvider from 'react-bootstrap/SSRProvider'

import './layout.scss'

const Layout = ({ children }) => {
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
        <Slice alias='navbar' />
        <Slice alias='banner' />
        <main>
          {children}
        </main>
        <Slice alias='footer' />
      </div>
    </SSRProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
