---
title: SLSA level 2 compliance for Eclipse Temurin
date: "2022-11-25T17:00:00+00:00"
author: sxa
description: Eclipse Temurin by Adoptium is compliant with level 2 of the SLSA secure development framework.
tags:
  - temurin
  - security
---

## Introduction to SLSA

[SLSA](https://slsa.dev) is a framework with individual levels that software
producers can work towards to make their software more secure, and consumers
can make decisions based on the software package’s security posture.

What does this mean in practice? Adoptium meets level 1 and 2 of the
[SLSA v0.1 specification](http://slsa.dev/spec/v0.1/levels) for the
production of Eclipse Temurin and the
[Eclipse Temurin Project page](https://projects.eclipse.org/projects/adoptium.temurin/)
now has a badge to indicate this.

## SLSA Level 1

Level 1 means that the build process is full scripted and automated.  We are
now producing and distributing Software Bill Of Material (SBOM) documents
which are shipped alongside our release builds.  We have been compliant with
level 1 for some time: The level 1 requirements are:

- **Build - scripted build**: Our build steps are defined completely by the
  Jenkins pipelines from the [ci-jenkins-pipelines](https://github.com/adoptium/ci-jenkins-pipelines) repository and the
  underlying scripts run on the build machines from the
  [temurin-build](https://github.com/adoptium/temurin-build)
  repository - starting at
  [make-adopt-build-farm.sh](https://github.com/adoptium/temurin-build/blob/master/build-farm/make-adopt-build-farm.sh)

- **Provenance - available**: We create an SBOM in
  [OWASP CycloneDX format](https://owasp.org/www-project-cyclonedx/)
  along with our releases which contains all of the information about how
  the builds are produced, which should allow someone to rebuild if required
  for any reason.  This includes the full set of parameters which we use to
  the makejdk_any_platform.sh script (invoked from
  make-adopt-build-farm.sh), the source repository tags (`scmRef`) which was
  used by the build process to produce the builds, the output from the
  openjdk `configure` invocation and various other pieces of information.
  We are continually evolving the specific details which we include in the
  SBOM.  If you want to join in the discussion on the content, you can find
  the conversation in
  [temurin-build#3013](https://github.com/adoptium/temurin-build/issues/3013)
  or talk to us in the #secure-dev slack channel in the
  [Adoptium workspace](https://adoptium.net/slack/).

## SLSA Level 2

Level 2 adds in additional requirements to provide some tamper resistance of
the build process, including having all of our code version controlled.  We
achieve this through our use of GitHub for both the OpenJDK product code and
the code that runs the build and distribution processes through our Jenkins
CI server.  The requirements here are:

- **Source - Version controlled**. All of our source code is stored in GitHub in
  the jdkXX repositories such as
  [jdk17u](https://github.com/adoptium/jdk17u/), which we mirror from the
  [openjdk project](https://github.com/openjdk). These
  are version controlled and have tags for each release which we build from.
  Contributors agree to the rules of the
  [Eclipse Contributor Agreement (ECA)](https://www.eclipse.org/legal/ECA.php)

- **Build - Build service**. All of the build steps are run using our Jenkins
  build service (https://ci.adoptium.net) which is used to
  perform the builds, generate the SBOMs, and build the installers where
  applicable. The output from the builds are then posted into GitHub release
  repositories named as temurinXX-binaries (e.g.
  [temurin17-binaries](https://github.com/adoptium/temurin17-binaries) and
  also exposed via our API and download pages.

- **Provenance - Authenticated**. We sign the SBOMs for the latest set of
  releases to guarantee their authenticity.

- **Provenance - service generated**. The GPG signatures for the binary
  are generated as an integral part of the build process for the binaries
  and will be done in the same way for the signing of the SBOMs - the current
  SBOM signing was done retrospectively in our Jenkins instance. The Jenkins
  instance hosts the private keys from the Eclipse Foundation which are used
  to perform the signature generation.

## Next steps for the project

Are we finished? Absolutely not! We are continuing to work towards
achieving the higher levels of SLSA and have already achieved many of the
requirements of higher levels. But for now, we are proud to be able to claim
full compliance with SLSA level 2.

We are currently tracking forward progress to meeting the higher level
requirements at
[adoptium#160](https://github.com/adoptium/adoptium/issues/160). We already
meet some of the requirements of higher levels - in some cases there are
differences in the criteria which we meet on different platforms. For
example, we have worked to [make our build process reproducible](https://blog.adoptium.net/2022/06/adoptium-reproducible-builds/)
and on Linux, Windows and macOS for JDK17 (LTS) and JDK19+ we have created
and shipped binary reproducible builds with the exception of some instances
where the class data sharing archive is not identical.

We are working towards implementing the other parts of the higher SLSA
levels which we do not yet meet.  Some of these, such as the
[Ephemeral environment requirement](https://slsa.dev/spec/v0.1/requirements#ephemeral-environment),
may take some time to achieve on all platforms and
you can follow the current status in [the SLSA tracking
issue](https://github.com/adoptium/adoptium/issues/160), or on the
[SLSA page](https://adoptium.net/docs/slsa/) on our site.
