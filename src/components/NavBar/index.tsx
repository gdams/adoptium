import * as React from "react"
import PropTypes from "prop-types"
import { Link as Noni18nLink } from "gatsby"
import { Link, useTranslation } from 'gatsby-plugin-react-i18next';
import { FaLinkedin, FaYoutube, FaGithub, FaSlack, FaRss } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Trans } from 'gatsby-plugin-react-i18next';

// @ts-ignore
import Logo from '../../images/adoptium-logo-dark.svg';

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : {className: "nav-link"}
}

const ExactNavLink = props => (
  <Link getProps={isActive}{...props} />
)

const NavBar = (): JSX.Element => {

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
                <Trans i18nKey="navbar.home" defaults="Home" />
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/marketplace"
              >
                <Trans i18nKey="navbar.marketplace" defaults="Marketplace" />
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/docs"
              >
                <Trans i18nKey="navbar.documentation" defaults="Documentation" />
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/docs/faq"
              >
                <Trans i18nKey="navbar.faq" defaults="FAQ" />
              </ExactNavLink>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Trans i18nKey="navbar.projects" defaults="Projects" />
              </Link>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                <li><ExactNavLink className="dropdown-item" to="/temurin">Eclipse Temurin</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/aqavit">Eclipse AQAvit</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/jmc">Eclipse Mission Control</ExactNavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Trans i18nKey="navbar.further.information" defaults="Further Information" />
              </Link>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown2">
                <li><ExactNavLink className="dropdown-item" to="/support"><Trans i18nKey="navbar.further.support" defaults="Support" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/news"><Trans i18nKey="navbar.news.and.events" defaults="News & Events" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/about"><Trans i18nKey="navbar.about" defaults="About" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/members"><Trans i18nKey="navbar.members" defaults="Members" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/sponsors"><Trans i18nKey="navbar.sponsors" defaults="Sponsors" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/adopters"><Trans i18nKey="navbar.temurin.adopters" defaults="Temurin Adopters" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/temurin/buttons"><Trans i18nKey="navbar.promote" defaults="Promote" /></ExactNavLink></li>
                <li><a className="nav-link" href="https://api.adoptium.net"><Trans i18nKey="navbar.api" defaults="API" /></a></li>
                <li><ExactNavLink className="dropdown-item" to="/blog"><Trans i18nKey="navbar.blog" defaults="Blog" /></ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/support-us"><Trans i18nKey="navbar.support.us" defaults="Support Us" /></ExactNavLink></li>
                <li><a className="nav-link" href="https://status.adoptium.net"><Trans i18nKey="navbar.status" defaults="Status" /></a></li>
              </ul>
            </li>
          </ul>
        </div>
        <ul className="nav col-md-5 col-9 pb-4 justify-content-end list-unstyled d-flex hide-on-mobile p-3">
          { typeof window !== 'undefined' && window.location.href.includes('/blog') &&
            <li className="ms-3"><Noni18nLink style={navbarIcon} aria-label="Adoptium RSS Feed" to="/rss.xml"><FaRss size={25} /></Noni18nLink></li>
          }
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium Twitter Account" rel="noopener noreferrer" href="https://x.com/adoptium"><FaXTwitter size={25} /></a></li>
          <li className="ms-3">
          <a style={navbarIcon} target="_blank" aria-label="Adoptium LinkedIn Page" rel="noopener noreferrer" href="https://www.linkedin.com/showcase/adoptium/">
          <FaLinkedin size={25} /></a></li>
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium YouTube Account" rel="noopener noreferrer" href="https://www.youtube.com/c/EclipseAdoptium"><FaYoutube size={25} /></a></li>
          <li className="ms-3"><a style={navbarIcon} target="_blank" aria-label="Adoptium GitHub Account" rel="noopener noreferrer" href="https://github.com/adoptium"><FaGithub size={25} /></a></li>
          <li className="ms-3"><Link style={navbarIcon} aria-label="Adoptium Slack Account" to="/slack"><FaSlack size={25} /></Link></li>
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
