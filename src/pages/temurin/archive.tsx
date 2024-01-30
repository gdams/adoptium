import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans } from 'gatsby-plugin-react-i18next'
import { FaArrowCircleRight } from 'react-icons/fa'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import VersionSelector from '../../components/VersionSelector'
import ChecksumModal from '../../components/ChecksumModal'
import TemurinArchiveTable from '../../components/TemurinArchiveTable'
import { getAssetsForVersion } from '../../hooks'
import LinkText from '../../components/LinkText'

const TemurinReleases = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-10 col-md-8 mx-auto'>
          <h1 className='fw-light'>Archive</h1>
          <div className='row align-items-center pt-2'>
            <div className='callout callout-default text-start'>
              <Trans i18nKey='archive.be.aware' defaults="Please be aware that this archive contains old releases of Eclipse Temurin kept for reference. The <latestReleasesLink>latest releases</latestReleasesLink> should be used in development and production."
                  components={{
                    latestReleasesLink: <LinkText href='/temurin/releases' />
                  }}
              />
              <br />
              <br />
              <p className='text-warning'><Trans i18nKey='archive.do.not.use.unsupported' defaults="Using old, superseded, or otherwise unsupported builds is not recommended." /></p>
            </div>
            <div className='btn-group'>
              <Link to='/temurin/releases' className='btn btn-primary m-3'>
                <Trans>Latest Releases</Trans> <FaArrowCircleRight />
              </Link>
              <Link to='/temurin/nightly' className='btn btn-secondary m-3'>
                <Trans>Nightly Builds</Trans> <FaArrowCircleRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <VersionSelector updater={getAssetsForVersion} releaseType='ga' Table={TemurinArchiveTable} />
      <ChecksumModal />
    </section>
  </Layout>
)

export default TemurinReleases

export const Head = () => (
  <Seo title='Archive' />
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
