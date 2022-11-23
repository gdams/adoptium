---
title: Eclipse Temurin 8u342, 11.0.16, 17.0.4 and 18.0.2 Available
date: "2022-08-03T12:00:00+00:00"
author: georgeadams
description: Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u342, 11.0.16, 17.0.4 and 18.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms.
tags:
  - Temurin
  - Announcement
---

Adoptium is happy to announce the immediate availability of Eclipse Temurin 8u342, 11.0.16, 17.0.4 and 18.0.2. As always, all binaries are thoroughly tested and available free of charge without usage restrictions on a wide range of platforms. All binaries are available from the [Temurin download page](https://adoptium.net/temurin/releases).

* [List of security fixes and other fixes in OpenJDK 8u342](https://bugs.openjdk.org/browse/JDK-8290721?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%20openjdk8u342)

* [List of security fixes and other fixes in OpenJDK 11.0.16](https://bugs.openjdk.org/browse/JDK-8288306?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2011.0.16)

* [List of security fixes and other fixes in OpenJDK 17.0.4](https://bugs.openjdk.org/browse/JDK-8288243?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2017.0.4)

* [List of security fixes and other fixes in OpenJDK 18.0.2](https://bugs.openjdk.org/browse/JDK-8289469?jql=project%20%3D%20JDK%20AND%20fixVersion%20%3D%2018.0.2)

## New and Noteworthy

### jdk8u342-b07 regression (`user.dir`)

The latest Eclipse Temurin 8 release included the fix [JDK-8194154](https://bugs.openjdk.org/browse/JDK-8194154) which disabled the possibility to change the `user.dir` property. As a result, a second Temurin 8 release (jdk8u345-b01) will be released in the next few days. You can continue to track progress [by platform](https://github.com/adoptium/adoptium/issues/153) or [by detailed release checklist](https://github.com/adoptium/adoptium/issues/152).

### Eclipse Temurin 8 for Windows x64 respin

The original 8u342 Windows x64 release introduced a regression requiring the Visual Studio 2017 runtime to be installed on a users system. This was due to a compiler upgrade for this set of releases. As a result a second Windows x64 build has been released for JDK8u (`jdk8u342-b07.1`) which reverts the compiler to Visual Studio 2013 until the issue has been resolved. The build is otherwise functionally identical to the first one.

### Eclipse Temurin 11 for AIX requires XLC 16.1 runtime

Due to some recent changes in the Harfbuzz library version used to build OpenJDK 11, XLC 16.1 is now required instead of XLC 13.1. Users will therefore be required to install the XLC 16.1 runtime on their system if they don't already have it. This change only affects Eclipse Temurin 11. The XLC16.1 runtime for AIX can be downloaded from https://www.ibm.com/support/pages/ibm-xl-cc-runtime-aix-161.

Further discussion on this issue and the changes required can be found at the links below:

* https://bugs.openjdk.java.net/browse/JDK-8282588
* https://mail.openjdk.java.net/pipermail/ppc-aix-port-dev/2022-March/004145.html

### Changes to Root Certificate Authorities (Root CAs)

This release contains the following Root CA changes as described in the [Mozilla Meta-bug #1764206](https://bugzilla.mozilla.org/show_bug.cgi?id=1764206)

**Additions:**

* DigiCert SMIME ECC P384 Root G5
* DigiCert SMIME RSA4096 Root G5
* DigiCert TLS ECC P384 Root G5
* DigiCert TLS RSA4096 Root G5
* Certainly Root E1
* Certainly Root R1
* E-Tugra Global Root CA RSA v3
* E-Tugra Global Root CA ECC v3

**Removals:**

* Hellenic Academic and Research Institutions RootCA 2011
