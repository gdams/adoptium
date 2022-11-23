---
title: Adoptium Celebrates First Release
date: "2021-08-02T12:00:00+00:00"
author: timellison
description: Adoptium has successfully achieved the first release of Eclipse Temurin Java SE binaries.
tags:
  - Release
  - "Eclipse Temurin"
---

### Release Milestone

[Eclipse Adoptium](https://www.adoptium.net) has achieved a major milestone with the first release of the project’s Eclipse Temurin Java SE binaries. Adoptium is the new home of the AdoptOpenJDK project, the most popular build of OpenJDK in production according to the recent [JVM Ecosystem Report](https://snyk.io/jvm-ecosystem-report-2021/), with over 300 million downloads.

This first [release of Temurin](https://adoptium.net/releases.html) from the Adoptium community and covers the latest versions of Java SE 8, Java SE 11, and Java SE 16 on each of Linux, Windows, and macOS on Intel 64-bit processors, with more platforms to follow shortly.

Every release of Temurin has passed [Oracle’s Java SE TCK](https://en.wikipedia.org/wiki/Technology_Compatibility_Kit) in addition to the rigorous [Eclipse AQAvit](https://projects.eclipse.org/projects/adoptium.aqavit) tests for added confidence of interoperability, quality, performance, and conformity to standards. Adoptium’s Java SE binaries are always free to use, and production-ready for the most demanding environments!

### Successful Transition

This first release marks the successful [transition of AdoptOpenJDK to Adoptium](https://adoptium.net/blog/2021/03/eclipse-adoptium-announcement/).

The project move involved transferring over 40 code repositories, a complex static and virtualized machine infrastructure, a running build tool, and a two thousand members strong community to the Eclipse Foundation over a period of about one year. During that time the team continued to hit their quarterly release schedule, and grow the project through the introduction of a new incubator programme, participating in student mentoring programmes, and delivering innovation through machine learning and cloud optimization operational techniques amongst others.

As part of the transition the Eclipse Foundation helped the community establish a new governance working group to support the work of the technical projects. The current [Adoptium working group members](https://adoptium.net/members.html) are Alibaba Cloud, Azul, Huawei, Karakun, Microsoft, Red Hat, IBM, iJUG, ManageCat, and New Relic.

The working group includes major Java vendors who share a vision for an open and collaborative build, test, and distribution solution for OpenJDK. Adoptium has a greater focus on vendor collaboration than ever before and encourages commercial reuse of the technology.

### Eclipse Temurin

Producing Temurin binaries follows modern best practices for cloud-based development under the review of the Adoptium community, and we have launched a new initiative to formalize the build process that encompasses the latest secure engineering practices.

Utilizing “infrastructure as code” principles, the Temurin project ensures that each build of Java SE is open, consistent and reproducible. The resulting binaries built at the project are [supported by the community](https://adoptium.net/support.html) for as long as the upstream OpenJDK source project is maintained.

Temurin actively encourages Java vendors to reuse the Adoptium technology in open and commercial products so that users have a consistent experience when moving between builds of OpenJDK while allowing for vendor-specific characteristics.

### Eclipse AQAvit

Eclipse AQAvit focuses on testing the enterprise characteristics of a Java SE runtime to confirm that it is ready for use in production environments.

The AQAvit quality programme not only checks functional correctness of the runtime, but also puts each runtime under long-running stress workloads, checks the runtime performance characteristics, tests compatibility with open source libraries, and tests that a range of known security vulnerabilities have been fixed before awarding a pass.

AQAvit is being used by many well-known Java vendors including Microsoft, IBM, Amazon, Azul, and Red Hat.

Adoptium members collaborate constantly on enhancing the AQAvit quality programme with their own experience and tests, making it the highest quality bar in the industry for a release. By joining the AQAvit project members can contribute directly to the release quality of multiple OpenJDK builds.

### Adoptium Marketplace

There has been an explosion in the number of OpenJDK-based runtime distributions available over the last few years, and not all of them have the high release quality bar set by AQAvit. The Adoptium project is establishing a “marketplace” where working group members can promote high quality Java SE runtimes that pass the Oracle Java SE TCK and meet the AQAvit quality assurance criteria.

The Adoptium working group is proud to promote a wide range of Java SE runtimes that share our high standards for production usage, many with equally high quality support offerings behind them. By choosing Java SE runtimes that meet the Adoptium marketplace criteria you can be assured that they meet all the relevant Java SE standards and interoperate amongst one another.

### Future Plans

Adoptium is committed to providing a full range of Java SE version releases supported by OpenJDK across the widest range of platforms and built to the highest quality standards.

Our immediate goal is to complete the set of binaries, installers and images for this release cycle, and carry this momentum forward as part of the regular quarterly release program in line with OpenJDK availability. We are already well underway with the plans for Java 17, the next long term supported Java SE version.

We will establish the Adoptium marketplace to enable our working group members to promote their own work based upon Adoptium’s quality criteria, and continue to innovate in the cloud-based CI/CD infrastructure that drives our efficiency as a shared community project.

We encourage others who share our passion to contribute by reaching out through [Slack](https://adoptium.net/slack.html) and the [mailing list](https://accounts.eclipse.org/mailing-list/temurin-dev).
