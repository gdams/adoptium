import { Link } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { FaTwitter, FaYoutube, FaGithub, FaSlack } from 'react-icons/fa';
import RandomContributor from '../RandomContributor';
import LanguageSelector from '../LanguageSelector';
import './Footer.scss';

export interface DropDownState {
  active: number;
  isOpen: boolean;
  shouldDropDownBlur: boolean;
}

const Footer = (): JSX.Element => {
  return (
    <>
    <section className="bottom-info">
        <RandomContributor />
    </section>
      <div className="bg-grey">
        <div className="container mt-5">
          <footer className="row row-cols-4 py-5 border-top">

            <div className="col-sm-3 col-12">
              <p className="h5 pb-1">Eclipse Foundation</p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/" className="nav-link p-0 text-muted">About Us</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/foundation/contact.php" className="nav-link p-0 text-muted">Contact Us</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/donate/adoptium" className="nav-link p-0 text-muted">Donate</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/membership" className="nav-link p-0 text-muted">Members</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/documents/" className="nav-link p-0 text-muted">Governance</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php" className="nav-link p-0 text-muted">Code of Conduct</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/artwork/" className="nav-link p-0 text-muted">Logo and Artwork</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/foundation/directors.php" className="nav-link p-0 text-muted">Board of Directors</a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1">Legal</p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/privacy.php" className="nav-link p-0 text-muted">Privacy Policy</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/termsofuse.php" className="nav-link p-0 text-muted">Terms of Use</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/copyright.php" className="nav-link p-0 text-muted">Copyright Agent</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/epl-2.0/" className="nav-link p-0 text-muted">Eclipse Public License</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/" className="nav-link p-0 text-muted">Legal Resources</a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1">Useful Links</p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://bugs.eclipse.org/bugs/" className="nav-link p-0 text-muted">Report a Bug</a></li>
                <li className="nav-item mb-2"><a href="https://help.eclipse.org/" className="nav-link p-0 text-muted">Documentation</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/contribute/" className="nav-link p-0 text-muted">How to Contribute</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/mail/" className="nav-link p-0 text-muted">Mailing Lists</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/forums/" className="nav-link p-0 text-muted">Forums</a></li>
                <li className="nav-item mb-2"><a href="https://marketplace.eclipse.org/" className="nav-link p-0 text-muted">Marketplace</a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1">Other</p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/ide/" className="nav-link p-0 text-muted">IDE and Tools</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/projects" className="nav-link p-0 text-muted">Projects</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/workinggroups/" className="nav-link p-0 text-muted">Working Groups</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/research/" className="nav-link p-0 text-muted">Research@Eclipse</a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/security/" className="nav-link p-0 text-muted">Report a Vulnerability</a></li>
                <li className="nav-item mb-2"><a href="https://status.eclipse.org/" className="nav-link p-0 text-muted">Service Status</a></li>
              </ul>
            </div>
            
            <div className="col-sm-6 col-12 py-2 d-flex">
              <span className="text-muted">Copyright © Eclipse Foundation. All Rights Reserved.</span>
            </div>
            <ul className="nav col-md-5 col-9 pb-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium Twitter Account" href="https://twitter.com/adoptium"><FaTwitter size={25} /></a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium YouTube Account" href="https://www.youtube.com/c/EclipseAdoptium"><FaYoutube size={25} /></a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium GitHub Account" href="https://github.com/adoptium"><FaGithub size={25} /></a></li>
              <li className="ms-3"><Link className="text-muted" aria-label="Adoptium Slack Account" to="/slack"><FaSlack size={25} /></Link></li>
            </ul>
            <div className="col-12 d-flex ">
                <span className="text-muted">Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.</span>
            </div>
          </footer>
        </div>
      </div>
      <LanguageSelector />
    </>
  );
};

export default Footer;
