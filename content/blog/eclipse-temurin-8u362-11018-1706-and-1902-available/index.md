---
title: Eclipse Temurin 8u362, 11.0.18, 17.0.6 and 19.0.2 Available
date: "2023-01-27T12:00:00+00:00"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u362, 11.0.18, 17.0.6 and 19.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - Temurin
  - Announcement
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u362, 11.0.18, 17.0.6 and 19.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. All binaries are available from the [Temurin download page](https://adoptium.net/temurin/releases).

* [List of security fixes and other fixes in OpenJDK 8u362](https://bugs.openjdk.org/browse/JDK-8300354?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20openjdk8u362)

* [List of security fixes and other fixes in OpenJDK 11.0.18](https://bugs.openjdk.org/browse/JDK-8300484?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2011.0.18)

* [List of security fixes and other fixes in OpenJDK 17.0.6](https://bugs.openjdk.org/browse/JDK-8300467?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2017.0.6)

* [List of security fixes and other fixes in OpenJDK 19.0.2](https://bugs.openjdk.org/browse/JDK-8300251?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2019.0.2)

## New and Noteworthy

### Removal of `src.zip` from container images

The latest Eclipse Temurin container releases will no longer be shipped with the `src.zip` file. This is a ~50MB file that in nearly all Docker use-cases was unncessary and bloated the overall image size. See [Remove src.zip from container images](https://github.com/adoptium/containers/issues/268) for more context and also [Remove src.zip from the latest Java releases](https://github.com/docker-library/openjdk/issues/282) (an upstream official Docker discussion).

### Addition of Red Hat Universal Base Images (UBI)

Red Hat UBI 9 minimal base images were added to the [Eclipse Temurin](https://hub.docker.com/_/eclipse-temurin/) registry. With Centos 7 due to be deprecated in [June 2024](https://wiki.centos.org/About/Product), it is recommended that Centos users consider migrating to the newer UBI images. The tag schema for UBI 9 minimal images is `eclipse-temurin:<tag-name>-ubi9-minimal`. The full set of UBI tags can be viewed on [Docker Hub](https://hub.docker.com/_/eclipse-temurin/tags?name=ubi).

### Changes to Root Certificate Authorities (Root CAs)

This release contains the following Root CA changes as described in the [Mozilla Meta-bug #1794506](https://bugzilla.mozilla.org/show_bug.cgi?id=1794506)

**Additions:**

* None

**Removals:**

* Network Solutions Certificate Authority
* SwissSign Platinum CA - G2
* EC-ACC (CA Operator: Consorci AOC, CATCert)
* Staat der Nederlanden EV Root CA

### Temurin 17 support for AIX

Up until now, Adoptium has not released a version of Eclipse Temurin 17 for AIX. As of Temurin 17.0.6+10, AIX is now fully supported. Please see [Supported Platforms](https://adoptium.net/supported-platforms/) for specific details.

### Release Notes

Since moving to the Eclipse Foundation, we haven't published release notes to our site. While they're not quite ready to go live yet, we expect them to be available in the coming weeks. Watch this space for more information!
