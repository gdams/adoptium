import * as React from 'react'
import { Link } from 'gatsby'
import { useQueryParam, StringParam } from 'use-query-params'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

const DownloadPage = () => {
  const [link] = useQueryParam('link', StringParam)
  let vendor
  if (link && link.includes('github.com/adoptium')) {
    vendor = 'Temurin'
  } else if (link && link.includes('cdn.azul.com')) {
    vendor = 'Azul'
  } else if (link && link.includes('aka.ms')) {
    vendor = 'Microsoft'
  } else if (link && link.includes('github.com/ibmruntimes')) {
    vendor = 'IBM'
  }
  return (
    <Layout>
      <Seo title='Thank You' />
      <section className='py-5 text-center container'>
        <div className='row py-lg-5'>
          <div className='col-lg-10 col-md-8 mx-auto'>
            <h1 className='fw-light'>Thank you for your download!</h1>
            {vendor === 'Temurin'
              ? <p className='py-2'>You are downloading an Eclipse Temurin build, the open-source community build from the Eclipse Adoptium Working Group.</p>
              : <p className='py-2'>You are downloading a build from <strong>{vendor}</strong>, a member of the Eclipse Adoptium Working Group.</p>}

            {link && <meta http-equiv='refresh' content={`0; url=${link}`} />}
            {link
              ? <p className='text-muted py-3'>If the download doesn't start in a few seconds, please <a href={link}>click here</a> to start the download.</p>
              : <p className='text-muted py-3'>Ooops - something doesn't seem quite right here. Please try again.</p>}

            {vendor === 'Temurin' && <p>Eclipse Temurin binaries are 100% free and open source and used by millions of developers every day. Here are three easy ways you can contribute toward the future development of Eclipse Adoptium projects and technologies.</p>}
            <p>Here are three easy ways you can contribute towards the future development of Eclipse Adoptium projects and technologies.</p>
            <h2 className='fw-light py-3'>Donate to the Eclipse Adoptium Working Group</h2>
            <p>You can make a one-time or regular targetted donation to the Adoptium Working Group by filling in the <a href='https://www.eclipse.org/org/workinggroups/sponsorship/working-group-sponsorship-agreement.pdf'>Working Group Sponsorship Agreement.</a></p>
            <h2 className='fw-light py-3'>Get involved</h2>
            <p>Whether you choose to report bugs, request features, or become a committer, you can help improve the technology for yourself and the rest of the community.</p>
            <h2 className='fw-light py-3'>Join the Working Group</h2>
            <Link to='/join' className='btn btn-lg btn-primary m-2'>Join the Working group</Link>
            <Link to='/members' className='btn btn-lg btn-primary m-2'>View our Members</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default DownloadPage
