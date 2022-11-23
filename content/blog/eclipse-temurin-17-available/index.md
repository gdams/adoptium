---
title: Eclipse Temurin 17 Available
date: "2021-09-23T12:00:00+00:00"
author: georgeadams
description: Adoptium is excited to announce the immediate availability of Eclipse Temurin 17.
featuredImage: "./eclipse_temurin_17.jpg"
tags:
  - Adoptium
  - Eclipse Foundation
  - Temurin
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 17. As always, all binaries are available free of charge without usage restrictions on a wide range of platforms.

![Eclipse_17 Logo](./eclipse_temurin_17.jpg)

* [List of changes in OpenJDK 17](https://bugs.openjdk.java.net/browse/JDK-8263045?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20%2217%22%20ORDER%20BY%20created%20DESC)

## New and Noteworthy

### Overview of Java 17 Features

* [JEP 306: Restore Always-Strict Floating-Point Semantics](https://openjdk.java.net/jeps/306).
* [JEP 356: Enhanced Pseudo-Random Number Generators](https://openjdk.java.net/jeps/356).
* [JEP 382: New macOS Rendering Pipeline](https://openjdk.java.net/jeps/382).
* [JEP 391: macOS/AArch64 Port](https://openjdk.java.net/jeps/391).
* [JEP 398: Deprecate the Applet API for Removal](https://openjdk.java.net/jeps/398).
* [JEP 403: Strongly Encapsulate JDK Internals](https://openjdk.java.net/jeps/403).
* [JEP 406: Pattern Matching for switch (Preview)](https://openjdk.java.net/jeps/406).
* [JEP 407: Remove RMI Activation](https://openjdk.java.net/jeps/407).
* [JEP 409: Sealed Classes](https://openjdk.java.net/jeps/409).
* [JEP 410: Remove the Experimental AOT and JIT Compiler](https://openjdk.java.net/jeps/410).
* [JEP 411: Deprecate the Security Manager for Removal](https://openjdk.java.net/jeps/411).
* [JEP 412: Foreign Function & Memory API (Incubator)](https://openjdk.java.net/jeps/412).
* [JEP 414: Vector API (Second Incubator)](https://openjdk.java.net/jeps/414).
* [JEP 415: Context-Specific Deserialization Filters](https://openjdk.java.net/jeps/415).

For a complete list of the enhancements (including ones that only impact developers of OpenJDK), [see the JDK 17 overview over at OpenJDK](https://openjdk.java.net/projects/jdk/17/).

### Eclipse Temurin for Alpine Linux With musl libc

[Alpine Linux](https://alpinelinux.org/) is a popular Linux distribution for container workloads because of its small footprint. Contrary to most other Linux distributions, Alpine Linux is not based on the [C library created by the GNU project](https://www.gnu.org/software/libc/) (usually referred to as "glibc") but uses [musl libc](https://musl.libc.org) instead. So far, OpenJDK has not supported musl libc but only glibc. With Eclipse Temurin 17, this is no longer necessary. We now have separate variants of Eclipse Temurin 17 that are purpose-built for musl libc that can be downloaded as a tarball and are also available as [ready-made container images](https://hub.docker.com/_/eclipse-temurin).
