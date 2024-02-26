import * as React from 'react'
import { graphql } from 'gatsby'
import { Trans } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import DownloadDropdowns from '../components/DownloadDropdowns'
import DownloadTable from '../components/MarketplaceDownloadTable'
import { getAllPkgsForVersion } from '../hooks'
import ChecksumModal from '../components/ChecksumModal'
import LinkText from '../components/LinkText'

const DownloadPage = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Adoptium&reg; Marketplace</h1>
          <p className='pt-3'>
            <Trans
              shouldUnescape
              i18nKey='marketplace.marketplaceDescription'
            >
              Java&trade; is the world's leading programming language and platform.
              The Adoptium Marketplace promotes high-quality, TCK certified and AQAvit verified runtimes for use across the Java ecosystem.
            </Trans>
          </p>
          <div className='row align-items-center pt-3'>
            <div className='col-6 col-md-4'>
              <img
                src='/images/aqavit-light.png'
                width={150}
                alt='AQAvit logo'
                className='img-fluid'
              />
            </div>
            <div className='col-12 col-sm-6 col-md-8 '>
              <p className='text-start'>
                <Trans
                  i18nKey='marketplace.aqavitDescription'
                  defaults='The AQAvit open source test suite (<strong>A</strong>doptium <strong>Q</strong>uality <strong>A</strong>ssurance) can be found <aqavitLink>here</aqavitLink>. There is also <blogPostLink>documentation</blogPostLink> that explains what testing is run and how AQAvit verification fits into the overall delivery pipeline.'
                  components={{
                    aqavitLink: <LinkText href='https://github.com/Adoptium/aqa-tests' />,
                    blogPostLink: <LinkText href='https://github.com/adoptium/aqa-tests/tree/master/docs/pages/AQAvitVerification.md' />
                  }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
      <DownloadDropdowns updaterAction={getAllPkgsForVersion} marketplace Table={DownloadTable} />
      <ChecksumModal />
    </section>
  </Layout>
)

export default DownloadPage

export const Head = () => (
  <Seo title='Marketplace' />
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
