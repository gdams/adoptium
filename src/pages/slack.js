import * as React from 'react'

import Layout from '../components/Layout'
import Seo from '../components/Seo'

const JoinPage = () => (
  <Layout>
    <Seo title='Slack Signup' />
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-8 col-md-8 mx-auto'>
          <h1 className='fw-light'>Join our Slack channel!</h1>
        </div>
        <form
          action='https://docs.google.com/forms/u/1/d/e/1FAIpQLSdxrFvVu49Nx0zQKZAfHe_43H3H6BOhRiRXayQjjAmlbnSJfg/formResponse'
          method='post'
          target='_blank'
        >
          <div className='form-group'>
            <label for='exampleInputEmail1'>Email address</label>
            <input
              autocomplete='email'
              name='emailAddress'
              placeholder='Your email'
              type='email'
              className='form-control'
              required
            />
            <button
              className='btn btn-primary mt-3'
              type='submit'
            >
              Invite Me!
            </button>
          </div>
        </form>
      </div>
    </section>
  </Layout>
)

export default JoinPage
