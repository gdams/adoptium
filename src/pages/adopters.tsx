import * as React from 'react'
import { graphql } from 'gatsby'

import { MembersProps } from './members' 
import Layout from '../components/Layout'
import Seo from '../components/Seo'
import MembersGrid from '../components/MembersGrid'
import { shuffle } from '../util/shuffle'

import Adopters from '../json/adopters.json'

let adopters: MembersProps[] = Adopters

// Randomly mix up adopters logos
adopters = shuffle(adopters)

const AdoptersPage = () => (
  <Layout>
<section className="py-5 text-center container">
  <div className="row py-lg-5">
    <div className="col-lg-8 col-md-8 mx-auto">
      <h1 className="fw-light">Eclipse Temurin&trade; Adopters Page</h1>
      <p className="lead text-muted">
        Companies that use Eclipse Temurin in production.
      </p>
      <MembersGrid members={adopters} />
      <a
        className="btn btn-secondary mt-5"
        data-bs-toggle="collapse"
        href="#getListed"
        role="button"
        aria-expanded="false"
        aria-controls="getListed"
      >
        How Can I Get My Logo Displayed?
      </a>

      <div className="collapse" id="getListed">
        <div className="card card-body text-start">
          <p>
            You can easily add your organization’s logo to our list of adopters
            by creating an issue or by submitting a pull request.
          </p>
          <p className='h3'>Option 1 - Open an Issue</p>
          <ol>
            <li>
              Go to{" "}
              <a href="https://gitlab.eclipse.org/eclipsefdn/it/api/eclipsefdn-project-adopters/-/issues/">
                https://gitlab.eclipse.org/eclipsefdn/it/api/eclipsefdn-project-adopters/-/issues/
              </a>
              .
            </li>
            <li>Select the ‘New Issue’ button.</li>
          </ol>
          <p>
            When submitting a pull request, please make the following changes to
            the eclipsefdn-project-adopters'{" "}
            <a href="https://gitlab.eclipse.org/eclipsefdn/it/api/eclipsefdn-project-adopters">
              codebase
            </a>
            :
          </p>
          <ol>
            <li>
              Attach logo files to an issue by dragging and dropping them in the
              text editor of the form.
            </li>
          </ol>
          <p className='h3'>Option 2 - Submit a Pull Request</p>
          <ol>
            <li>
              Go to{" "}
              <a href="https://gitlab.eclipse.org/eclipsefdn/it/api/eclipsefdn-project-adopters/">
                https://gitlab.eclipse.org/eclipsefdn/it/api/eclipsefdn-project-adopters
              </a>
              .
            </li>
            <li>Fork the repository.</li>
            <li>
              Update the adopter data file config/adopters.json. If your
              organization supports multiple projects, another project can be
              added to the projects list within the organization’s node. The
              values in this list should be the ID of the project.
            </li>
            <li>
              Add a colored and a white organization logo to{" "}
              <code>static/assets/images/adopters</code>.
            </li>
            <li>Submit the pull request.</li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</section>;

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
