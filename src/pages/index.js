import * as React from 'react'
import { graphql } from 'gatsby'
import { Link, Trans, useTranslation } from 'gatsby-plugin-react-i18next'
import { StaticImage } from "gatsby-plugin-image"

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import LatestTemurin from '../components/LatestTemurin'

const IndexPage = () => {
  const { t } = useTranslation()
  return (
    <Layout>
      <Seo title={t('Home')} />
      <section id='home' className='home'>
        <div className='container-flex'>
          <div className='main-banner row justify-content-center align-items-center'>
            <div className='col-md-6 p-5'>
              <div className='w-75 m-auto'>
                <div data-aos='zoom-in-up' className='aos-init aos-animate'>
                  <div className='my-5 banner-title'>
                    <h1 className='display-4'>
                      <Trans>Prebuilt OpenJDK</Trans>
                      <br />
                      <Trans>Binaries for Free!</Trans>
                    </h1>
                  </div>
                  <p className='mt-3'>{t('Intro')}</p>
                </div>
                <LatestTemurin page='home' />
              </div>
            </div>
            <div className='col-md-6'>
              <StaticImage src="../images/servers.png" width={1200} alt="Image showing server, cloud and laptop" />
            </div>
          </div>
        </div>
        <div className='p-3 mt-4 mb-4 bg-light rounded-3 text-start'>
          <div className='container py-5'>
            <h2 className='text-pink'>The Adoptium Working Group</h2>
            <p>The AQAvit project gets its name from Adoptium Quality Assurance ‘AQA’ and ‘vit’ for vitality and speed.
              As the project engages with vendors and enterprise consumers, the test suite is expanded and improved to keep pace with the latest Java releases and to continuously raise the quality bar through collaboration and rigour.
            </p>
            <div className='btn-group'>
              <Link to='/join' className='btn btn-lg btn-primary m-3 text-white'>Join the Working group</Link>
              <Link to='/members' className='btn btn-lg btn-secondary m-3'>View our members</Link>
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
