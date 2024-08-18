---
title: Eclipse Temurin Reproducible Verification Builds for Secure Supply Chain Validation
date: "2024-08-09T12:00:00+00:00"
author: andrewleonard
description: Eclipse Temurin JDK 21+ builds are fully reproducible. This blog explains how
 third-party users can perform an independent secure verification of an Eclipse Temurin build to
 validate the integrity of the supply chain, and why you would want to do this.
tags:
  - temurin
---

### What is a third-party Reproducible Verification Build?

A third-party reproducible verification build is a re-build of an official software product release, built purely from upstream sources and
securely obtained and verified tooling, in a secure and well defined build environment. Its purpose is to help maintain trust in the supply chain
by providing a mechanism for independent verification of the software integrity of the official releases. The trust of the supply chain is very
important from the perspective of ensuring no vulnerabilities or malware affect the released software.

An important aspect for performing an
independent reproducible build is the security and source of the build environment. The upstream product sources, build scripts and toolchain
must be original securely obtained sources, and any system binaries must be securely verified by signatures. Once completed, a byte-for-byte identical
comparison with the official software product release binaries will then validate to a very high degree the security of the supply chain used and that the official
release binary is secure and has not been tampered with.

### Eclipse Temurin JDK 21+ now "Fully Reproducible"

In my previous blog [Reproducible Builds at Eclipse Adoptium](https://adoptium.net/blog/2022/06/adoptium-reproducible-builds/), I explained
how the Adoptium community has been working to achieve fully "Reproducible Builds" for the Eclipse Temurin JDK 21+ releases,
and how that helps provide better secure supply chain validation, and improved build pipeline quality and script verification.
Eclipse Temurin JDK 21+ releases are now fully reproducible for the platforms x64 Linux, aarch64 Linux, x64 Windows, x64 Mac and aarch64 Mac,
and we have introduced new [Eclipse AQAvit](https://projects.eclipse.org/projects/adoptium.aqavit) reproducible comparison tests for reproducibility.

### Using a "GCC DevKit" to build Eclipse Temurin

Up until recently Eclipse Temurin Linux builds were compiled using a custom Adoptium build of GCC from source, which due to its unique
source build nature, would mean in order for a third-party to identically re-build, then the very same Adoptium GCC
[compilers](https://ci.adoptium.net/userContent/gcc/) would need to be downloaded. This then presents a potential toolchain vulnerability
in relying on the very same GCC compiler binary. As of Eclipse Temurin JDK 21.0.3, the Adoptium build scripts and pipelines for the Linux
GCC build platforms, have been upgraded to use an "GCC DevKit". This defines an absolute definition of a GCC toolchain,
the GCC and dependency source versions, the sysroot used, and how it is exactly built. Eclipse Adoptium publishes the DevKits that are
used to in the repository [https://github.com/adoptium/devkit-binaries/releases](https://github.com/adoptium/devkit-binaries/releases).
Due to the way the DevKit is defined, a third-party can re-build the exact same toolchain purely from GPG-verified sources and GPG-verified sysroot RPMs.
This independent build of the GCC toolchain allows another secure level of validation of the supply chain used to build the compiler,
subsequently used to build the Eclipse Temurin binaries.

## Independently fully reproducible Eclipse Temurin

Combining the use of the "GCC DevKit", the well defined Eclipse Temurin reproducible build pipeline and the generated Software Bill
of Materials (SBOM), allows a documented and independent method for third-parties to perform a reproducible build.
By comparing the independently built binary with the official Eclipse Temurin release, any discrepancies or tampering can be detected,
ensuring that the release has been securely and correctly built. These third-party reproducible builds help maintain trust in the supply chain
by providing a mechanism for independent verification of software integrity of the Eclipse Temurin release binaries.

## How to perform a third-party reproducible verification build

To perform your own reproducible verification build of an Eclipse Temurin JDK 21+ official release, we have prepared a set of instructions
for each platform that will guide you through the process of rebuilding the selected JDK 21+ Eclipse Temurin builds from upstream
OpenJDK community sources and with your own securely built toolchains and dependencies.

- [JDK 21+ Linux x64](/docs/reproducible-verification-builds/reproduce-linux-x64)
- [JDK 21+ Linux aarch64](/docs/reproducible-verification-builds/reproduce-linux-aarch64)
- [JDK 21+ Windows x64](/docs/reproducible-verification-builds/reproduce-windows-x64)

### Summary

Today's Enterprise Software needs to be more secure and safe from vulnerability attacks than ever before. Providing methods
for ensuring the security of the supply chain and ways of demonstrating the quality of the products delivered are essential.
The ability to perform secure verification using a third-party Eclipse Temurin reproducible build greatly extends the security
and confidence in the supply chains used by the Eclipse Adoptium community.
