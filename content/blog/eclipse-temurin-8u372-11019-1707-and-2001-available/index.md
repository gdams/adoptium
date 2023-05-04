---
title: Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1 Available
date: "2023-05-03T12:00:00+00:00"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - Temurin
  - Announcement
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases).

## Release Notes

This release contains the following security and functional fixes and updates.

* [Temurin 8u372 release rotes](https://adoptium.net/temurin/release-notes/?version=jdk8u372-b07)
  - [Fixes in OpenJDK 8u372](https://bugs.openjdk.org/browse/JDK-8306392?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20openjdk8u372)

* [Temurin 11.0.19 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-11.0.19+7)
  - [Fixes in OpenJDK 11.0.19](https://bugs.openjdk.org/browse/JDK-8304389?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2011.0.19)

* [Temurin 17.0.7 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-17.0.7+7)
  - [Fixes in OpenJDK 17.0.7](https://bugs.openjdk.org/browse/JDK-8305449?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2017.0.7)

* [Temurin 20.0.1 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-20.0.1+9)
  - [Fixes in OpenJDK 20.0.1](https://bugs.openjdk.org/browse/JDK-8304890?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2020.0.1)

## New and Noteworthy

### No JDK 20 binaries for Linux PPC64le, s390x, arm32, and AIX ppc64

Adoptium will not be releasing JDK 20.0.1 for Linux PPC64le, s390x, arm32, and AIX ppc64 due to issues found in testing. These platforms may be released at a later date if the issues are resolved in the implementation.

### Changes to Root Certificate Authorities (Root CAs)

This release contains the following Root CA changes as described in the [Mozilla Meta-bug #1804498](https://bugzilla.mozilla.org/show_bug.cgi?id=1804498)

**Additions:**

* Add BJCA Global Root CA1 and CA2 root certificates

**Removals:**

* None

