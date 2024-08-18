import * as React from 'react'
import { graphql } from 'gatsby'
import { FaDownload, FaQuestion, FaGithub, FaBox, FaInfoCircle, FaGlobe, FaGem, FaUserFriends, FaLock, FaRocket } from 'react-icons/fa'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import DocumentationHeader from '../components/DocumentationHeader'
import DocumentationCard from '../components/DocumentationCard'

import { useTranslation } from 'gatsby-plugin-react-i18next';

const DocumentationPage = ({ data }) => {

  const {t} = useTranslation();

  return (
    <Layout>

    <DocumentationHeader data={data} />

    <div className='page-content'>
      <div className='container'>
        <div className='docs-overview py-5'>
          <div className='row justify-content-center'>
            <DocumentationCard
              title={t('docs.get.temurin', 'Get Temurin')}
              Icon={FaDownload}
              links={[
                { name: t('docs.install.temurin', 'Install Temurin'), link: '/installation' },
                { name: t('docs.download.temurin', 'Download Temurin'), link: '/temurin/releases' },
                { name: t('docs.container.images', 'Container Images'), link: 'https://hub.docker.com/_/eclipse-temurin' },
                { name: t('docs.release.archive', 'Release Archive'), link: '/temurin/archive' }
              ]}
            />
            <DocumentationCard
              title={t('docs.temurin.support', 'Temurin Support')}
              Icon={FaQuestion}
              links={[
                { name: t('docs.support.guide', 'Support Guide'), link: '/support' },
                { name: t('docs.commercial.support', 'Commercial Support'), link: '/temurin/commercial-support' },
                { name: t('docs.migration.guide', 'Migration Guide'), link: '/docs/migration' },
                { name: t('docs.supported.platforms', 'Supported Platforms'), link: '/supported-platforms' },
                { name: t('docs.submit.an.issue', 'Submit an Issue'), link: 'https://github.com/adoptium/adoptium-support/issues' }
              ]}
            />
            <DocumentationCard
              title={t('docs.aqavit.quality', 'AQAvit Quality')}
              Icon={FaGem}
              links={[
                { name: t('docs.about.eclipse.aqavit', 'About Eclipse AQAvit'), link: '/aqavit' },
                { name: t('docs.aqavit.quality.verification', 'AQAvit Quality Verification'), link: '/docs/qvs-policy' },
                { name: t('docs.aqavit.verification.guide', 'AQAvit Verification Guide'), link: '/docs/aqavit-verification' }
              ]}
            />
            <DocumentationCard
              title={t('docs.marketplace', 'Marketplace')}
              Icon={FaBox}
              links={[
                { name: t('docs.marketplace.downloads', 'Marketplace Downloads'), link: '/marketplace' },
                { name: t('docs.marketplace.listing.information', 'Marketplace Listing Information'), link: '/docs/marketplace-policy' },
                { name: t('docs.marketplace.publisher.guide', 'Marketplace Publisher Guide'), link: '/docs/marketplace-guide' }
              ]}
            />
            <DocumentationCard
              title={t('docs.contributing', 'Contributing')}
              Icon={FaUserFriends}
              links={[
                { name: t('docs.how.to.contribute', 'How To Contribute'), link: '/contributing' },
                { name: t('docs.first.time.support', 'First Timer Support'), link: '/docs/first-timer-support' },
                { name: t('docs.developer.nightly.builds', 'Developer Nightly Builds'), link: '/temurin/nightly' },
                { name: t('docs.join.our.slack.channel', 'Join our Slack Channel'), link: '/slack' },
                { name: t('docs.code.of.conduct', 'Code of Conduct'), link: 'https://github.com/adoptium/.github/blob/main/CODE_OF_CONDUCT.md' }
              ]}
            />
            <DocumentationCard
              title={t('docs.secure.software', 'Secure Software')}
              Icon={FaLock}
              links={[
                { name: t('docs.secure.software.pratices', 'Secure Software Practices'), link: '/docs/secure-software' },
                { name: t('docs.slsa.secure.supply.chain', 'SLSA Secure Supply Chain'), link: '/docs/slsa' },
                { name: t('docs.vulnerability.reporting', 'Vulnerability Reporting'), link: 'https://github.com/adoptium/adoptium/security/policy' },
                { name: t('docs.temurin.security.case.study', 'Temurin Security Case Study'), link: 'https://outreach.eclipse.foundation/adoptium-temurin-supply-chain-security?utm_campaign=Temurin%20Case%20Study&utm_source=website&utm_medium=adoptium%20docs' },
                { name: t('docs.reproducible.verification.builds', 'Reproducible Verification Builds'), link: '/docs/reproducible-verification-builds' }
              ]}
            />
            <DocumentationCard
              title={t('docs.governance', 'Governance')}
              Icon={FaGlobe}
              links={[
                { name: t('docs.about.eclipse.adoptium', 'About Eclipse Adoptium'), link: '/about' },
                { name: t('docs.working.group.members', 'Working Group Members'), link: '/members' },
                { name: t('docs.join.the.working.group', 'Join the Working Group'), link: '/join' },
                { name: t('docs.sponsor.the.project', 'Sponsor the Project'), link: 'https://www.eclipse.org/org/workinggroups/sponsorship/working-group-sponsorship-agreement.pdf' }
              ]}
            />
            <DocumentationCard
              title={t('docs.source.code', 'Source Code')}
              Icon={FaGithub}
              links={[
                { name: t('docs.adoptium.on.github', 'Adoptium on GitHub'), link: 'https://github.com/adoptium' },
                { name: t('docs.repository.overview', 'Repository Overview'), link: 'https://github.com/adoptium/adoptium/blob/main/README.md' },
                { name: t('docs.build.scripts', 'Build Scripts'), link: 'https://github.com/adoptium/temurin-build' },
                { name: t('docs.installer.code', 'Installer Code'), link: 'https://github.com/adoptium/installer' },
                { name: t('docs.mission.control.build', 'Mission Control Build'), link: 'https://github.com/adoptium/jmc-build' }
              ]}
            />
            <DocumentationCard
              title={t('docs.other.resources', 'Other Resources')}
              Icon={FaInfoCircle}
              links={[
                { name: t('docs.frequently.asked.questions', 'Frequently Asked Questions'), link: '/docs/faq' },
                { name: t('docs.adoptium.api', 'Adoptium API'), link: 'https://api.adoptium.net' },
                { name: t('docs.adoptium.blog', 'Adoptium Blog'), link: 'https://adoptium.net/blog' },
                { name: t('docs.support.us', 'Support Us'), link: '/support-us' }
              ]}
            />
            <DocumentationCard
              title={t('docs.branding', 'Branding')}
              Icon={FaRocket}
              links={[
                { name: t('docs.brand.guidelines', 'Brand Guidelines'), link: 'https://www.eclipse.org/org/artwork/guidelines/adoptium-brand-guidelines.pdf' },
                { name: t('docs.google.slide.template', 'Google Slide Template'), link: 'https://docs.google.com/presentation/d/1ChGhqZrAHCdk5S2Ii5s5RROng1saTaTtjZzsxWJ_MPA/copy' },
                { name: t('footer.logo.and.artwork', 'Logo and Artwork'), link: '/docs/logo-styleguide/' },
                { name: t('docs.download.buttons', 'Download Buttons'), link: '/temurin/buttons' },
                { name: t('docs.marketing.criteria', 'Marketing Criteria'), link: '/docs/marketing-criteria' }
              ]}
            />
          </div>
        </div>
      </div>
    </div>

  </Layout>
  )
}

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
