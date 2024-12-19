---
title: Eclipse Temurin 8u422, 11.0.24, 17.0.12, 21.0.4 and 22.0.2 Available
date: "2024-07-26"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u422, 11.0.24, 17.0.12 21.0.4 and 22.0.2 - surpassing April's release as the largest set of platforms published. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u422-b05, 11.0.24+8, 17.0.12+7, 21.0.4+7 and 22.0.2+9. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

This is by far our biggest release to date with 56 version/platform combinations with five major versions of OpenJDK currently being supported where JDK17 has 12 platforms and the other versions have 11 platforms being delivered. By comparison, the April release had 54 combinations. There was also a ~50% decrease in the number of people available to help with the July release activities due to vacations and other commitments. Despite this, we still managed to complete the releases more quickly than in the previous cycles.

## Security Vulnerabilities Resolved

The following table summarizes security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document) provided by the [OpenJDK Vulnerability Group](https://openjdk.org/groups/vulnerability/). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component | CVSS Score | v8 | v11 | v17 | v21 | v22 |
| :---                                                              | :---                | :----:      |  :----:   | :----:     | :----:     | :----:     |  :----:     |
| [CVE-2024-21147](https://nvd.nist.gov/vuln/detail/CVE-2024-21147) | hotspot/compiler    | High ([7.4](https://nvd.nist.gov/vuln/detail/CVE-2024-21147))   |  X    | X      |  X    |   X |  X |
| [CVE-2024-21145](https://nvd.nist.gov/vuln/detail/CVE-2024-21145) | client-libs/2d    | Medium ([4.8](https://nvd.nist.gov/vuln/detail/CVE-2024-21145))   |  X    | X      |  X    |   X |  X |
| [CVE-2024-21140](https://nvd.nist.gov/vuln/detail/CVE-2024-21140) | hotspot/compiler    | Medium ([4.8](https://nvd.nist.gov/vuln/detail/CVE-2024-21140))   |  X    | X      |  X    |   X |  X |
| [CVE-2024-21144](https://nvd.nist.gov/vuln/detail/CVE-2024-21144) | core-libs/java.util   | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21144))   |  X    | X      |      |    |   |
| [CVE-2024-21131](https://nvd.nist.gov/vuln/detail/CVE-2024-21131) | hotspot/runtime  | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21131))   |  X    | X      | X     |  X  |  X |
| [CVE-2024-21138](https://nvd.nist.gov/vuln/detail/CVE-2024-21138) | hotspot/runtime  | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21138))   |  X    | X      | X     |  X  |  X |

Users should follow the [Adoptium policy for reporting vulnerability concerns](https://github.com/adoptium/adoptium/security/policy#security-policies-and-procedures) with this release.

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u422 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u422-b05), including [fixes in OpenJDK 8u422](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+openjdk8u422)

* [Temurin 11.0.24 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.24+8), including [fixes in OpenJDK 11.0.24](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+11.0.24)

* [Temurin 17.0.12 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.12+7), including [fixes in OpenJDK 17.0.12](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+17.0.12)

* [Temurin 21.0.4 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.4+7), including [fixes in OpenJDK 21.0.4](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+21.0.4)

* [Temurin 22.0.2 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-22.0.2+9), including [fixes in OpenJDK 22.0.2](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+22.0.2)

## New and Noteworthy

### JDK8 x64 macOS Respin

Eclipse Temurin jdk8u422 x64 macOS is in a separate release named jdk8u422-b05.1 due to a respin that was required to fix a signing issue.

### Container Updates

#### Changes to Docker image external CA certs handling

There are slightly modified instructions to answer the question 'Can I add my internal CA certificates to the truststore?' in my Temurin container, especially when running your containers in a restricted-by-default non-root environment.  

If this describes your use case, please take a look at the [updated documentation](https://github.com/docker-library/docs/pull/2445/).

#### Removal of CentOS 7 Eclipse Temurin Images

CentOS 7 reached its End of Life (EOL) on June 30th, 2024. Given that end date, no further updates or support will be provided for CentOS 7, and to ensure the continued security and stability of your applications, we recommend migrating to the UBI9-minimal images.  For additional details, please read our recent [blog post](https://adoptium.net/blog/2024/07/removal-of-centos7-eclipse-temurin-images/) regarding this update.

#### Ubuntu Noble (24.04) is included and is now the default

Support for Ubuntu Noble (24.04) was added alongside the others, with a view to making it the only option for Temurin 23. Noble is now the default latest tag for Temurin containers.

This change could impact users as Ubuntu are no longer including the `adduser` package by default in the container images for 24.04 (Noble) where they were present in 22.04 (Jammy) so our switch from presenting 24.04 as the default for our images now has shown this issue.

The three ways to work around are:

1. Switch to using `useradd` - it is there by default and supplied as part of in the passwd package.

2. Install the `adduser` package in your images - though this requires an apt update in your Dockerfile first to pull down the repository information (which will add about 35MB to the size of your image) then `apt install adduser` to add in the package containing adduser (and addgroup).

3. Switch back to explicitly use the eclipse-temurin -jammy images, by appending `-jammy` to the end of their tag, for example, `eclipse-temurin:21-jdk-jammy`.

All are valid options but it may be beneficial for users start updating Dockerfiles to use the `adduser` command where possible to increase compatibility with a range of glibc-based base images. Fedora, for example, has an `adduser` command which is a symlink to useradd which operates in the same way as the Ubuntu `useradd`.

### Elevated security for Windows Installers now using Wix5

There are updates to the Temurin Windows installer to implement some security-related fixes and as part of these, the installer is now using Wix5.  There should be no behavioural differences, but users are asked to report any unknown side-effects by raising an [adoptium-support](https://github.com/adoptium/adoptium-support) issue.

### ppc64 AIX JDK22 now available

We are pleased to announce the availability of JDK22 on ppc64 AIX.  It was awaiting a compiler update in our infrastructure to allow being built on OpenXL 17.  Since [Infrastructure issue 3208](https://github.com/adoptium/infrastructure/issues/3208) was addressed, we were able to build, test, and deliver this platform.  For those planning on using this binary, it should be noted that it requires the [OpenXL 17 runtime](https://www.ibm.com/docs/en/openxl-c-and-cpp-aix/17.1.2?topic=reference-open-xl-cc-runtime-environment-filesets) (which also requires AIX 7.2 TL5 SP3 or later), as opposed to the XLC16 runtime required by JDK8 through JDK21.

### Ubuntu 24.04 added as a supported platform

Ubuntu 24.04 is added as a [supported platform](https://adoptium.net/supported-platforms/) after extensive testing on our Temurin build on it.  It is also available as an Temurin Docker image, as mentioned in the Container Updates section above.
