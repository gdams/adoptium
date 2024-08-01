---
title: Eclipse Temurin Reproducible Verifications Builds for Secure Development
date: "2024-08-01T12:00:00+00:00"
author: andrewleonard
description: Eclipse Temurin jdk-21+ builds are fully reproducible build. This blog explains how
 third-party users can perform an independent secure identical verification of an Eclipse Temurin build,
 and why you would want to do this.
tags:
  - temurin
---

## What is a third-party Reproducible Verification Build?

### Eclipse Temurin jdk-21+ now "Fully Reproducible"

In my previous blog [Reproducible Builds at Eclipse Adoptium](https://adoptium.net/blog/2022/06/adoptium-reproducible-builds/), I explained
how the Adoptium community has been working to achieve fully "Reproducible Builds" for the Eclipse Temurin jdk-21+ releases,
and how that helps provide better secure supply chain validation, and improved build pipeline quality and script verification.
Eclipse Temurin jdk-21+ releases are now fully reproducible for the primary platforms (x86_64 Linux, aarch64 Linux, Windows and Mac),
and we have introduced new AQAVit reproducible compare tests to track and monitor the reproducibility.

### Why independently re-building Eclipse Temurin is useful

The idea behind a "third-party Reproducible Verification Build", is that an independent party can re-build identically purely from source and
securely obtained tooling, using their own secure build environment. This re-build can then be compared bit-for-bit to be identical
to the official Eclipse Temurin release. This then provides a very high degree of secure supply chain validation that the official
Eclipse Temurin binary is good and securely built.

### Using a "gcc DevKit" to build Eclipse Temurin

Up until recently Eclipse Temurin Linux builds were compiled using a custom Adoptium build of gcc from source, which due to its unique
source build nature, would mean in order for a third-party to identically re-build, then the very same Adoptium gcc
[compilers](https://ci.adoptium.net/userContent/gcc/) would need to be downloaded. This then presents a potential toolchain vulnerability
in relying on the very same gcc compiler binary. As of Eclipse Temurin jdk-21.0.3, the Adoptium build scripts and pipelines for the Linux
gcc build platforms, have been upgraded to use an "gcc DevKit". This defines an absolute definition of a gcc toolchain,
the gcc and dependency source versions, the sysroot used, and how it is exactly built. Eclipse Adoptium publishes the DevKits that are
used to build with in the [https://github.com/adoptium/devkit-binaries/releases](https://github.com/adoptium/devkit-binaries/releases), but
due to the way DevKit is defined, a third-party can re-build the very same toolchain purely from source and securely verified sysroot rpms.
This independent build of the gcc toolchain allows another secure level of validation of the supply chain used to build the compiler,
subsequently used to build the Eclipse Temurin binaries.

## Independently fully reproducible Eclipse Temurin

Combining the use of the "gcc DevKit", the well defined Eclipse Temurin build pipeline and the output of the secure development Software Bill
of Materials (SBOM), then allows a documented and independent method for third-parties to perform an identical reproducible build.
By comparing the independently built binary with the official Eclipse Temurin release, any discrepancies or tampering can be detected,
ensuring that the Temurin JDK has been securely and correctly built. These third-party Reproducible builds help maintain trust in the supply chain
by providing a mechanism for independent verification of software integrity of the Eclipse Temurin release binaries.

## How to perform a third-party Reproducible Verification Build

To perform your own Reproducible Verification Build, we have prepared a set of instructions for each platform that will guide you through
the process of re-building the selected jdk-21+ Eclipse Temurin builds from upstream OpenJDK community source and with your own securely built
toolchains and dependencies.

- [jdk-21+ Linux x86_64](/docs/reproducible-builds/reproduce-linux-x86-64)
- [jdk-21+ Linux aarch64](/docs/reproducible-builds/reproduce-linux-aarch64)

### Summary

Today's Enterprise Software needs to be more secure and safe from vulnerability attacks than ever before. Providing methods
for ensuring the security of the supply chain and ways of demonstrating the quality of the products delivered are essential.
The ability to perform secure verification using a third-party Eclipse Temurin reproducible build greatly extends the security
and confidence in the supply chains used by the Eclipse Adoptium community.
