---
title: External audit of Temurin build and distribution processes
date: "2024-06-17T17:00:00+00:00"
author: pmc
description:
tags:
  - temurin
  - security
---
## Introduction

Last year, the Eclipse Foundation engaged the
[Open Source Technology Improvement Fund](https://ostif.org/) to
perform an independent audit of the build and distribution processes for
Eclipse Temurin. This was done by the cybersecurity research and consulting
firm [Trail of Bits](https://www.trailofbits.com/).

## Motivation

The work done as part of this audit is consistent with other
[software supply-chain security work](https://adoptium.net/docs/slsa/) which
the Adoptium team are already doing with Temurin, such as the work to
attain
[SLSA build level 3 compliance](https://adoptium.net/blog/2024/01/slsabuild3-temurin/)
as well as other work to
[harden the security](https://adoptium.net/docs/secure-software/) of parts of the project, so it
was a natural next step to have an external team look at our build and
distribution processes to identify areas for improvement.

## Semgrep static analysis

As part of this collaboration with Trail of Bits we have also implemented
the open-source static analysis tool
[Semgrep](https://github.com/adoptium/infrastructure/issues/3371#issuecomment-1976959833)
in our repositories as an additional automated check on each PR to ensure
that the types of findings from the audit are identified before being merged
into our codebase if they occur in the future.

## Status of the audit

The audit and subsequent remediation work from it are now complete. The
[report from Trail of bits](https://ostif.org/wp-content/uploads/2024/06/Temurin-Final-Report.pdf)
is now available, and a document with our
[response and list of remediation actions](https://adoptium.net/pdf/temurin-audit-response.pdf) is also available.

## Conclusion

This has been a very productive collaboration for the Adoptium team. Thanks go to the OpenSSF’s
Alpha-Omega project that provided funding to help Adoptium and other Eclipse Foundation projects
improve their security, the Foundation itself for providing this opportunity to Adoptium, and the
Adoptium project members that worked on achieving the resolutions.

An exercise such as this could be very useful for other projects out there.
A list of others that Trail of Bits have been involved with can be seen on
[their publication page](https://github.com/trailofbits/publications).
