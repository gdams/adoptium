---
title: 'Migration Guide'
authors: gdams, karianna, SueChaplain, hendrikebbers, sxa555, ParkerM, jiekang, HanSolo, MBoegers
---

## Migrating to Eclipse Temurin

If you are moving from Oracle JDK to OpenJDK from the Adoptium project,
you’ll probably have a few key questions on your mind. Firstly, you’ll
want to know what the differences are between Oracle JDK and Temurin and
whether there are any steps you need to take to migrate. The answers to
common questions around these choices are covered in the sections that
follow.

## Migrating from Oracle JDK

The following table illustrates the proprietary components that can be
found in Oracle JDK 8 and the alternative technologies that are either
planned or available to replace them. Click on the links to learn more
about each component and any steps that might be necessary to adopt
them.

| Oracle JDK 8 proprietary component | Alternative component        | Temurin 8 | Temurin 11 |
| ---------------------------------- | ---------------------------- | --------- | ---------- |
| Java Web Start                     | [IcedTea-Web](#icedtea-web)  | <Tick />  | <Cross />  |
| JavaFX                             | [OpenJFX](#openjfx)          | <Cross /> | <Tick />   |
| T2K font rendering engine          | [FreeType](#freetype-font-rendering-library) | <Tick />  | <Tick /> |
| Monotype Lucida fonts              | [Relicensed Lucida fonts](#relicensed-lucida-fonts) | <Cross /> (coming soon) | <Cross /> (coming soon) |
| Ductus 2D renderer                 | [Pisces/Marlin](#pisces-and-marlin) | <Tick /> (Pisces) | <Tick /> (Marlin) |
| Kodac Color Matching System (KCMS) library | [LCMS](#lcms)        | <Tick />  | <Tick />   |
| SNMP                               | Use [JMX](#jmx) (or SNMP4J) | <Tick /> (not bundled)  | <Tick /> (not bundled) |
| Sound drivers                      | Use [Windows sound drivers](#windows-sound-drivers) | <Tick /> (not bundled)  | <Tick /> (not bundled) |
| Java Flight Recorder (JFR)         | [Java Flight Recorder](#java-flight-recorder) | <Tick />  | <Tick /> |
| Java Mission Control (JMC)         | Use [Eclipse Mission Control](#eclipse-mission-control) | <Tick />  | <Tick /> |

### IcedTea-Web

Java Web Start was deprecated by Oracle in Java SE 8 and removed in Java
SE 9. IcedTea-Web can provide equivalent functionality for Temurin 8
users.

IcedTea-Web is available to download from the
[Iced-Tea Web project page](https://adoptopenjdk.net/icedtea-web.html) in
Linux, Windows, macOS and Portable package formats.

Use IcedTea-Web in the same way as Java Web Start. For more information,
see [Developing a Java Web Start application](https://docs.oracle.com/javase/tutorial/deployment/webstart/developing.html)
and [Deploying a Java Web Start application](https://docs.oracle.com/javase/tutorial/deployment/webstart/deploying.html). Whilst IcedTea-Web is written to operate in the same way as Java Web Start there are a few known differences, which are raised as issues in the [GitHub project](https://github.com/AdoptOpenJDK/icedtea-web).
Work is ongoing to minimize or eliminate these differences.

IcedTea-Web 1.8.x and 2.0.x are compatible with Temurin 8 builds. We
know that software which is based on IcedTea-Web supports the execution
of OpenJDK 11 based JNLP applications but IcedTea-Web does not contain
any tests to check OpenJDK 11 support and we do not bundle it with
Temurin 11 builds.

### OpenJFX

Back in 2017, JavaFX was decoupled from the Oracle JDK and contributed
to the OpenJDK community. The OpenJFX community is focused on OpenJFX
11+ and provides binaries that you can use with Temurin.

OpenJFX 8 is no longer being actively maintained. If you need this
capability, we recommend upgrading to OpenJFX 11.

### Freetype font rendering library

OpenJDK uses the open source FreeType font rendering library instead of
the proprietary T2K font library.

### Relicensed Lucida fonts

The Lucida fonts that are available in Oracle JDK 8 have a proprietary
3rd party license. Adoptium intend to provide relicensed Lucida fonts.
Work is ongoing to minimize any display issues when these fonts are
rendered by Freetype.

### Pisces and Marlin

Oracle JDK 8 uses a proprietary 2D graphics renderer called Ductus,
whereas OpenJDK uses an open-source renderer called Pisces. From OpenJDK
9, the Marlin renderer is in use. Work is planned at Adoptium to either
backport Marlin to OpenJDK 8 and/or minimize any display issues between
the two.

### LCMS

OpenJDK uses the Little Color Matching System (LCMS) open source open
source library instead of the proprietary Kodac CMS library.

### JMX

The proprietary SNMP package shipped with Oracle JDK 8 is not present in
OpenJDK. Use JMX as an alternative, or SNMP4J. These packages are not
bundled with the Temurin binaries.

### Windows sound drivers

Oracle JDK provides native sound drivers for Java 8 on Windows, which
are not present in OpenJDK. Use the sound drivers that are available
with Microsoft Windows instead.

### Java Flight Recorder

Java Flight Recorder (JFR) was decoupled from the Oracle JDK and
contributed to the OpenJDK community. JFR is included in all versions of
Temurin.

### Eclipse Mission Control

The [Eclipse Mission Control](https://projects.eclipse.org/projects/adoptium.mc) project provides a download JMC which is available from the [Download Page](/jmc).
