import * as React from 'react'
import { graphql } from 'gatsby'
import { FaMapSigns, FaArrowDown, FaBox, FaCogs, FaTools, FaLaptopCode } from 'react-icons/fa'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import DocumentationHeader from '../components/DocumentationHeader'
import DocumentationCard from '../components/DocumentationCard'

const DocumentationPage = ({ data }) => (
  <Layout>
    <Seo title='Documentation' />
    <DocumentationHeader data={data} />

    <div className='page-content'>
      <div className='container'>
        <div className='docs-overview py-5'>
          <div className='row justify-content-center'>
            <DocumentationCard
              title='Introduction'
              link='#'
              description='Section overview goes here. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
              Icon={FaMapSigns}
            />
            <DocumentationCard
              title='Installation'
              link='#'
              description='Section overview goes here. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.'
              Icon={FaArrowDown}
            />
            <DocumentationCard
              title='APIs'
              link='#'
              description='Section overview goes here. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.'
              Icon={FaBox}
            />
            <DocumentationCard
              title='Integrations'
              link='#'
              description='Section overview goes here. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.'
              Icon={FaCogs}
            />
            <DocumentationCard
              title='Utilities'
              link='#'
              description='Section overview goes here. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.'
              Icon={FaTools}
            />
            <DocumentationCard
              title='Web'
              link='#'
              description='Section overview goes here. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.'
              Icon={FaLaptopCode}
            />
          </div>
        </div>
      </div>
    </div>

  </Layout>
)

export default DocumentationPage

export const query = graphql`
  query ($language: String!) {
    localSearchDocs {
      index
      store
    }
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
