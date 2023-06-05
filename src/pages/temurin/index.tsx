import * as React from 'react'
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import Seo from '../../components/Seo'
import LatestTemurin from '../../components/LatestTemurin'

const TemurinHome = ({data}) => {
  const latestLTS = data.mostRecentLts.version
  return (
    <Layout>
      <section className='py-5 text-center container'>
        <div className='row py-lg-5'>
          <div className='col-lg-10 col-md-8 mx-auto'>
            <h1 className='fw-light'>Eclipse Temurin&trade;</h1>
            <div className='row align-items-center pt-3'>
              <div className='col-6 col-md-4'>
                <img
                  src='/images/temurin-light.png'
                  width={150}
                  alt='Temurin logo'
                  className='img-fluid'
                />
              </div>
              <div className='col-12 col-sm-6 col-md-8'>
                <p className='text-start'>
                  The Eclipse Temurin project provides code and processes that support the building of runtime binaries and associated
                  technologies that are high performance, enterprise-caliber, cross-platform, open-source licensed, and Java SE TCK-tested
                  for general use across the Java ecosystem.
                </p>
              </div>
              <LatestTemurin latestLTS={latestLTS} page='temurin' />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default TemurinHome

export const Head = () => (
  <Seo title='Eclipse Temurin' />
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
