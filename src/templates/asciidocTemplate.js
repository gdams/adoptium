import { graphql } from "gatsby"
import React, { useEffect } from "react"

import highlightCode from '../util/highlightCode'
import asciidocFormatter from '../util/asciidocFormatter'
import Layout from "../components/Layout";
import EditLink from '../components/EditLink';
import AuthorsList from '../containers/AuthorList';
import InstallTabs from '../components/InstallTabs';
import Seo from "../components/Seo"

export default function Template({ data }) {
  useEffect(() => {
    asciidocFormatter()
    highlightCode()
  })
  const { asciidoc } = data // data.asciidoc holds our data
  const { document, fields, html, pageAttributes } = asciidoc
  return (
    <Layout>
    <Seo title={document.title} />
    <section className="py-5 container">
    <div className="markdown-container container-md">
      <div className="markdown">
        <h1 className="pb-4 fw-light text-center">{document.title}</h1>
        {fields.slug === "/installation/" && (
          <section className="adopt-demo-container my-5">
            <div className="adopt-demo mx-auto">
              <InstallTabs />
            </div>
          </section>
        )}
        <div
          className="asciidoc-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
    <AuthorsList authors={pageAttributes.authors.split(',')} />
    <EditLink relativePath={fields.slug} />
    </section>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
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
  }
`