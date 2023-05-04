---
title: Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1 Available
date: "2023-05-03T12:00:00+00:00"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - Temurin
  - Announcement
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u372, 11.0.19, 17.0.7 and 20.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. All binaries are available from the [Temurin download page](https://adoptium.net/temurin/releases).

* [List of security fixes and other fixes in OpenJDK 8u372](https://bugs.openjdk.org/browse/JDK-8306392?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20openjdk8u372)

* [List of security fixes and other fixes in OpenJDK 11.0.19](https://bugs.openjdk.org/browse/JDK-8304389?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2011.0.19)

* [List of security fixes and other fixes in OpenJDK 17.0.7](https://bugs.openjdk.org/browse/JDK-8305449?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2017.0.7)

* [List of security fixes and other fixes in OpenJDK 20.0.1](https://bugs.openjdk.org/browse/JDK-8304890?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2020.0.1)

## New and Noteworthy

### No JDK 20 binaries for Linux PPC64le, s390x, arm32, and AIX ppc64

At this time of writing, Adoptium will not be releasing JDK 20.0.1 for these platforms due to known issues with the TCK test. If this changes, it will be released at a later date.

### Changes to Root Certificate Authorities (Root CAs)

This release contains the following Root CA changes as described in the [Mozilla Meta-bug #1804498](https://bugzilla.mozilla.org/show_bug.cgi?id=1804498)

**Additions:**

* Add BJCA Global Root CA1 and CA2 root certificates

**Removals:**

* None

### Release Notes

Release notes are now being generated and published to the GitHub releases alongside the tarballs:

[Release notes for JDK 8u372] (https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u372-b07/OpenJDK8U-jdk-release-notes_8u372b07.json)
[Release notes for JDK 11.0.19] (https://github.com/adoptium/temurin11-binaries/releases/download/jdk-11.0.19%2B7/OpenJDK11U-jdk-release-notes_11.0.19_7.json)
[Release notes for JDK 17.0.7] (https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.7%2B7/OpenJDK17U-jdk-release-notes_17.0.7_7.json)
[Release notes for JDK 20.0.1] (https://github.com/adoptium/temurin20-binaries/releases/download/jdk-20.0.1%2B9/OpenJDK20U-jdk-release-notes_20.0.1_9.json)
