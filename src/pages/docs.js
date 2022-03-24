import * as React from 'react'
import { graphql } from 'gatsby'
import { FaDownload, FaQuestion, FaGithub, FaBox, FaInfoCircle, FaGlobe, FaGem } from 'react-icons/fa'

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
              title='Download Temurin'
              Icon={FaDownload}
              links={[
                { name: 'Download Eclipse Temurin', link: '/temurin/releases' },
                { name: 'Install Eclipse Temurin', link: '/installation' },
                { name: 'Container Images', link: 'https://hub.docker.com/_/eclipse-temurin' },
                { name: 'Release Archive', link: '/temurin/archive' }
              ]}
            />
            <DocumentationCard
              title='Temurin Support'
              Icon={FaQuestion}
              links={[
                { name: 'Support', link: '/support' },
                { name: 'Migration Guide', link: '/docs/migration' },
                { name: 'Supported Platforms', link: '/supported-platforms' },
                { name: 'Submit an Issue', link: 'https://github.com/adoptium/adoptium-support/issues' }
              ]}
            />
            <DocumentationCard
              title='AQAvit Quality'
              links={[
                { name: 'About Eclipse AQAvit', link: '/aqavit' },
                { name: 'AQAvit Quality Verification', link: '/docs/qvs-policy' },
                { name: 'AQAvit Verification Guide', link: '/docs/aqavit-verification' }
              ]}
              Icon={FaGem}
            />
            {/* <DocumentationCard
              title='Marketplace'
              links={[
                { name: 'Marketplace Downloads', link: '/marketplace' },
                { name: 'Marketplace Listing Information', link: '/docs/marketplace-policy' },
                { name: 'Marketplace Publisher Guide', link: '/docs/marketplace-guide' }
              ]}
              Icon={FaBox}
            /> */}
            <DocumentationCard
              title='Contributing'
              Icon={FaGithub}
              links={[
                { name: 'First Timer Support', link: '/docs/first-timer-support' },
                { name: 'Sign the Contributor Agreement', link: '/docs/eca-sign-off' },
                { name: 'Join our Slack Channel', link: '/slack' },
                { name: 'Code of Conduct', link: 'https://github.com/adoptium/.github/blob/main/CODE_OF_CONDUCT.md' }
              ]}
            />
            <DocumentationCard
              title='Eclipse Adoptium'
              Icon={FaGlobe}
              links={[
                { name: 'About Eclipse Adoptium', link: '/about' },
                { name: 'Join the Working Group', link: '/join' },
                { name: 'Sponsor the Working Group', link: 'https://www.eclipse.org/org/workinggroups/sponsorship/working-group-sponsorship-agreement.pdf' }
              ]}
            />
            <DocumentationCard
              title='Other Resources'
              Icon={FaInfoCircle}
              links={[
                { name: 'Frequently Asked Questions', link: '/docs/faq' },
                { name: 'Adoptium API', link: 'https://api.adoptium.net' },
                { name: 'Adoptium Blog', link: 'https://blog.adoptium.net' }
              ]}
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
