import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
// import { ThemeToggler } from 'gatsby-plugin-dark-mode'
// import Switch from "react-switch";

import LogoLight from '../images/adoptium-logo-light.svg';
import LogoDark from '../images/adoptium-logo-dark.svg';
// import { IoMdMoon } from "@react-icons/all-files/io/IoMdMoon";
// import { IoMdSunny } from "@react-icons/all-files/io/IoMdSunny";

const isActive = ({ isCurrent }) => {
  return isCurrent ? { className: "nav-link active" } : {className: "nav-link"}
}

const ExactNavLink = props => (
  <Link getProps={isActive}{...props} />
)

const Navbar = ({siteTitle}): JSX.Element => {

  // const handleThemeOnClick = (
  //   toggleTheme: Function,
  //   currentTheme: string,
  //   isKeyPress = false
  // ): void => {
  //   if (isKeyPress) {
  //     return;
  //   }

  //   const toggle = currentTheme === 'light' ? 'dark' : 'light';
  //   toggleTheme(toggle);
  // };

  return (
    <nav className="navbar navbar-expand-xl navbar-dark bg-transparent" style={{ height: '7rem', paddingTop: '1.25em', paddingBottom: '1.25em' }}>
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <LogoDark style={{ paddingLeft: '.2em', paddingRight: '.2em', height: '1.9em' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar"
                aria-controls="main-navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="main-navbar">
          <ul className="navbar-nav bg-transparent me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <ExactNavLink
                to="/"
              >
                Home
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
                to="/installation"
              >
                Installation
              </ExactNavLink>
            </li>
            <li className="nav-item">
              <ExactNavLink
                to="/docs/migration"
              >
                Migration Guide
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
                <li><ExactNavLink className="dropdown-item" to="/jmc">Eclipse Mission Control</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/aqavit">Eclipse AQAvit</ExactNavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Further Information
              </Link>
              <ul className="dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                <li><ExactNavLink className="dropdown-item" to="/about">About</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/support">Support</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/members">Members</ExactNavLink></li>
                <li><ExactNavLink className="dropdown-item" to="/sponsors">Sponsors</ExactNavLink></li>
                <li><a className="dropdown-item nav-link" href="https://api.adoptium.net">API</a></li>
                <li><a className="dropdown-item nav-link" href="https://blog.adoptium.net">Blog</a></li>
                <li><ExactNavLink className="dropdown-item" to="/supported-platforms">Supported Platforms</ExactNavLink></li>
              </ul>
            </li>
          </ul>
        </div>
        {/* <ThemeToggler>
          {({
            theme,
            toggleTheme,
          }: {
            theme: string | null;
            // eslint-disable-next-line @typescript-eslint/ban-types
            toggleTheme: Function;
          }): JSX.Element | null => {
            if (theme === null) {
              return null;
            }
            const changeTheme = () => {
              handleThemeOnClick(toggleTheme, theme)
            }
            return (
              <Switch
                checked={theme === "light" ? true : false}
                offColor="#1d1f2f"
                onColor="#FDB813"
                checkedIcon={
                  <IoMdSunny size="1.5em" color="white" style={{paddingLeft: '.5em'}} className="light" />
                }
                uncheckedIcon={
                  <IoMdMoon size="1.5em" color="white" style={{paddingLeft: '.5em'}} className="dark" />
                }
                onChange={changeTheme}
              />
            );
          }}
        </ThemeToggler> */}
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
