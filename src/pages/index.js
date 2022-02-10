import * as React from 'react'
import { withPrefix, graphql } from 'gatsby'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import LatestTemurin from '../components/LatestTemurin'

const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title={t('Home')} />
      <section id='home' className='home' style={{ backgroundImage: `url(${withPrefix('/images/banner-bg.svg')})` }}>
        <div className='container'>
          <div className='main-banner row justify-content-center align-items-center'>
            <div className='col'>
              <div data-aos='zoom-in-up' className='aos-init aos-animate'>
                <div className='my-5 banner-title'>
                  <h1 className='text-white'>
                    <Trans>Prebuilt OpenJDK</Trans>
                    <br />
                    <Trans>Binaries for Free!</Trans>
                  </h1>
                </div>
                <p className='mt-3 text-white'>{t('Intro')}</p>
                <div className='btn-group'>
                  <Link to='/join' className='btn btn-lg btn-primary m-3'>Join the Working group</Link>
                  <Link to='/members' className='btn btn-lg btn-secondary m-3'>View our members</Link>
                </div>
              </div>
            </div>
            <div className='col-6'>
              <LatestTemurin page='home' />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage

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
