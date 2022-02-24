import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import DownloadDropdowns from '../components/DownloadDropdowns'
import DownloadTable from '../components/MarketplaceDownloadTable'
import { getAllPkgsForVersion } from '../hooks'

const DownloadPage = () => (
  <Layout>
    <Seo title='Marketplace' />
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Adoptium Marketplace</h1>
          <p className='pt-3'>
            Java™ is the world's leading programming language and platform.
            The Adoptium Marketplace offers high-quality, TCK certified runtimes and associated technology for use across the Java™ ecosystem.
          </p>
          <div className='row align-items-center pt-3'>
            <div className='col-6 col-md-4'>
              <img
                src='../images/aqavit-light.png'
                width={150}
                alt='AQAvit logo'
                className='img-fluid'
              />
            </div>
            <div className='col-12 col-sm-6 col-md-8 '>
              <p className='text-start'>
                The AQAvit test framework (<strong>A</strong>doptium <strong>Q</strong>uality <strong>A</strong>ssurance) can be found <a href='https://github.com/Adoptium/aqa-tests'>here</a>.
                There is also a <a href='https://blog.adoptopenjdk.net/2017/12/testing-java-help-count-ways/'>blog post and brief presentation</a> that explains what testing we run and how it fits into the overall delivery pipeline.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <VendorSelector /> */}
      <DownloadDropdowns updaterAction={getAllPkgsForVersion} marketplace Table={DownloadTable} />
    </section>
  </Layout>
)

export default DownloadPage

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
