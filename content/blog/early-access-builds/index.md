---
title: Early access builds for JDK21
date: "2023-08-14T14:00:00+00:00"
author: sxa
description: Adoptium are publishing early access "tagged" builds instead of nightlies for JDK21
tags:
  - temurin
---
In addition to the generally available release builds of all currently supported
versions of openjdk (Currently 8, 11, 17 and 20) Temurin also publishes "nightly"
development builds of all of those streams as well as the upcoming release (JDK21
at the moment) as "nightly" or "early access" builds. You can get these from
[the nightly downloads page](https://adoptium.net/temurin/nightly/?version=21)
or from the API. Note that while these are
not intended for production use they can be used to test a build containing any
new fixes which have been put into openjdk along with any new features that
will be coming in the next release.

## Early access (ea) tagged builds of JDK21

We have recently changed the way we do the regular nightly builds of JDK21.
Instead of producing regular builds of the latest development code, we are
building explicitly from the early access tags when they come out.  This is
consistent with what OpenJDK does with the builds at
https://jdk.java.net/21/ but on a wider range of platforms.  Similar to the
nightly builds mentioned in the introduction, these are not for production
use but may be useful for testing new features as they go into the JDK21
codebase.  By using the specific early access tags you can also report
issues upstream more easily by knowing exactly which tagged level you have
discovered any problems with.

You can download the latest ea build from the API by retrieving this (replace
linux and x64 with the platform you are interested in:

```text
https://api.adoptium.net/v3/binary/latest/21/ea/linux/x64/jdk/hotspot/normal/adoptium
```

If you want to download a specific EA build instead of the latest, you can
do so using a URL such as:

```text
https://api.adoptium.net/v3/binary/version/jdk-21+32-ea-beta/linux/aarch64/jdk/hotspot/normal/adoptium
```

The output from java -version for these builds will look like this (but it
may change in the future) The `-ea` indicates that it is build from the
early access tag in GitHub:

```output
openjdk version "21-beta" 2023-09-19
OpenJDK Runtime Environment Temurin-21+34-202308031254 (build 21-beta+34-ea)
OpenJDK 64-Bit Server VM Temurin-21+34-202308031254 (build 21-beta+34-ea, mixed mode, sharing)
```

## Using the ea builds with GitHub actions

If you want to pull a Temurin JDK21 ea build in a GitHub action, you can use
the following:

```yaml
     - uses: actions/setup-java@v3
        with:
          java-version: 21-ea
          distribution: temurin
```

## Will you be doing this with earlier releases?

We are looking at whether it makes sense to build ea levels instead of
regular nightly head builds of the other supported codebases. If you have a
view on whether that would be useful please let us know by commenting in
[this issue](https://github.com/adoptium/temurin-build/issues/3450).
