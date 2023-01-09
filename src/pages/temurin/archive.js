import * as React from 'react'
import LocalizedLink from '../../components/LocalizedLink'
import { FaArrowCircleRight } from 'react-icons/fa'

import Seo from '../../components/Seo'
import VersionSelector from '../../components/VersionSelector'
import ChecksumModal from '../../components/ChecksumModal'
import TemurinArchiveTable from '../../components/TemurinArchiveTable'
import { getAssetsForVersion } from '../../hooks'

const TemurinReleases = () => (
  <section className='py-5 text-center container'>
    <div className='row py-lg-5'>
      <div className='col-lg-10 col-md-8 mx-auto'>
        <h1 className='fw-light'>Archive</h1>
        <div className='row align-items-center pt-2'>
          <div className='callout callout-default text-start'>
            Please be aware that this archive contains old releases of Eclipse Temurin kept for reference. The <LocalizedLink to='/temurin/releases'>latest releases</LocalizedLink> should be used in development and production.
            <br />
            <br />
            <p class='text-warning'>Using old, superseded, or otherwise unsupported builds is not recommended.</p>
          </div>
          <div className='btn-group'>
            <LocalizedLink to='/temurin/releases' className='btn btn-primary m-3'>
              {/* <Trans>Latest Releases</Trans> <FaArrowCircleRight /> */}
            </LocalizedLink>
            <LocalizedLink to='/temurin/nightly' className='btn btn-secondary m-3'>
              {/* <Trans>Nightly Builds</Trans> <FaArrowCircleRight /> */}
            </LocalizedLink>
          </div>
        </div>
      </div>
    </div>
    <VersionSelector updater={getAssetsForVersion} releaseType='ga' Table={TemurinArchiveTable} />
    <ChecksumModal />
  </section>
)

export default TemurinReleases

export const Head = () => (
  <Seo title='Archive' />
)

