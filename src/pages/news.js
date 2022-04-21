import * as React from 'react'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Seo from '../components/Seo'
import PageHeader from '../components/PageHeader'

import { news, events } from '../json/news.json'

const NewsPage = () => (
  <Layout>
    <Seo title='News & Events' />
    <PageHeader title='News & Events' subtitle='Follow the latest updates from the Eclipse Adoptium Project' />
    <section className='text-center container-flex'>
      <div className='row py-lg-5 w-75 m-auto'>
        <div className="row pt-5">
          <div className="col-md-5 text-start">
            <h2>News</h2>
            {news.map(
              (item, i) =>
                  item && (
                    <div key={news.title}>
                      <h5><a target='_blank' rel='noreferrer' href={item.link}>{item.title}</a></h5>
                      <p className="m-0 fw-bold">{item.date}</p>
                      <p className='text-muted lh-sm'>{item.description}</p>
                    </div>
              )
            )}
          </div>
          <div className="col-md-1"></div>
          <div className="col-md-6">
            <h2>Upcoming Events</h2>
            <Timeline position="alternate">
            {events.map(
              (item, i) =>
                  item && (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <p className='text-muted lh-1'>{item.date}</p>
                    <h6 className='fw-bold'>
                      <a target='_blank' rel='noreferrer' href={item.link}>{item.name}</a>
                    </h6>
                    <p className='fw-light lh-1'>{item.description}</p>
                  </TimelineContent>
                </TimelineItem>
              )
            )}
            </Timeline>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default NewsPage

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
