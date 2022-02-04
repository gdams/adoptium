import * as React from "react"
import { withPrefix, Link } from 'gatsby';

import Layout from "../components/Layout"
import Seo from "../components/Seo"
import LatestTemurin from "../components/LatestTemurin"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
	  <section id="home" className="home" style={{ backgroundImage: `url(${withPrefix('/images/banner-bg.svg')})`}} >
        <div className="container">
			<div className="main-banner row justify-content-center align-items-center">
				<div className="col">
					<div data-aos="zoom-in-up" className="aos-init aos-animate">
						<div className="my-5 banner-title">
							<h1 className="text-white">
								Prebuilt OpenJDK
								<br/>
								Binaries for Free!
							</h1>
						</div>
						<p className="mt-3 text-white">
						Java™ is the world's leading programming language and platform.
						The Adoptium Working Group promotes and supports high-quality, TCK certified
						runtimes and associated technology for use across the Java™ ecosystem.
						Eclipse Temurin is the name of the OpenJDK distribution from Adoptium.
						</p>
						<div className="btn-group">
							<Link to="/join" className="btn btn-lg btn-primary m-3">Join the Working group</Link>
							<Link to="/members" className="btn btn-lg btn-secondary m-3">View our members</Link>
						</div>
					</div>
				</div>
				<div className="col-6">
					<LatestTemurin page="home"/>
				</div>
			</div>
		</div>
    </section>
  </Layout>
)

export default IndexPage
