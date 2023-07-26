---
title: Eclipse Temurin 8u382, 11.0.20, 17.0.8 and 20.0.2 Available
date: "2023-07-28T12:00:00+00:00"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u382, 11.0.20, 17.0.8 and 20.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u382, 11.0.20, 17.0.8 and 20.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases).

## Security Vulerabilities Resolved

The following table summaries security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component | CVSS Score | v8 | v11 | v17 | v20 |
| :---                                                              | :---                |  :----:      |  :----:   | :----:     | :----:     | :----:     |
| [CVE-2023-25193](https://nvd.nist.gov/vuln/detail/CVE-2023-25193) | client-libs/2d      | High ([7.5](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-25193))   |           | X          | X          | X          |
| [CVE-2023-22041](https://nvd.nist.gov/vuln/detail/CVE-2023-22041) | hotspot/compiler    | Medium ([5.1](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22041)) |           | X          | X          | X          |
| [CVE-2023-22044](https://nvd.nist.gov/vuln/detail/CVE-2023-22044) | hotspot/compiler    | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22044))    |           |            | X          | X          |
| [CVE-2023-22045](https://nvd.nist.gov/vuln/detail/CVE-2023-22045) | hotspot/compiler    | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22045))    | X         | X          | X          | X          |
| [CVE-2023-22049](https://nvd.nist.gov/vuln/detail/CVE-2023-22049) | core-libs/java.io   | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22049))    | X         | X          | X          | X          |
| [CVE-2023-22036](https://nvd.nist.gov/vuln/detail/CVE-2023-22036) | core-libs/java.util | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22036))    |           | X          | X          | X          |
| [CVE-2023-22006](https://nvd.nist.gov/vuln/detail/CVE-2023-22006) | core-libs/java.net  | Low ([3.1](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2023-22006))    |           | X          | X          | X          |

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u382 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u382-b05), including [fixes in OpenJDK 8u382](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+openjdk8u382)

* [Temurin 11.0.20 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.20+8), including [fixes in OpenJDK 11.0.20](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+11.0.20)

* [Temurin 17.0.8 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.8+7), including [fixes in OpenJDK 17.0.8](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+17.0.8)

* [Temurin 20.0.2 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-20.0.2+9), including [fixes in OpenJDK 20.0.2](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+20.0.2)

## New and Noteworthy

### No JDK 20 binaries for Linux PPC64le, s390x, arm32, and AIX ppc64

Adoptium will not be releasing JDK 20.0.2 for Linux PPC64le, s390x, arm32, and AIX ppc64 due to issues found in testing. These platforms may be released at a later date if the issues are resolved in the implementation.
