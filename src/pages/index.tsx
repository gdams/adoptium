import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import LatestTemurin from '../components/LatestTemurin'
import AdoptiumNews from '../components/AdoptiumNews'

const IndexPage = ({data}) => {
  const latestLTS = data.mostRecentLts.version
  return (
    <Layout>
      <section id='home' className='home' style={{ overflowX: 'hidden' }}>
        <div className='container-flex'>
          <div className='main-banner row justify-content-center align-items-center'>
            <div className='col-md-6 p-md-5'>
              <div className='w-75 m-auto'>
                <div data-aos='zoom-in-up' className='aos-init aos-animate'>
                  <div className='my-3 my-md-5 text-center text-md-start banner-title'>
                    <h1 className='display-4'>
                      <Trans>Prebuilt OpenJDK</Trans>
                      <br />
                      <Trans>Binaries for Free!</Trans>
                    </h1>
                  </div>
                  <p className='mt-3 text-center text-md-start'>
                    <Trans i18nKey='Intro'>
                      Java&trade; is the world's leading programming language and platform. The Adoptium Working Group promotes and supports high-quality, TCK certified runtimes and associated technology for use across the Java ecosystem. Eclipse Temurin is the name of the OpenJDK distribution from Adoptium.
                    </Trans>
                  </p>
                </div>
                <LatestTemurin latestLTS={latestLTS} page='home' />
              </div>
            </div>
            <div className='col-md-6'>
              <StaticImage
                src='../images/servers-min.png'
                width={1000}
                alt='Image showing server, cloud and laptop'
                style={{ opacity: '0.999', mixBlendMode: 'luminosity' }}
              />
            </div>
          </div>
        </div>
        <div className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
          <AdoptiumNews />
        </div>
        <div className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
          <div className='container py-5'>
            <h2 className='text-pink'><Trans>The Adoptium&reg; Working Group</Trans></h2>
            <p>
              <Trans i18nKey='wg-description'>
                The Adoptium Working Group promotes and supports high-quality runtimes and associated technology for use across the Java ecosystem.
                Our vision is to meet the needs of Eclipse and the broader Java community by providing runtimes for Java-based applications. We
                embrace existing standards and a wide variety of hardware and cloud platforms.
              </Trans>
            </p>
            <div className='btn-group'>
              <Link to='/join' className='btn btn-lg btn-primary m-3 text-white'><Trans>Join the Working Group</Trans></Link>
              <Link to='/members' className='btn btn-lg btn-secondary m-3'><Trans>View our Members</Trans></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

export const Head = () => (
  <Seo title='Home' />
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
    mostRecentLts {
      version
    }
  }
`
