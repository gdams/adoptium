---
title: Eclipse Temurin 22 Available
date: "2024-01-26"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 22.0.0+36. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium announces the availability of Eclipse Temurin 22.0.0+36. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Security Vulnerabilities Resolved

The following table summaries security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document) provided by the [OpenJDK Vulnerability Group](https://openjdk.org/groups/vulnerability/). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component | CVSS Score | v8 | v11 | v17 | v21 | v22 |
| :---                                                              | :---                |  :----:      |  :----:   | :----:     | :----:     | :----:     | :----:     |
|  |      |   |           |            |            |            |

Users should follow the [Adoptium policy for reporting vulnerability concerns](https://github.com/adoptium/adoptium/security/policy#security-policies-and-procedures) with this release.

## Features and Updates

This release contains the following features and updates.

* [Temurin jdk-22+36 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-22+36), including [fixes in OpenJDK jdk-22+36](https://bugs.openjdk.org/browse/JDK-8325999?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2022%20AND%20status%20%3D%20Resolved).

## New and Noteworthy

### macOS min/max version updated to 11.00.00

As per [JDK-8317970](https://bugs.openjdk.org/browse/JDK-8317970), the target macOS version for macosx-x64 is moved up to 11.x since macOS 10.x is no longer receiving updates and in alignment with macosx aarch64.

### ppc64 AIX and s390x Linux Unavailable for JDK 22

Temurin jdk-22+36 for the AIX and s390x Linux platform are unavailable.  A small number of test failures indicated that there is need to investigate and update the upstream code base.  We hope that these platforms on JDK 22 will be ready for release for the April CPU.
