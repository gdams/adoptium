import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { BiDonateHeart } from 'react-icons/bi'
import { SiGithubsponsors } from 'react-icons/si'

import vendors from '../json/marketplace.json'
import Layout from '../components/Layout'
import Seo from '../components/Seo'

const DownloadPage = ({ location }) => {
  let link, os, arch, type, version, vendor, postDownload
  if (location.state && location.state.link) {
    link = location.state.link
    os = location.state.os
    arch = location.state.arch
    type = location.state.pkg_type
    version = location.state.java_version
    vendor = location.state.vendor ? location.state.vendor : 'Adoptium'
    for (const vendordata of vendors) {
      if (vendordata.name === vendor) {
        postDownload = vendordata.postDownload
      }
    }
  }

  // Send a custom event to Google Analytics
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  typeof window !== 'undefined' && link && window.gtag &&
    // @ts-ignore
    window.gtag('event', 'download', {
      event_category: 'download',
      link: link,
      event_label: `${os}-${arch}-${type}`,
      java_version: version,
      vendor: vendor
    });

  return (
    <Layout>
      <section className='py-5 text-center container'>
        <div className='row py-lg-5'>
          <div className='col-lg-10 col-md-8 mx-auto'>
            <h1 className='fw-light'>Thank you for your download!</h1>
            {link && (
              vendor === 'Adoptium'
                ? <p className='py-2'>You are downloading an Eclipse Temurin build, the open-source community build from the Eclipse Adoptium Working Group.</p>
                : (
                  <>
                    <p className='py-2'>You are downloading a build from <strong>{vendor}</strong>, a member of the Eclipse Adoptium Working Group.</p>
                    {postDownload &&
                      <p className='py-2'>For support and next steps please visit the&nbsp;
                        <a href={`${postDownload}?utm_source=adoptium&os=${os}&arch=${arch}&type=${type}&version=${version}`} target='_blank' rel='noopener noreferrer'>{vendor === 'IBM' ? 'IBM Semeru Runtimes' : vendor} Website</a>
                        .
                      </p>}
                  </>
                  )
            )}

            {link && <meta httpEquiv='refresh' content={`0; url=${link}`} />}
            {link
              ? <p className='text-muted py-3'>If the download doesn't start in a few seconds, please <a href={link}>click here</a> to start the download.</p>
              : <p className='text-muted py-3'>Ooops - something doesn't seem quite right here. Please try again.</p>}

            {vendor === 'Adoptium' && <p>Eclipse Temurin binaries are 100% free and open source and used by millions of developers every day. Here are three easy ways you can contribute toward the future development of Eclipse Adoptium projects and technologies.</p>}
            <h2 className='fw-light py-3'>Donate to the Eclipse Adoptium Working Group</h2>
            <p>You can help power the Adoptium Community with a donation</p>
            <a href='https://eclipse.org/donate/adoptium' target='_blank' className='btn btn-primary btn-lg m-2' rel='noreferrer'>Donate <BiDonateHeart /></a>
            <a target='_blank' rel='noreferrer' href='https://github.com/sponsors/adoptium' className='btn btn-lg btn-outline-dark m-2'><SiGithubsponsors aria-label='GitHub Sponsors Icon' color='#bf3989' /> Become a GitHub Sponsor!</a>
            <h2 className='fw-light py-3'>Get involved</h2>
            <p>Whether you choose to <a href='https://github.com/adoptium/adoptium-support/issues' target='_blank' rel='noreferrer'>report bugs</a>, request features, or <Link to='/docs/first-timer-support'>become a committer</Link>, you can help improve the technology for yourself and the rest of the community.</p>
            <h2 className='fw-light py-3'>Join the Working Group</h2>
            <Link to='/join' className='btn btn-lg btn-primary m-2'>Join the Working group</Link>
            <Link to='/members' className='btn btn-lg btn-primary m-2'>View our Members</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default DownloadPage

export const Head = () => (
  <Seo title='Thank You' />
)

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: {language: {eq: $language}}) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
