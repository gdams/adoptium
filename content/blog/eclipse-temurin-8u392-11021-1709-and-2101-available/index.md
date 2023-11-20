---
title: Eclipse Temurin 8u392, 11.0.21, 17.0.9 and 21.0.1 Available
date: "2023-11-21T12:00:00+00:00"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u392, 11.0.21, 17.0.9 and 21.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u392, 11.0.21, 17.0.9 and 21.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Security Vulerabilities Resolved

The following table summaries security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document) provided by the [OpenJDK Vulnerability Group](https://openjdk.org/groups/vulnerability/). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component | CVSS Score | v8 | v11 | v17 | v21 |
| :---                                                              | :---                |  :----:      |  :----:   | :----:     | :----:     | :----:     |
| [CVE-2023-22067](https://nvd.nist.gov/vuln/detail/CVE-2023-22067) | other-libs/corba    | Medium ([5.3](https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N))    | X          |            |           |           |
| [CVE-2023-22081](https://nvd.nist.gov/vuln/detail/CVE-2023-22081) | security-libs/javax.net.ssl    | Medium ([5.3](https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L))    | X          | X           | X          | X          |
| [CVE-2023-22025](https://nvd.nist.gov/vuln/detail/CVE-2023-22025) | hotspot/compiler    | Low ([3.7](https://www.first.org/cvss/calculator/3.1#CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N))    |           |            | X          | X          |

Users should follow the [Adoptium policy for reporting vulnerability concerns](https://github.com/adoptium/adoptium/security/policy#security-policies-and-procedures) with this release.

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u392 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u392-b08), including [fixes in OpenJDK 8u392](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+openjdk8u392)

* [Temurin 11.0.21 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.21+9), including [fixes in OpenJDK 11.0.21](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+11.0.21)

* [Temurin 17.0.9 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.9+9), including [fixes in OpenJDK 17.0.9](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+17.0.9)

* [Temurin 21.0.1 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.1+12), including [fixes in OpenJDK 21.0.1](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+21.0.1)

## New and Noteworthy

### PPC64le on JDK21 Shipped

Eclipse Temurin 21.0.1 PPC64le is shipped for the first time on JDK21.

### Windows Binary Respin

Eclipse Temurin 17.0.9 Windows are in a separate release named jdk-17.0.9+9.1 due to a respin that was required to fix a signing issue.

### AIX JDK11 and JDK17 Unavailable

Temurin 11 and 17 on AIX are not yet available due to [an issue with Harfbuzz](https://bugs.openjdk.org/browse/JDK-8313643) that will be resolved in the future with an update to the version of Harfbuzz included in the build.

### Windows Server 2012 not supported

Windows Server 2012 is no longer officially supported as Microsoft ended it extended support on October 10, 2023.

### MacOS Changes

MacOS 14 is supported for both macOS x64 and Apple Silicon. MacOS x64 10.15 is no longer supported.
