import * as React from "react"
import PropTypes from "prop-types"
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { FaTwitter, FaYoutube, FaGithub, FaSlack } from 'react-icons/fa';

import Logo from '../../images/adoptium-logo-dark.svg';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : {className: "nav-link"}
}

const ExactNavLink = props => (
  <Link getProps={isActive}{...props} />
)

const NavBar = ({siteTitle}): JSX.Element => {
  const {t} = useTranslation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-purple"
      style={{ height: '7rem', paddingTop: '1.25em', paddingBottom: '1.25em', position: 'relative', zIndex: '10000' }}
    >
      <div className="container-fluid">
        <Link to="/" className="navbar-brand ms-5" aria-label="Homepage Link">
          <Logo alt="Adoptium Logo" style={{ paddingLeft: '.2em', paddingRight: '.2em', height: '1.9em' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar"
                aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav bg-purple me-auto mb-2 mb-md-0">
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
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Further Information
              </Link>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown2">
                <li><ExactNavLink className="dropdown-item" to="/news">News & Events</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/about">About</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/members">Members</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/sponsors">Sponsors</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/temurin/buttons">Promote</ExactNavLink></li>
                <li><a className="nav-link" href="https://api.adoptium.net">API</a></li>
                <li><a className="nav-link" href="https://blog.adoptium.net">Blog</a></li>
                <li><a className="nav-link" href="https://status.adoptium.net">Status</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <ul className="nav col-md-5 col-9 pb-4 justify-content-end list-unstyled d-flex hide-on-mobile p-3">
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium Twitter Account" rel="noopener noreferrer" href="https://twitter.com/adoptium"><FaTwitter size={25} /></a></li>
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium YouTube Account" rel="noopener noreferrer" href="https://www.youtube.com/c/EclipseAdoptium"><FaYoutube size={25} /></a></li>
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium GitHub Account" rel="noopener noreferrer" href="https://github.com/adoptium"><FaGithub size={25} /></a></li>
          <li className="ms-3"><Link style={navbarIcon} target="_blank" aria-label="Adoptium Slack Account" rel="noopener noreferrer" to="/slack"><FaSlack size={25} /></Link></li>
        </ul>
      </div>
    </nav>
  )
}

const navbarIcon = ({
  color: 'rgba(255, 255, 255, 0.55)'
});

NavBar.propTypes = {
  siteTitle: PropTypes.string,
}

NavBar.defaultProps = {
  siteTitle: ``,
}

export default NavBar
