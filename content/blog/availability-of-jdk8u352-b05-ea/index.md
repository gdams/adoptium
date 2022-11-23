---
title: Availability of JDK 8u352-b05 Early Access Build
date: "2022-09-09T12:20:00+00:00"
author: shelleylambert
description: This post is to raise awareness of JDK 8u352-b05 Early Access Build availability and asking the community to try it out early.
tags:
  - Temurin
---

## Announcing an Early Access Build of JDK 8u352-b05

Heads up to the community of an upcoming specification in JDK 8 which described in detail by JDK 8 Updates Project Lead, [Andrew Haley](https://openjdk.org/census#aph) in this article, [JDK 8 Maintenance Release 4](https://access.redhat.com/articles/6964484).  It is a recommended concise bit of reading that advises what to proactively look for in your applications to ensure that you will not hit any issues upon picking up the October update of JDK 8.  

To aid in this recommendation to test that your application code will handle the specification change gracefully, we have created an early access build of JDK 8u352-b05 (activities outlined in [temurin-build/issues/3089](https://github.com/adoptium/temurin-build/issues/3089)).  

## A Table of Convenient Links

While you can find the complete set of artifacts for the Eclipse Temurin JDK 8u352-b05 Early Access Build for all the platforms that we build, test and distribute at this [temurin8-binaries](https://github.com/adoptium/temurin8-binaries/releases/tag/jdk8u352-b05-ea)  repository, please find a set of convenient API links to selected artifacts in the table below.

| Operating System | Architecture | Links to Artifacts |
| --- | --- | --- |
| Linux | x64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/x64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/x64/jre/hotspot/normal/eclipse) |
| Linux | aarch64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/aarch64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/aarch64/jre/hotspot/normal/eclipse) |
| Linux | ppc64le | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/ppc64le/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/ppc64le/jre/hotspot/normal/eclipse) |
| Linux | arm | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/arm/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/linux/arm/jre/hotspot/normal/eclipse) |
|  |  |  |
| MacOS | x64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/mac/x64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/mac/x64/jre/hotspot/normal/eclipse) |
| MacOS | aarch64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/mac/aarch64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/mac/aarch64/jre/hotspot/normal/eclipse) |
|  |  |  |
| Windows | x64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/windows/x64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/windows/x64/jre/hotspot/normal/eclipse) |
| Windows | x32 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/windows/x32/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/windows/x32/jre/hotspot/normal/eclipse) |
|  |  |  |
| Alpine-linux | x64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/alpine-linux/x64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/alpine-linux/x64/jre/hotspot/normal/eclipse) |
|  |  |  |
| Solaris | x64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/solaris/x64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/solaris/x64/jre/hotspot/normal/eclipse) |
| Solaris | sparcv9 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/solaris/sparcv9/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/solaris/sparcv9/jre/hotspot/normal/eclipse) |
|  |  |  |
| AIX | ppc64 | [JDK](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/aix/ppc64/jdk/hotspot/normal/eclipse) / [JRE](https://api.adoptium.net/v3/binary/version/jdk8u352-b05-ea/aix/ppc64/jre/hotspot/normal/eclipse) |
|  |  |  |

These binaries are not intended to serve in production, but are intended to let users take active steps to verify application code ahead of October.  If you have any questions, feel free to ask them in our [Slack workspace](https://adoptium.net/slack).
