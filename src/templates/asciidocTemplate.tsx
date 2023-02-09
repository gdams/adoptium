import { graphql } from 'gatsby'
import { convert } from 'html-to-text'
import React, { useEffect } from 'react'

import highlightCode from '../util/highlightCode'
import asciidocFormatter from '../util/asciidocFormatter'
import Layout from '../components/Layout'
import EditLink from '../components/EditLink'
import AuthorsList from '../components/AuthorList'
import InstallTabs from '../components/InstallTabs'
import Seo from '../components/Seo'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/css/v4-shims.min.css'

const AsciidocTemplate = ({ data }) => {
  useEffect(() => {
    asciidocFormatter()
    highlightCode()
  })
  const { asciidoc } = data // data.asciidoc holds our data
  const { document, fields, html, pageAttributes } = asciidoc
  const pageAuthorList = pageAttributes.authors || ''
  const { relativePath } = fields
  return (
    <Layout>
      <section className='py-5 px-3'>
        <div className='asciidoc-container container-adoc row' id='asciidoc-container'>
          <div className='col-lg-3 hide-on-mobile'>
            {/* Leaving space for a table of contents (side bar) */}
          </div>
          <div className='asciidoc col-lg-6 col-md-12'>
            <h1 className='pb-4 fw-light text-center' dangerouslySetInnerHTML={{ __html: document.title }} />
            {fields.slug === '/installation/' && (
              <section className='adopt-demo-container hide-on-mobile my-5'>
                <div className='adopt-demo mx-auto'>
                  <InstallTabs />
                </div>
              </section>
            )}
            <div
              className='asciidoc-content'
              dangerouslySetInnerHTML={{ __html: html }}
            />
          <hr className='m-5' />
          <AuthorsList authors={pageAuthorList.split(',')} />
          <EditLink relativePath={relativePath} />
          </div>
          <div className='col-lg-3 hide-on-mobile'></div>
        </div>
      </section>
    </Layout>
  )
}

export default AsciidocTemplate;

export const Head = ({ data: { asciidoc: { document } } }) => {
  return (
    <Seo
      title={convert(document.title)}
    />
  );
};

export const pageQuery = graphql`
  query($locale: String!, $title: String!, $language: String!) {
    asciidoc(fields: {locale: {eq: $locale}}, document: {title: {eq: $title}}) {
      html
      document {
        title
        main
      }
      fields {
        slug
        relativePath
      }
      pageAttributes {
        authors
      }
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
