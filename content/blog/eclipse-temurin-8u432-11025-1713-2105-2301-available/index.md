---
title: Eclipse Temurin 8u432, 11.0.25, 17.0.13, 21.0.5 and 23.0.1 Available
date: "2024-10-28"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u432, 11.0.25, 17.0.13, 21.0.5 and 23.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u432-b06, 11.0.25+9, 17.0.13+11, 21.0.5+11 and 23.0.1+11. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Security Vulnerabilities Resolved

The following table summarizes security vulnerabilities fixed in this release cycle. The affected Temurin version streams are noted by an 'X' in the table. Each line shows the [Common Vulnerabilities and Exposures (CVE) vulnerability database](https://nvd.nist.gov/vuln) reference and [Common Vulnerability Scoring System (CVSS) v3.1 base score](https://www.first.org/cvss/v3.1/specification-document) provided by the [OpenJDK Vulnerability Group](https://openjdk.org/groups/vulnerability/). Note that defense-in-depth issues are not assigned CVEs.

| CVE Identifier  | Component                       | CVSS Score | v8 | v11 | v17 | v21 | v23 |
| :-------------- | :------------------------------ | :--------: | :-: | :-: | :-: | :-: | :-: |
| [CVE-2024-21235](https://nvd.nist.gov/vuln/detail/CVE-2024-21235) | hotspot/compiler              | Medium ([4.8](https://nvd.nist.gov/vuln/detail/CVE-2024-21235)) |  X  |  X  |  X  |  X  |  X  |
| [CVE-2024-21208](https://nvd.nist.gov/vuln/detail/CVE-2024-21208) | core-libs/java.net           | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21208))    |  X  |  X  |  X  |  X  |  X  |
| [CVE-2024-21210](https://nvd.nist.gov/vuln/detail/CVE-2024-21210) | hotspot/compiler              | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21210))    |  X  |  X  |  X  |  X  |  X  |
| [CVE-2024-21217](https://nvd.nist.gov/vuln/detail/CVE-2024-21217) | core-libs/java.io:serialization | Low ([3.7](https://nvd.nist.gov/vuln/detail/CVE-2024-21217)) |  X  |  X  |  X  |  X  |  X  |

Users should follow the [Adoptium policy for reporting vulnerability concerns](https://github.com/adoptium/adoptium/security/policy#security-policies-and-procedures) with this release.

## Fixes and Updates

This release contains the following fixes and updates.

* [Temurin 8u432 release notes](https://adoptium.net/temurin/release-notes/?version=jdk8u432-b06), including [fixes in OpenJDK 8u422](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+openjdk8u422)

* [Temurin 11.0.25 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.25+9), including [fixes in OpenJDK 11.0.25](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+11.0.25)

* [Temurin 17.0.13 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.13+11), including [fixes in OpenJDK 17.0.13](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+17.0.13)

* [Temurin 21.0.5 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-21.0.5+11), including [fixes in OpenJDK 21.0.5](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+21.0.5)

* [Temurin 23.0.1 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-23.0.1+11), including [fixes in OpenJDK 23.0.1](https://bugs.openjdk.org/issues/?jql=project+%3D+JDK+AND+fixVersion+%3D+23.0.1)

## New and Noteworthy

### Windows aarch64 support

Starting with Eclipse Temurin versions 21.0.5 and 23.0.1, Windows aarch64 (ARM64) is now officially supported. This addition brings enhanced flexibility and performance improvements for developers working on ARM-based Windows systems. Users can now benefit from Temurin’s robust, high-performance JDK distribution on an expanded range of Windows hardware, continuing our commitment to broad platform compatibility and support for modern architectures.

### Container Updates

#### GPG Verification Added to Eclipse Temurin images

This release introduces GPG verification for Eclipse Temurin container downloads, adding integrity and authenticity checks for greater security. As part of this enhancement, the `gnupg` package is now included in all Ubuntu and Alpine-based container images, which could be a breaking change for some workflows. This adjustment ensures that users receive verified binaries but may impact containers that previously operated without gnupg installed. For further details, refer to [PR #673](https://github.com/adoptium/containers/pull/673).

#### General availability of RISC-V container images

In this release, we are introducing support for RISC-V (riscv64) architecture with new Docker images for Eclipse Temurin, available from JDK 17 onwards. This addition enables broader compatibility and performance on RISC-V platforms, furthering our commitment to supporting diverse architectures in the open-source ecosystem.

#### Changes to Docker image external CA certs handling

A recent fix has been applied across all eclipse-temurin container tags to resolve an issue with the `__cacert_entrypoint.sh` script during certificate renewals. Previously, the script generated certificate aliases using only the Subject CN, which led to alias duplication errors when both old and new intermediate certificates with the same CN were present. This affected the keytool import process, causing it to fail. The fix now appends the certificate's serial number to the alias if a duplicate CN is detected, ensuring unique aliases and allowing both certificates to coexist during transitional periods without error.

See more details about the fix [here](https://github.com/adoptium/containers/pull/642).

#### (Re)Introduction of Windows Nanoserver images for JDK23

With the release of Eclipse Temurin 23.0.1, we are pleased to announce that Windows NanoServer images are now available, though this was skipped for the initial JDK 23 release. Currently, when running JDK 23+37 on Windows NanoServer containers, users may encounter the warning: 

```
OpenJDK 64-Bit Server VM warning: Failed to determine whether the OS can retrieve version information from kernel32.dll: The system cannot find the file specified
```

This warning is due to an ongoing issue with kernel version retrieval, and we anticipate it will be resolved in JDK 23.0.2. For more details, please refer to the [upstream issue](https://bugs.openjdk.org/browse/JDK-8340383).
