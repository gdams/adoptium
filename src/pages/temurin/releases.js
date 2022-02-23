import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { FaArrowCircleRight } from 'react-icons/fa'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import DownloadDropdowns from '../../components/DownloadDropdowns'
import DownloadTable from '../../components/TemurinDownloadTable'
import ChecksumModal from '../../components/ChecksumModal'
import { loadLatestAssets } from '../../hooks'

const TemurinReleases = () => (
  <Layout>
    <Seo title='Latest release' />
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-10 col-md-8 mx-auto'>
          <h1 className='fw-light'>Latest release</h1>
          <div className='row align-items-center pt-3'>
            <div className='btn-group-vertical col-6 mx-auto'>
              <Link to='/temurin/archive' className='btn btn btn-primary mt-3'>
                Build archive <FaArrowCircleRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <DownloadDropdowns updaterAction={loadLatestAssets} marketplace={false} Table={DownloadTable} />
      <ChecksumModal />
    </section>
  </Layout>
)

export default TemurinReleases

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
