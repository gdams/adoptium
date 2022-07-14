import { graphql } from 'gatsby'
import { convert } from 'html-to-text'
import React, { useEffect } from 'react'

import highlightCode from '../util/highlightCode'
import asciidocFormatter from '../util/asciidocFormatter'
import Layout from '../components/Layout'
import EditLink from '../components/EditLink'
import AuthorsList from '../containers/AuthorList'
import InstallTabs from '../components/InstallTabs'
import Seo from '../components/Seo'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fortawesome/fontawesome-free/css/v4-shims.min.css'

export default function Template ({ data }) {
  useEffect(() => {
    asciidocFormatter()
    highlightCode()
  })
  const { asciidoc, file } = data // data.asciidoc holds our data
  const { document, fields, html, pageAttributes } = asciidoc
  const pageAuthorList = pageAttributes.authors || ''
  const { relativePath } = file
  return (
    <Layout>
      <Seo title={convert(document.title)} />
      <section className='py-5 container'>
        <div className='asciidoc-container container-adoc' id='asciidoc-container'>
          <div className='asciidoc'>
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
          </div>
        </div>
        <hr className='m-5' />
        <AuthorsList authors={pageAuthorList.split(',')} />
        <EditLink relativePath={relativePath} />
      </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!, $language: String!) {
    asciidoc(id: { eq: $id }) {
      html
      document {
        title
        main
      }
      fields {
        slug
      }
      pageAttributes {
        authors
      }
    }
    file(childAsciidoc: {id: {eq: $id }}) {
      relativePath
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
