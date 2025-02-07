---
title: Eclipse Temurin 8u442, 11.0.26, 17.0.14, 21.0.6 and 23.0.2 Available
date: "2025-02-07"
author: Haroon Khel, PMC
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u442, 11.0.26, 17.0.14, 21.0.6 and 23.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u442-b06, 11.0.26+4, 17.0.14+7, 21.0.6+7 and 23.0.2+7. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u442 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u442-b06)

* [Temurin 11.0.26 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.26+4)

* [Temurin 17.0.14 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.14+7)

* [Temurin 21.0.6 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.6+7)

* [Temurin 23.0.2 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-23.0.2+7)

## New and Noteworthy

### Linux installation packages improvements

The process for generating our Linux packages (available using these instructions) has been significantly improved in this release. During previous release cycles, the .deb, .rpm & .apk installer packages have not been produced until all architectures for each of the in-support Temurin versions have been completely tested and shipped as .tar.gz files.

As of this release cycle new automation has been put in place which allows the Linux packages to be built and published at the same time as the release tarballs are published to GitHub, so they will be available much sooner than before.

### JSF signing for SBOMs

In this release we introduced JSF signing and verification on the SBOM json files produced with the JDK binaries. Alongside the GPG signature, this added JSF signature increases the integrity of our SBOM files.

### SLSA level 3 compliance for Windows

In addition to the current SLSA level 3 compliance that was previously available on macOS and Linux platforms, Adoptium is proud to announce SLSA level 3 compliance on Windows too for the first time, which means that all of our primary platforms are now compliant. More information on SLSA build levels can be found here https://slsa.dev/spec/v1.0/levels#build-l3

### Redist DLLs for versions

The Temurin Windows binaries now include the very latest Microsoft Visual C++ Redistributables from:

- Visual Studio 2022 version 14.40.33807
- Windows 11 SDK version 10.0.26100.1742 UCRT
