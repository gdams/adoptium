---
title: Eclipse Temurin 8u412, 11.0.23, 17.0.11, 21.0.3 and 22.0.1 Available
date: "2024-04-25"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u412, 11.0.23, 17.0.11 21.0.3 and 22.0.1 - our biggest release set so far. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u412-b08, 11.0.23+9, 17.0.11+9, 21.0.3+9 and 22.0.1+8. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

This is by far our biggest release to date with 54 version/platform combinations with five major versions of OpenJDK currently being supported for the first time. By comparison, the January release had 41 combinations. Despite this, we still managed to complete the releases more quickly than in the previous cycles.

## Security Vulnerabilities Resolved

The following table summarizes security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document) provided by the [OpenJDK Vulnerability Group](https://openjdk.org/groups/vulnerability/). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component | CVSS Score | v8 | v11 | v17 | v21 | v22 |
| :---                                                              | :---                | :----:      |  :----:   | :----:     | :----:     | :----:     |  :----:     |
| [CVE-2024-21094](https://nvd.nist.gov/vuln/detail/CVE-2024-21094) | hotspot/compiler    | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2024-21094&vector=AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N&version=3.1&source=Oracle))   |  X    | X      |  X    |   X |   |
| [CVE-2024-21085](https://nvd.nist.gov/vuln/detail/CVE-2024-21085) | core-libs/java.util | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2024-21085&vector=AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L&version=3.1&source=Oracle))   |  X    | X      |       |     |   |
| [CVE-2024-21011](https://nvd.nist.gov/vuln/detail/CVE-2024-21011) | hotspot/runtime     | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2024-21011&vector=AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:N/A:L&version=3.1&source=Oracle))   |  X    | X      |  X    |   X | X |
| [CVE-2024-21068](https://nvd.nist.gov/vuln/detail/CVE-2024-21068) | hotspot/compiler    | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2024-21068&vector=AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N&version=3.1&source=Oracle))   |  X    | X      |  X    |   X | X |
| [CVE-2024-21012](https://nvd.nist.gov/vuln/detail/CVE-2024-21012) | core-libs/java.net  | Low ([3.7](https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator?name=CVE-2024-21012&vector=AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N&version=3.1&source=Oracle))   |       | X      |  X    |   X | X |

Users should follow the [Adoptium policy for reporting vulnerability concerns](https://github.com/adoptium/adoptium/security/policy#security-policies-and-procedures) with this release.

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u412 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u412-b08), including [fixes in OpenJDK 8u412](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+openjdk8u412)

* [Temurin 11.0.23 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.23+9), including [fixes in OpenJDK 11.0.22](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+11.0.23)

* [Temurin 17.0.11 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.11+9), including [fixes in OpenJDK 17.0.10](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+17.0.11)

* [Temurin 21.0.3 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.3+9), including [fixes in OpenJDK 21.0.3](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+21.0.3)

* [Temurin 22.0.1 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-22.0.1+8), including [fixes in OpenJDK 22.0.1](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+22.0.1)

## New and Noteworthy

### JDK21 and above are built using a Devkit

For the first time, Temurin builds of JDK 21 and 22 for Linux (currently excluding riscv64) are built using a devkit. For those not familiar with it, the devkit is a build environment with a fixed compiler, toolchain, and sysroot which contains enough to build OpenJDK. We publish the CentOS-based devkits for Linux on x64, aarch64, and ppc64le for users to download, which makes it even easier to verify our reproducible builds by rebuilding from source if you wish to do so, providing trusted validation of our binaries. This is a great step forward in Temurin's secure development story.

### Availability of s390x Linux in jdk-22.0.1

For Linux/s390x there was an extra patch that we needed on top of 22.0.1+8 to pass our rigourous testing process. For this reason, the Linux/s390x version of Temurin is 22.0.3.1+1 instead of 22.0.3+8. The fix is [JDK22u PR 137](https://github.com/openjdk/jdk22u/pull/137) from [JBS bug JDK-8329545](https://bugs.openjdk.org/browse/JDK-8329545).

### ppc64 AIX JDK11 and JDK17 now available

Great news for AIX users! After a bit of a gap (11.0.19+7 from April 2023, and 17.0.8.1 from August 2023) the current release includes versions for AIX. The [issue with Harfbuzz](https://bugs.openjdk.org/browse/JDK-8313643) has now been resolved.

Note that JDK22 is not yet available for AIX. This is awaiting a compiler update in our infrastructure so we can build on OpenXL 17 and is being tracked under [Infrastructure issue 3208](https://github.com/adoptium/infrastructure/issues/3208).

### CA Certifcates updated

This release contains SSL CA certificates changes from March 13th which were updated under [this PR](https://github.com/adoptium/temurin-build/pull/3697#issuecomment-1994007189).

Summary of changes:

Additions:

* Add D-Trust S/MIME Roots - TBD (CA Program [Bug # 1781510](https://bugzilla.mozilla.org/show_bug.cgi?id=1781510))
* Add Deutsche Telekom Roots - TBD (CA Program [Bug # 1820592](https://bugzilla.mozilla.org/show_bug.cgi?id=1820592))

Removals:

* Remove Expired SECOM Root - [Bug #1865450](https://bugzilla.mozilla.org/show_bug.cgi?id=1865450)

### Refinements to SBOM Contents

We have added a new `components` section to the SBOM which lists more details on the specific versions of packages which were on the build machine at the time of building, in order to assist with enabling build reproducibility.

### dnf/apt installer support for Fedora 40, Ubuntu 24.04 (Noble Numbat) and Debian 13 (Trixie)

We have added support for these three distributions to our apt/yum repositories so they can be installed as per [our instructions](https://adoptium.net/en-GB/installation/linux/) without any adjustments.
