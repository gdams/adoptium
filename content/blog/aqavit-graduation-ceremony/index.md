---
title: AQAvit Graduation Ceremony
date: "2024-02-27T12:00:00+00:00"
author: shelleylambert
description: How the AQAvit project continues to evolve and grow.
tags:
  - aqavit
---

## Eclipse AQAvit Release 1.0.0

![AQAvit Logo](aqavit-light.png)

I am pleased to announce the [Eclipse AQAvit 1.0.0 release](https://github.com/adoptium/aqa-tests/releases/tag/v1.0.0) and the AQAvit project's graduation from being an incubator project to a mature project.  In the subsequent sections, I will explain what I learned about the Eclipse Foundation release process and how it is different from the [AQAvit releases](https://github.com/adoptium/aqa-tests/releases) we have been actively delivering out of GitHub for some time now. From a technical perspective, AQAvit was already a mature project, delivering hundreds of features, fixes and updates per release.  What makes the v1.0.0 release so special?  The Eclipse release process was also completed, which focuses on ensuring that the project is compliant with a set of non-technical criteria such as Intellectual Property management, Branding and Trademarks, Legal Documentation requirements and Open Source Rules of engagement.

## Opinionated Comments about the Eclipse Foundation release process

The [Eclipse Foundation release process](https://www.eclipse.org/projects/handbook/#release) looks at best practices for project's to follow to ensure they comply with good governance requirements.  A project can graduate out of incubator status when it passes its first Eclipse release review.  This process is then only required to be revisited on a yearly basis.

I am not a fan of unnecessary process.  As a project lead of the AQAvit project, I had been putting off doing what I considered to be some unwelcome extra 'paperwork' imposed upon me by the Eclipse Foundation. I had considered the Eclipse Foundation release an arbitrary and disconnected statement about the maturity and readiness of a project, especially given that AQAvit has been actively delivering GitHub releases.

I learned that the release review process was not as onerous as I had expected.  The Eclipse Foundation is streamlining many of the steps, reviewing and removing some of the previously required pieces of documentation that are not necessary for a project to have in order to prove it is healthy and mature.  Some of the required documentation includes the License, Readme and Contributing files as well as recommended Code of Conduct and Security files be present in every repository within a given Eclipse project.  The AQAvit project which happens to hierarchically be a sub-project of Eclipse Adoptium, has its [7 repositories](https://projects.eclipse.org/projects/adoptium.aqavit/developer) under the Adoptium GitHub organization, so many of those required files are inherited from the GitHub organization files.  For the [AQAvit 1.0.0 release review](https://gitlab.eclipse.org/eclipsefdn/emo-team/emo/-/issues/669), there were very few updates needed.

Having the Eclipse release process look at the metadata and legal aspects of a project means that project leads and committers can focus on the day to day technical work and innovation.  The AQAvit project typically coordinates its GitHub releases to be available a few weeks ahead of the [JDK release schedule](https://www.java.com/releases) as the many vendors who distribute binaries built from source code originally sourced from the [OpenJDK project](https://openjdk.org/), use AQAvit to verify the quality of the binaries they are producing and distributing.  Because of this, AQAvit produces multiple releases per year in step with the JDK release schedule.  The complementary Eclipse release process for a project only needs to happen once a year as the areas of focus it is concerned with do not change as rapidly.

## Summary

The takeaway is that the AQAvit project is delivering value to developers, JDK distributors and enterprise consumers by not only delivering high-value tests, tools and processes to ensure robust, high-quality runtimes are distributed into the hands of Java developers and users, but the AQAvit project is doing so in compliance with excellent governance guidance provided by the Eclipse Foundation.  As an extra bonus to Eclipse project leads, in particular those of us who may be tired and grumpy, the Eclipse review process which leads up to graduation is streamlined and is not an imposition at all.

