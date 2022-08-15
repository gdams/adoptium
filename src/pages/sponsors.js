import * as React from 'react'
import { graphql } from 'gatsby'

import { SiGithubsponsors } from 'react-icons/si'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import MembersGrid from '../components/MembersGrid'
import { shuffle } from '../util/shuffle'

import Members from '../json/members.json'

const sponsors = []
const infra = []

for (const member of Members) {
  switch (member.tier) {
    case 'sponsor':
      sponsors.push(member)
      break
    case 'infra':
      infra.push(member)
      break
    default:
      break
  }
}

// Randomly mix up members logos
shuffle(sponsors)
shuffle(infra)

const SponsorsPage = () => (
  <Layout>
    <Seo title='Adoptium Project Sponsors' />
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Adoptium&reg; Project Sponsors</h1>
          <p className='lead text-muted'>Adoptium is proud to receive financial donations (both one-off and regularly) from the following companies.</p>
          <MembersGrid
            members={sponsors}
          />
          <p className='lead text-muted pt-5'>The Adoptium Working Group collaborates with the following companies who contribute various kinds of cloud and physical hardware.</p>
          <MembersGrid
            members={infra}
          />
          <div className='btn-group-vertical'>
            <a target='_blank' rel='noreferrer' href='https://www.eclipse.org/org/workinggroups/sponsorship/working-group-sponsorship-agreement.pdf' className='btn btn-lg btn-primary mt-5'>Want to become a Sponsor?</a>
            <a target='_blank' rel='noreferrer' href='https://github.com/sponsors/adoptium' className='btn btn-lg btn-outline-dark mt-3'><SiGithubsponsors color='#bf3989' /> Become a GitHub Sponsor!</a>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default SponsorsPage

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
