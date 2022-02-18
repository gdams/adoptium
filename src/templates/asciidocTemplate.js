import { graphql } from 'gatsby'
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
  const { relativePath } = file
  return (
    <Layout>
      <Seo title={document.title} />
      <section className='py-5 container'>
        <div className='markdown-container container-md'>
          <div className='markdown'>
            <h1 className='pb-4 fw-light text-center'>{document.title}</h1>
            {fields.slug === '/installation/' && (
              <section className='adopt-demo-container my-5'>
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
        <hr className='m-5'/>
        <AuthorsList authors={pageAttributes.authors.split(',')} />
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
