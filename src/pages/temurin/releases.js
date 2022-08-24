import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { FaArrowCircleRight } from 'react-icons/fa'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import DownloadDropdowns from '../../components/DownloadDropdowns'
import DownloadTable from '../../components/TemurinDownloadTable'
import ChecksumModal from '../../components/ChecksumModal'
import LinkText from '../../components/LinkText'
import { loadLatestAssets } from '../../hooks'

const TemurinReleases = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-10 col-md-8 mx-auto'>
          <h1 className='fw-light'>Eclipse Temurin™ Latest Releases</h1>
          <div className='row align-items-center pt-3'>
            <div className='col-6 col-md-4'>
              <img
                src='/images/temurin-light.png'
                width={120}
                alt='Temurin logo'
                className='img-fluid'
              />
            </div>
            <div className='col-12 col-sm-6 col-md-8'>
              <p className='text-start'>
                <Trans
                  i18nKey='release.intro'
                  defaults='Eclipse Temurin is the open source Java SE build based upon OpenJDK. Temurin is available for a <supportedPlatformsLink>wide range of platforms</supportedPlatformsLink> and Java SE versions. The latest releases recommended for use in production are listed below, and are regularly <supportLink>updated and supported</supportLink> by the Adoptium community. Migration help, container images and package installation guides are available in the <docsLink>documentation section</docsLink>. You can read the <foojayLink>Release Notes</foojayLink> for each version thanks to our friends at Foojay.io!'
                  components={{
                    supportedPlatformsLink: <LinkText href='/supported-platforms' />,
                    supportLink: <LinkText href='/support' />,
                    docsLink: <LinkText href='/docs' />,
                    foojayLink: <LinkText href='https://foojay.io/java-17/?tab=component' />
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='row align-items-center pt-3'>
        <p className='text-center'>
          <Trans>Use the drop-down boxes below to filter the list of current releases.</Trans>
        </p>
      </div>
      <DownloadDropdowns updaterAction={loadLatestAssets} marketplace={false} Table={DownloadTable} />
      <ChecksumModal />
      <div className='row align-items-center pt-3'>
        <p className='text-center'>
          <Trans>Previous releases are available in the Temurin archive.</Trans>
        </p>
        <div className='btn-group-vertical col-6 mx-auto'>
          <Link to='/temurin/archive' className='btn btn btn-primary mt-3'>
            <Trans>Release Archive</Trans> <FaArrowCircleRight />
          </Link>
        </div>
      </div>
    </section>
  </Layout>
)

export default TemurinReleases

export const Head = () => (
  <Seo title='Latest Releases' />
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
