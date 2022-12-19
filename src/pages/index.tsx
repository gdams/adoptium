import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { StaticImage } from 'gatsby-plugin-image'
import { FaStore } from 'react-icons/fa'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import LatestTemurin from '../components/LatestTemurin'

const IndexPage = () => {
  return (
    <Layout>
      <section id='hero' className='home' style={{ overflowX: 'hidden' }}>
        <div className='container-flex'>
          <div className='main-banner row justify-content-center align-items-center'>
            <div className='col-md-6 p-md-5'>
              <div className='w-75 m-auto'>
                <div data-aos='zoom-in-up' className='aos-init aos-animate'>
                  <div className='my-3 my-md-5 text-center text-md-start banner-title'>
                    <h1 className='display-4 text-white'>
                      <Trans>Prebuilt OpenJDK</Trans>
                      <br />
                      <Trans>Binaries for Free!</Trans>
                    </h1>
                  </div>
                  <p className='mt-3 text-center text-md-start text-white'>
                    <Trans i18nKey='Intro'>
                      Java&trade; is the world's leading programming language and platform. The Adoptium Working Group promotes and supports high-quality, TCK certified runtimes and associated technology for use across the Java ecosystem. Eclipse Temurin is the name of the OpenJDK distribution from Adoptium.
                    </Trans>
                  </p>
                </div>
                <LatestTemurin page='home' />
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
        </section>
        <section id='wg' className='home' style={{ overflowX: 'hidden' }}>
        <div className='p-3 bg-light rounded-3 text-start'>
          <div className='container py-5 row content'>
            <div className='col-lg-6'>
              <FaStore size='90%' color='#c52158' />
            </div>
            <div className='col-lg-6'>
              <h2 className='text-pink'><Trans>The Adoptium&reg; Marketplace</Trans></h2>
              <p>
                <Trans
                  shouldUnescape
                  i18nKey='marketplace.marketplaceIntro'
                >
                  The Adoptium Marketplace provides users easy access to a wide variety of high-quality fully compatible OpenJDK Java binaries, and provides the organizations producing those binaries a mechanism to broaden the distribution of their Java runtimes.
                </Trans>
              </p>
              <div className='btn-group-vertical'>
                <Link to='/marketplace' className='btn btn-lg btn-primary text-white'><Trans>Visit the Adoptium Marketplace</Trans></Link>
                <Link to='/docs/marketplace-policy/' className='btn btn-lg btn-secondary my-3'><Trans>Learn More</Trans></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='wg' className='home' style={{ overflowX: 'hidden' }}>
        <div className='p-3 mb-4 rounded-3 text-start'>
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
  }
`
