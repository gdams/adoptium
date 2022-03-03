import * as React from "react"
import PropTypes from "prop-types"
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';

import LogoDark from '../images/adoptium-logo-dark.svg';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : {className: "nav-link"}
}

const ExactNavLink = props => (
  <Link getProps={isActive}{...props} />
)

const Navbar = ({siteTitle}): JSX.Element => {
  const {t} = useTranslation();

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-pink" style={{ height: '7rem', paddingTop: '1.25em', paddingBottom: '1.25em' }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <LogoDark style={{ paddingLeft: '.2em', paddingRight: '.2em', height: '1.9em' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar"
                aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav bg-pink me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <ExactNavLink
                to="/"
              >
                {t('Home')}
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/marketplace"
              >
                Marketplace
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/docs"
              >
                Documentation
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/docs/faq"
              >
                FAQ
              </ExactNavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Projects
              </Link>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                <li><ExactNavLink className="dropdown-item" to="/temurin">Eclipse Temurin</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/aqavit">Eclipse AQAvit</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/jmc">Eclipse Mission Control</ExactNavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <ExactNavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Further Information
              </ExactNavLink>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                <li><ExactNavLink className="dropdown-item" to="/about">About</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/members">Members</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/sponsors">Sponsors</ExactNavLink></li>
                <li><a className="dropdown-item nav-link" href="https://api.adoptium.net">API</a></li>
                <li><a className="dropdown-item nav-link" href="https://blog.adoptium.net">Blog</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

Navbar.propTypes = {
  siteTitle: PropTypes.string,
}

Navbar.defaultProps = {
  siteTitle: ``,
}

export default Navbar
