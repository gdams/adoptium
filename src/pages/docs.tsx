import * as React from 'react'
import { graphql } from 'gatsby'
import { FaDownload, FaQuestion, FaGithub, FaBox, FaInfoCircle, FaGlobe, FaGem, FaUserFriends } from 'react-icons/fa'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import DocumentationHeader from '../components/DocumentationHeader'
import DocumentationCard from '../components/DocumentationCard'

const DocumentationPage = ({ data }) => (
  <Layout>

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
                { name: 'Release Archive', link: '/temurin/archive' },
                { name: 'Nightly Developer Builds', link: '/temurin/nightly' }
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
              Icon={FaGem}
              links={[
                { name: 'About Eclipse AQAvit', link: '/aqavit' },
                { name: 'AQAvit Quality Verification', link: '/docs/qvs-policy' },
                { name: 'AQAvit Verification Guide', link: '/docs/aqavit-verification' }
              ]}
            />
            <DocumentationCard
              title='Marketplace'
              Icon={FaBox}
              links={[
                { name: 'Marketplace Downloads', link: '/marketplace' },
                { name: 'Marketplace Listing Information', link: '/docs/marketplace-policy' },
                { name: 'Marketplace Publisher Guide', link: '/docs/marketplace-guide' }
              ]}
            />
            <DocumentationCard
              title='Contributing'
              Icon={FaUserFriends}
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
                { name: 'Working Group Members', link: '/members' },
                { name: 'Join the Working Group', link: '/join' },
                { name: 'Sponsor the Working Group', link: 'https://www.eclipse.org/org/workinggroups/sponsorship/working-group-sponsorship-agreement.pdf' }
              ]}
            />
            <DocumentationCard
              title='Source Code'
              Icon={FaGithub}
              links={[
                { name: 'Adoptium on GitHub', link: 'https://github.com/adoptium' },
                { name: 'Repository Overview', link: 'https://github.com/adoptium/adoptium/blob/main/README.md' },
                { name: 'Build Scripts', link: 'https://github.com/adoptium/temurin-build' },
                { name: 'Installer Code', link: 'https://github.com/adoptium/installer' },
                { name: 'Mission Control Build', link: 'https://github.com/adoptium/jmc-build' }
              ]}
            />
            <DocumentationCard
              title='Other Resources'
              Icon={FaInfoCircle}
              links={[
                { name: 'Frequently Asked Questions', link: '/docs/faq' },
                { name: 'Adoptium API', link: 'https://api.adoptium.net' },
                { name: 'Adoptium Blog', link: 'https://blog.adoptium.net' },
                { name: 'Logo Styleguide', link: '/docs/logo-styleguide' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>

  </Layout>
)

export default DocumentationPage

export const Head = () => (
  <Seo title='Documentation' />
)

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
