---
title: A Summary of the July 2022 Retrospectives
date: "2022-08-24T12:20:00+00:00"
author: shelleylambert
description: This post summarizes the retrospective assessment of the July 2022 CPU and various respins thereafter.
tags:
  - Temurin
  - AQAvit
---

## Introduction

As most of our large consumer base already knows, Eclipse Adoptium is *the* community 'build, distribution and verification' project for the upstream OpenJDK project.  We serve up millions of binaries per week, as can be seen in the [download trends in our dashboard](https://dash.adoptium.net/).  We deliver these binaries in the most transparent manner.  There is no 'mystery meat' in our recipe.  In the spirit of such great transparency, this post serves to share our insights of the post mortem analysis of our most recent release activities.

We follow a strict regime of continuous improvement at the project, which means after each of our release cycles, conducting thorough [retrospectives](https://github.com/adoptium/adoptium/issues/155) on what went well, what did not go well, and what actions are needed to improve in the future.  

## Goals and Metrics

All good retrospective activities start with "what were we trying to achieve"?  During the July Critical Patch Update (CPU), we were targeting to deliver 42 different 'products', which is essentially the platform/version combinations of Eclipse Temurin that we build, test and distribute at the project.

Based on download numbers, we have divided these products into 'primary' and 'secondary' platforms.  We focus our efforts on the primary platforms first to get these into the hands of our users as quickly as possible.  Currently, x64 Linux, x64 Windows and x64 Mac are the leading downloaded platforms, so they are categorized as 'primary' platforms.  The remaining platforms are categorized as 'secondary' platforms.  Within the secondary platforms, some may even be considered 'best effort' platforms which as the name suggests are put at the bottom of the priority list.  

To keep our goals simple, we aim to release the primary platforms within 2 days of the final OpenJDK source code being available.  For secondary platforms, our target is to release within 7 days of the source code availability.  These are summarized in a release status issue to communicate on-going status to the community.  The July release activities were tracked in [adoptium/issues/153](https://github.com/adoptium/adoptium/issues/153).

For the original GA tags for July, you can find our 'scorecard' on how we did.  64.3% were released within the targeted timeframes, 37.7% were not released within targets.  Of the ones that were not released within targets, 7 of them missed the targets by more than 5 days, which I will retrospectively refer to as "the Sickest Seven".  For a detailed breakdown of these targets per platform and version, see [adoptium/issues/157](https://github.com/adoptium/adoptium/issues/157).  

## The Sickest Seven

As [issue 157](https://github.com/adoptium/adoptium/issues/157) describes, 7 of the 42 products released badly missed the target goals (by 5 or more days).  

Let's look at the Sickest Seven, and determine next actions for improvement.  
From the initial July release activity, the *Sickest Seven* (7 products that took more than 5 business days over the 2 or 7 day target to publish), plus the *two outliers* from the respins:

| Platform | Version | Days over Target | Underlying Reasons / Notes | Actions to Improve |
| -- | -- | -- | -- | -- |
| x64 Mac | JDK 8 | 14 | Owners need to treat as urgent, onboarding difficulties, slow connectivity | Clarify requirements with owners and improve access to TCK machines |
| x64 Mac | JDK 18 | 27 | Owners need to treat as urgent, onboarding difficulties, slow connectivity | Clarify requirements with owners and improved access to TCK machines |
| aarch64 Mac | JDK 17 | 6 | Bottlenecked on having only 1 machine for TCK | 2nd machine now added to temurin-compliance project |
| aarch64 Mac | JDK 11 | 6 | Bottlenecked on having only 1 machine for TCK | 2nd machine now added to temurin-compliance project |
| arm32 Linux | JDK 8 | 11 | Unclear, possibly slow to add an owner to it, also short-handed, team vacations | Close follow-up to ensure ownership early |
| x86 Solaris | JDK 8 | 10 | Delayed on packaging issue | Issue now fixed, [temurin-build/3061](https://github.com/adoptium/temurin-build/issues/3061) |
| sparcv9 Solaris | JDK 8 | 20 | Considered a best effort platform with limited resources, team would/should prioritize this last | No specific action here, no respins would mean these lower priority platforms get released quicker, if the community wants this platform sooner, they will be encouraged to contribute resources |

What is encouraging about this list is that most of these issues have actionable responses, many of them completed during the release, as evident in our improved times for the respins.

## New Features Need New Tests

A project that is changing, is a project that is going to occasionally break.  This is will always be the case, but how do we pro-actively protect ourselves in the tug-of-war between adding new features and remaining stable and secure?  The answer is of course 'testing'.  While we have an ever-evolving suite of tests for verifying the OpenJDK binaries we produce via the [AQAvit project](https://adoptium.net/aqavit), we additionally need to be better at adding tests to verify the changes we are making to our own build and distribution scripts.

Several changes went in ahead of the July CPU that introduced delays during the release.  2 of the changes are enhancements as part of our Secure Software Development Framework [(SSDF) activities](https://github.com/adoptium/adoptium/issues/120), [GPG signing](https://adoptium.net/blog/2022/07/gpg-signed-releases/) and the [addition of SBOM artifacts](https://github.com/adoptium/temurin-build/issues/2900). These features introduce new artifacts that can be downloaded alongside of the JDK binaries.  

During the release, there were some initial missteps when not all of the new artifacts were published.  While this was easily rectified, it prompted the team to add checks for ensuring we are publishing the expected set of artifacts.

A [Windows compiler upgrade](https://github.com/adoptium/temurin-build/pull/2992) was also attempted prior to the release, there were unwanted side-effects, in this case a [missing runtime library](https://github.com/adoptium/temurin-build/issues/3052).  These went unnoticed because we had no tests for verifying the full set to be produced, and other testing did not spot the missing libraries either, because our test machines have the compiler installed in order to compile native test material.  The immediate action was to [revert the change](https://github.com/adoptium/temurin-build/pull/3009), until the core issue is addressed.  To future-proof against similar problems, we will be adding smoke tests to be run in a stripped down environment.

## Respins

We have covered the issues introduced in our repositories that caused minor delays, now let's look at changes in the upstream OpenJDK repositories that resulted in the need to respin every JDK version of this release, a costly activity.

Let's look at the last 2 years and the set of unique issues identifying the need for OpenJDK to respin in the table below.

| Patch Release time | Problem Description | Symptom / Problem type | Affected release(s) | Fixed release(s) | Root cause | Introduced by CVE fix | First Chance | When Found | Suggested action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| August 2022 | JDK-8290832: It is no longer possible to change "user.dir" in the JDK8 | Crash | 8u342 | 8u345 | JDK-8194154 | No | Early access builds testing | Deployment/Field/Product integration | Run gradle application build to exercise the code path |
| August 2022 | JDK-8291665: C2: assert compiling SSLEngineInputRecord::decodeInputRecord | Crash/OOM | 11.0.16, 17.0.4, 18.0.2 | 11.0.16.1, 17.0.4.1, 18.0.2.1 |  JDK-8279219 | No | Early access builds testing | Deployment/Field/Product integration | Run wildfly deployment with TLS endpoint? / Load testing |
| February 2022 | JDK-8218546: Unable to connect to https://google.com using java.net.HttpClient | JDK-8280695 / Functional issue | 11.0.14 | 11.0.14.1 | JDK-8213189 | No | Early access builds testing | Deployment/Field/Product integration |  --- |
| November 2020 | JDK-8250861: Potential JVM crash | Unclear | 8u272, 11.0.9 | 8u275, 11.0.9.1 | Unknown |Yes |  Regression testing on Spark? | Deployment/Field/Product integration testing | Adding regression testing on Spark?? |
| August 2020 | JDK-8249677: Regression in ForkJoinPool behavior |  ACC Exception / Functional issue | 8u262 | 8u265 | JDK-8237117 | Yes | Code review | Deployment/Field/Product integration | Run lucene-solr 8.2.0 application which seemed to have discovered this issue |

---

For the JDK 8u345 respin, the issue described in JDK-8290832 points to its root cause [JDK-8194154](https://bugs.openjdk.org/browse/JDK-8194154), which describes the crash that would occur when changing the "user.dir" property.  While changing user.dir is discouraged, some applications still do it, notably Gradle.  This is an interesting dilemma, where the feature is highly discouraged, but still possible, and therefore it is used in the field by some number of applications.  

For the JDK 11.0.16.1, JDK 17.0.4.1 and JDK 18.0.2.1 respins, these could have potentially been found within the AQAvit testing if we had the [Wildfly testing](https://github.com/adoptium/aqa-tests/tree/master/external/wildfly) enabled.  This highlights the fact that we need to be testing with a broad set of external applications, especially ones that are used widely.  We are actively incorporating a set of tests in the AQAvit suite for this purpose in our [external test](https://github.com/adoptium/aqa-tests/tree/master/external) category, but need to progress this work.

For the 2 of the 5 that were introduced by CVE patches, it would be good to understand what level of testing the [OpenJDK Vulnerability Group (OJVG)](https://openjdk.org/groups/vulnerability/) does with these CVE patches ahead of releasing them into the OpenJDK codebase, and assess what needs to be changed in order to identify these issues before delivery to avoid the churn of a respin.

Since our Eclipse Foundation project is not a member of the OJVG, we do not have access to these patches ahead of the final code being available.  As such, it was less likely that we would have been able to catch these failures, as we did not have weeks to soak these changes and see the intermittent issues.  The first time we have a chance to build and test with these CVE patches is the day the final code is made available, which is Day 1 of our release period.

On Day 1 of our release period, we run [9 required top-level targets](https://github.com/adoptium/aqa-tests/blob/master/testenv/testenv.properties#L23) for AQAvit verification.  For JDK-8249677, if we add our extended.external test target as a 10th required target, we may not have seen it, as the lucene-solr application tag is at [releases/lucene-solr/8.11.1](https://github.com/adoptium/aqa-tests/blob/master/external/lucene-solr/test.properties#L2) and the issue was reported on 8.2.0.  This is yet a third case where our external test group may be of great value once we graduate it into the set of required AQAvit test targets (note to self: time to push this activity up the priority list).

In any event, in order for us to have access to these patches earlier we would need to join the OJVG.  While there has been an effort for Eclipse Foundation to join the OJVG, Oracle has denied the request. From the [Adoptium Steering Committee Minutes 2022-August-25](https://www.eclipse.org/lists/adoptium-wg/msg00160.html), Oracle have indicated that a reason for declining is that there is a perceived lack of contributions to OpenJDK from members of the Adoptium community.

Side note, in the August 25th Steering Committee meeting, it was pointed out that there is a list of contributions including those related to reproducible builds in [the reproducible builds blog post](https://adoptium.net/blog/2022/06/adoptium-reproducible-builds/).  One could argue that the OJVG would benefit from having Eclipse Adoptium as an additional member that could assist in testing these patches more heavily and across a very broad range of platforms to boot.

In absence of membership, we will have to look at soak testing our release builds a bit longer, balancing the benefits against the increased time it would take us to release products.

### Positive Takeaways

While most of this blog post has been spent analyzing what could be improved, it is important to remember that many things went well and how we have continuously improved our deliveries.  This past release is no exception.  Even during this release, we were able to improve the speed with which we delivered the respun products for late changes in OpenJDK.  

| Release activity | % tarballs published within target |
| --- | --- |
| Initial July release | 64.3% |
|JDK 8u345 respin | 63.6% |
|JDK 11.0.16.1+1 respin | 90.9%|
|JDK 17.0.4.1+1 respin | 72.7%|
|JDK 18.0.2.1+1 respin | 100%|

We have continued to improve the way we communicate the progress of the release to the community, and the automation related to all of the steps required to deliver the Eclipse Temurin builds.  Let's celebrate these good things.  I look forward to further refinements outlined in [adoptium/issues/155](https://github.com/adoptium/adoptium/issues/155) and invite any and all to participate at the project to help develop and deliver them.  One additional plug for support, if you want to help but have no spare time for project work, you can also directly [sponsor](https://github.com/sponsors/adoptium) the project.  We typically focus these funds to help ensure we have sufficient machine resources to reduce bottlenecks in our pipelines.
