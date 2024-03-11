import React from 'react';
import { FaYoutube, FaGithub, FaSlack, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import RandomContributor from '../RandomContributor';
import LanguageSelector from '../LanguageSelector';
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next';
import LeavingSiteDisclaimerModal from '../LeavingSiteDisclaimerModal';
import './Footer.scss';

const Footer = (): JSX.Element => {

  const {t} = useTranslation();

  return (
    <>
    <section className="bottom-info">
      <RandomContributor />
      <LeavingSiteDisclaimerModal />
    </section>
      <div className="bg-grey">
        <div className="container mt-5">
          <footer className="row row-cols-4 py-5 border-top">

            <div className="col-sm-3 col-12">
              <p className="h5 pb-1"><Trans i18nKey='footer.eclipse.foundation' defaults='Eclipse Foundation'/></p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.about.us' defaults='About Us'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/foundation/contact.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.contact.us' defaults='Contact Us'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/donate/adoptium" className="nav-link p-0 text-muted"><Trans i18nKey='footer.donate' defaults='Donate'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/membership" className="nav-link p-0 text-muted"><Trans i18nKey='footer.members' defaults='Members'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/documents/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.governance' defaults='Governance'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/documents/Community_Code_of_Conduct.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.code.of.conduct' defaults='Code of Conduct'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/artwork/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.logo.and.artwork' defaults='Logo and Artwork'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/foundation/directors.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.board.of.directors' defaults='Board of Directors'/></a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1"><Trans i18nKey='footer.legal' defaults='Legal'/></p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/privacy.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.privacy.policy' defaults='Privacy Policy'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/termsofuse.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.terms.of.use' defaults='Terms of Use'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/copyright.php" className="nav-link p-0 text-muted"><Trans i18nKey='footer.copyright.agent' defaults='Copyright Agent'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/epl-2.0/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.eclipse.public.license' defaults='Eclipse Public License'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/legal/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.legal.resources' defaults='Legal Resources'/></a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1"><Trans i18nKey='footer.useful.links' defaults='Useful Links'/></p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://github.com/adoptium/adoptium-support/issues" className="nav-link p-0 text-muted"><Trans i18nKey='footer.report.a.bug' defaults='Report a Bug'/></a></li>
                <li className="nav-item mb-2"><Link to="/docs" className="nav-link p-0 text-muted"><Trans i18nKey='footer.documentation' defaults='Documentation'/></Link></li>
                <li className="nav-item mb-2"><Link to="/contributing" className="nav-link p-0 text-muted"><Trans i18nKey='footer.how.to.contribute' defaults='How to Contribute'/></Link></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/mail/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.mailing.lists' defaults='Mailing Lists'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/forums/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.forums' defaults='Forums'/></a></li>
                <li className="nav-item mb-2"><a href="https://marketplace.eclipse.org/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.marketplace' defaults='Marketplace'/></a></li>
                <li className="nav-item mb-2"><a href="https://eclipse-foundation.store/collections/eclipse-adoptium" className="nav-link p-0 text-muted"
                  data-bs-toggle="modal"
                  data-bs-target="#leavingSiteDisclaimerModal"
                  data-bs-message={t('swag.store.disclaimer', 'By clicking the continue button, you will leave our website. Please be aware that new terms of use will apply to the Eclipse Foundation store, powered by Fourthwall: https://eclipse-foundation.store/.')}
                  data-bs-location="https://eclipse-foundation.store/collections/eclipse-adoptium"
                  ><Trans i18nKey='footer.swag.store' defaults='Swag Store'/></a></li>
              </ul>
            </div>

            <div className="col-sm-3 col-12">
            <p className="h5 pb-1"><Trans i18nKey='footer.useful.other' defaults='Other'/></p>
              <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/ide/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.ide.and.tools' defaults='IDE and Tools'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/projects" className="nav-link p-0 text-muted"><Trans i18nKey='footer.projects' defaults='Projects'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/workinggroups/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.working.groups' defaults='Working Groups'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/org/research/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.research.eclipse' defaults='Research@Eclipse'/></a></li>
                <li className="nav-item mb-2"><a href="https://www.eclipse.org/security/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.report.a.vulnerability' defaults='Report a Vulnerability'/></a></li>
                <li className="nav-item mb-2"><a href="https://status.eclipse.org/" className="nav-link p-0 text-muted"><Trans i18nKey='footer.service.status' defaults='Service Status'/></a></li>
              </ul>
            </div>

            <div className="col-sm-6 col-12 py-2 d-flex">
              <span className="text-muted"><Trans i18nKey='footer.all.rights.reserved' defaults='Copyright © Eclipse Foundation. All Rights Reserved.'/></span>
            </div>
            <ul className="nav col-md-5 col-9 pb-4 justify-content-end list-unstyled d-flex">
              <li className="ms-3"><a href="https://www.netlify.com"> <img src="/images/netlify-light.svg" alt="Deploys by Netlify" style={{height: '25px'}}/> </a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium Twitter Account" href="https://x.com/adoptium"><FaXTwitter size={25} /></a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium Linkedin Account" href="https://www.linkedin.com/showcase/adoptium/"><FaLinkedin size={25} /></a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium YouTube Account" href="https://www.youtube.com/c/EclipseAdoptium"><FaYoutube size={25} /></a></li>
              <li className="ms-3"><a className="text-muted" aria-label="Adoptium GitHub Account" href="https://github.com/adoptium"><FaGithub size={25} /></a></li>
              <li className="ms-3"><Link className="text-muted" aria-label="Adoptium Slack Account" to="/slack"><FaSlack size={25} /></Link></li>
            </ul>
            <div className="col-12 d-flex ">
              <span className="text-muted"><Trans i18nKey='footer.trademarks' defaults='Java and OpenJDK are trademarks or registered trademarks of Oracle and/or its affiliates. Other names may be trademarks of their respective owners.'/></span>
            </div>
          </footer>
        </div>
      </div>
      <LanguageSelector />
    </>
  );
};

export default Footer;
