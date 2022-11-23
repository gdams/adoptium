---
title: Reproducible Builds at Eclipse Adoptium
date: "2022-06-14T12:00:00+00:00"
author: andrewleonard
description: Eclipse Adoptium is working towards fully reproducible builds, this blog explains why
 they are needed and the work ongoing to achieve them.
tags:
  - Temurin
---

## Why do we need Reproducible Builds?

### Confidence in the high quality of the process to create the binaries

Being able to repeatably build the same OpenJDK source in an identical manner, producing
identical JDK binaries, shows confidence and quality in the production process.
The necessity for producing identical results is to know exactly what is going into the binary and the exact repeatability of the
build process, through what source and dependencies are used, to what compiler tooling is used.
The fact that a reproducible identical JDK binary can only be achieved by all these stringent controls,
shows the high quality of the processes used to bring the JDK binaries to the consumers.

### Secure Supply Chain

The reproduciblity of builds goes hand in hand with knowing exactly what goes into it, in other words 
the Software Bill of Materials (SBOM). This detailed knowledge means we know the source and provenance
of everything within and used to build the JDK. Thus any publicly published CVEs or vulnerabilities can be
quickly cross-checked with the JDK and build tooling used. For more information on SBOM's and their capabilities
see [CycloneDX](https://cyclonedx.org/capabilities/).

The other aspect of a secure supply chain is being able to absolutely identify a JDK binary as being secure,
this is especially true for Open Source community projects. The ability to repeatedly recreate a JDK binary
identically from the Adoptium build scripts provides a mechanism to achieve this. The Adoptium releases can
be re-built within multiple secure environments each with stringent bill of material checks, and then the
binaries compared to ensure byte for byte identical output. If the builds from the multiple secure environments
are identical to the one from the open-source projects, the likelihood of malicious tampering would be extremely low.

### Better consumer support capabilities for releases

Reproducibility necessitates a Software Bill of Materials (SBOM), from the secure hashes (SHAs) of all the component parts,
to the versions and SHAs of dependent components and the tooling used to build it. This means any requirement
to re-build with a specific patch can be sure to be rebuilt with the exact same source and tooling, with just
that one patch added. Also any support queries on known bugs or issues in any component or build tool can be
cross checked with the SBOM for any given release to determine if they are affected.

### Best practices for a Secure Software Development Framework (SSDF)

The Secure Software Development Framework [SSDF](https://csrc.nist.gov/Projects/ssdf) identifies a standard for
best practices for organizations to prepare, protect, and secure their software delivery processes. The
advantages provided by "Reproducible Builds" and "Software Bill of Materials" are placed in many of the
best practices identified within this standard.

### Improved Adoptium Build Script Validation

One aspect of a continually changing and improving open source community is ensuring any changes are good with
no side effects. For example ensuring changes to build scripts don't alter the JDK binary when they should not.
A guaranteed way of assuring that such changes do not, is to leverage reproducible builds. Simply comparing the
JDK binary output from before and after a build script change, and checking they are identical, proves the change
has not had any unforeseen effect.

## The progress at Eclipse Adoptium to achieve Reproducible Builds

### OpenJDK upstream contributions

The OpenJDK upstream community is fully supportive of reproducible builds, and over the past year many contributors
have been finding and resolving non-deterministic issues. At Eclipse Adoptium extensive work has been done to
achieve identical OpenJDK binaries on the Linux platforms in the jdk "head" stream (jdk-19+). This has involved
in-depth build comparison debugging to identify non-deterministic build issues, and any OpenJDK issues are then
contributed back upstream to the OpenJDK community project. These fixes have also been backported to the
jdk17u stream, since jdk-17 is a long term supported release.

OpenJDK contributions:
- [8284539: Configure --with-source-date=version fails on MacOS](https://github.com/openjdk/jdk/pull/8247)
- [8284661: Reproducible assembly builds without relative linking](https://github.com/openjdk/jdk/pull/8177)
- [8284437: Building from different users/workspace is not always deterministic ](https://github.com/openjdk/jdk/pull/8124)
- [8283315: jrt-fs.jar not always deterministically built](https://github.com/openjdk/jdk/pull/7852)
- [8279834: Alpine Linux fails to build when --with-source-date enabled](https://github.com/openjdk/jdk/pull/7025)
- [8279182: MakeZipReproducible ZipEntry timestamps not localized to UTC](https://github.com/openjdk/jdk/pull/6926)
- [8278766: Enable OpenJDK build support for reproducible jars and jmods using --date](https://github.com/openjdk/jdk/pull/6878)
- [8278163: --with-cacerts-src variable resolved after GenerateCacerts recipe setup](https://github.com/openjdk/jdk/pull/6680)
- [8278080: Add --with-cacerts-src='user cacerts folder' to enable deterministic cacerts generation](https://github.com/openjdk/jdk/pull/6647)
- [8277762: Allow configuration of HOTSPOT_BUILD_USER](https://github.com/openjdk/jdk/pull/6542)
- [8276766: Enable jar and jmod to produce deterministic timestamped content](https://github.com/openjdk/jdk/pull/6481)
- [8276764: Enable deterministic file content ordering for Jar and Jmod](https://github.com/openjdk/jdk/pull/6395)
- [8276743: Make openjdk build Zip Archive generation "reproducible"](https://github.com/openjdk/jdk/pull/6311)
- [8276654: element-list order is non deterministic](https://github.com/openjdk/jdk/pull/6278)

### Ongoing Eclipse Adoptium Reproducible Build projects

As well as continuing to identify and fix any OpenJDK non-deterministic issues, Eclipse Adoptium is continuing to
integrate changes into the build scripts to fully support reproducible builds.
- [Ongoing Adoptium reproducible build enhancements](https://github.com/adoptium/temurin-build/labels/reproducible-build)

The following capabilities are available at Eclipse Adoptium:

- Reproducible jdk-19 builds for all Temurin Linux architectures

The following are projects currently in-progress:

- Reproducible jdk-19 builds for MacOS : https://github.com/adoptium/temurin-build/issues/2899.
- Enhancing the Adoptium jenkins pipelines to integrate CycloneDX SBOM tooling to provide a standardized bill of materials framework for the Adoptium binaries : https://github.com/adoptium/temurin-build/issues/2900.
- Detailed dependency bill of materials analysis to fully extended the CycloneDX SBOM json : https://github.com/adoptium/temurin-build/issues/2785.

Future projects:

- Extending Temurin build scripts to support [reproducible jdk17u build pipelines](https://github.com/adoptium/temurin-build/issues/2977).
- Further exploring required fixes to non-deterministic build output on other platforms, e.g.[Windows](https://github.com/adoptium/temurin-build/issues/2978).
- Further tooling and reporting that leverages reproducible builds to help validate secure JDK binary output, e.g.[Comparison pipeline tooling](https://github.com/adoptium/ci-jenkins-pipelines/issues/301).

### Summary

Today's Enterprise Software needs to be more secure and safe from vulnerability attacks than ever before. Providing methods
for ensuring the security of the supply chain and ways of demonstrating the quality of the products delivered are essential.
The Eclipse Adoptium reproducible build and SBOM integration is providing these essemtial features for the community.

If your company is working on reproducible builds, or other methods for securing your supply chains, how are you approaching this problem?
How would your organization leverage Eclipse Adoptium reproducible builds?

Feedback and contributions to this initiative are most welcome.

