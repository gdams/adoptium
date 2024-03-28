---
title: Eclipse Temurin 22 Available
date: "2024-03-28"
author: pmc
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 22.0.0+36. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - temurin
  - announcement
  - release-notes
---

Adoptium announces the availability of Eclipse Temurin 22.0.0+36. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. Binaries, installers, and source code are available from the [Temurin download page](https://adoptium.net/temurin/releases), [official container images](https://hub.docker.com/_/eclipse-temurin) are available at DockerHub, and [installable packages](https://adoptium.net/installation/) are available for various operating systems.

## Features and Updates

This release contains the set of features and updates listed at the [OpenJDK JDK 22 project](https://openjdk.org/projects/jdk/22/) page, summarized and linked below, as well as some additional notes.

* [JEP 423](https://openjdk.org/jeps/423):	Region Pinning for G1
* [JEP 447](https://openjdk.org/jeps/447):	Statements before super(...) (Preview)
* [JEP 454](https://openjdk.org/jeps/454):	Foreign Function & Memory API
* [JEP 456](https://openjdk.org/jeps/456):	Unnamed Variables & Patterns
* [JEP 457](https://openjdk.org/jeps/457):	Class-File API (Preview)
* [JEP 458](https://openjdk.org/jeps/458):	Launch Multi-File Source-Code Programs
* [JEP 459](https://openjdk.org/jeps/459):	String Templates (Second Preview)
* [JEP 460](https://openjdk.org/jeps/460):	Vector API (Seventh Incubator)
* [JEP 461](https://openjdk.org/jeps/461):	Stream Gatherers (Preview)
* [JEP 462](https://openjdk.org/jeps/462):	Structured Concurrency (Second Preview)
* [JEP 463](https://openjdk.org/jeps/463):	Implicitly Declared Classes and Instance Main Methods (Second Preview)
* [JEP 464](https://openjdk.org/jeps/464):	Scoped Values (Second Preview)

Please refer to the [Temurin jdk-22+36 release notes](https://adoptium.net/temurin/release-notes/?version=jdk-22+36) which include [changes listed in OpenJDK jdk-22+36](https://bugs.openjdk.org/browse/JDK-8325999?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2022%20AND%20status%20%3D%20Resolved) for further details of features and updates found in this release.

## New and Noteworthy

### macOS min/max version updated to 11.00.00

As per [JDK-8317970](https://bugs.openjdk.org/browse/JDK-8317970), the target macOS version for macosx-x64 is moved up to 11.x since macOS 10.x is no longer receiving updates and in alignment with macosx aarch64.

### ppc64 AIX and s390x Linux unavailable for JDK 22

Temurin jdk-22+36 for the AIX and s390x Linux platform are unavailable.  A small number of test failures indicated that there is need to investigate and update the upstream code base.  We hope that these platforms on JDK 22 will be ready for release for the April CPU.

From the [analysis](https://github.com/adoptium/temurin/issues/35#issuecomment-2015308903) of these failures, and as part of the [release retrospective exercise](https://github.com/adoptium/temurin/issues/28), we see the opportunity to have caught these issues sooner. This may have resulted in earlier fixes that would have resulted in being able to release these platforms.  With the appropriate application of resources and collaboration, we can increase the likelihood of being able to publish the entire set of platforms 'in plan' successfully and without delay.
