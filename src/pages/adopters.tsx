import * as React from 'react'
import { graphql } from 'gatsby'

import { MembersProps } from './members' 
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import MembersGrid from '../components/MembersGrid'
import { shuffle } from '../util/shuffle'

let adopters: MembersProps[] = [
  {
    "name": "Red Hat",
    "logo": "redhat.svg",
    "tier": "adopter"
  },
  {
    "name": "Microsoft",
    "logo": "microsoft.svg",
    "tier": "adopter"
  },
]

// Randomly mix up adopters logos
adopters = shuffle(adopters)

const AdoptersPage = () => (
  <Layout>
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Eclipse Temurin&trade; Adopters Page</h1>
          <p className='lead text-muted'>Companies that use Eclipse Temurin in production.</p>
          <MembersGrid
            members={adopters}
          />
        </div>
      </div>
    </section>
  </Layout>
)

export default AdoptersPage

export const Head = () => (
  <Seo title='Eclipse Temurin Adopters Page' />
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
