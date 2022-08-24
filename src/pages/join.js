import * as React from 'react'
import HubspotForm from 'react-hubspot-form'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

const JoinPage = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Join the Eclipse Adoptium&reg; Working Group</h1>
        </div>
        <HubspotForm
          portalId='5413615'
          formId='78aa6887-715f-420c-97be-b97860899cec'
        />
      </div>
    </section>
  </Layout>
)

export default JoinPage

export const Head = () => (
  <Seo title='Join' />
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
