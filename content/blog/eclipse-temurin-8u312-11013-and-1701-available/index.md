---
title: Eclipse Temurin 8u312, 11.0.13, and 17.0.1 Available
date: "2021-11-05T12:00:00+00:00"
author: georgeadams
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u312, 11.0.13, and 17.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - Temurin
  - Announcement
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u312, 11.0.13, and 17.0.1. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.

* [List of security fixes and other fixes in OpenJDK 8u312](https://bugs.openjdk.java.net/browse/JDK-8275549?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20openjdk8u312%20ORDER%20BY%20created%20DESC)

* [List of security fixes and other fixes in OpenJDK 11.0.13](https://bugs.openjdk.java.net/browse/JDK-8275564?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2011.0.13%20ORDER%20BY%20created%20DESC)

* [List of security fixes and other fixes in OpenJDK 17.0.1](https://bugs.openjdk.java.net/browse/JDK-8275444?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2017.0.1%20ORDER%20BY%20created%20DESC)

## New and Noteworthy

### Eclipse Temurin 11 for Alpine Linux with musl libc

We previously [announced Temurin 17 binaries for Alpine Linux](https://adoptium.net/blog/2021/09/eclipse-temurin-17-available/). We're pleased to announce that we have added support for Temurin 11 binaries as well. These can either be downloaded via the [adoptium.net](https://adoptium.net/releases.html?variant=openjdk11&jvmVariant=hotspot) or used in our [Docker images](https://hub.docker.com/_/eclipse-temurin/):

```bash
➜  ~ docker run -it eclipse-temurin:11-alpine java --version
openjdk 11.0.13 2021-10-19
OpenJDK Runtime Environment Temurin-11.0.13+8 (build 11.0.13+8)
OpenJDK 64-Bit Server VM Temurin-11.0.13+8 (build 11.0.13+8, mixed mode)
```

### New artifacts in the releases

We now publish source and static versions of the Temurin libraries (JDK11+) as well as source code archives. Source code archives can be downloaded via the adoptium.net or the API.
