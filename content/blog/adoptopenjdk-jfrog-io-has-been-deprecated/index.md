---
title: AdoptOpenJDK.jfrog.io has been deprecated!
date: "2023-07-05T12:00:00+00:00"
author: pmc
description: DEPRECATION - Scheduled brownouts for adoptopenjdk.jfrog.io
tags:
  - Deprecation
  - Installers
---

If you are still utilising the deprecated [adoptopenjdk.jfrog.io](https://adoptopenjdk.jfrog.io) service, it's essential to understand the potential vulnerabilities associated with this choice. As the service has been deprecated, it is no longer actively maintained or updated to address security concerns. This means that the OpenJDK distributions obtained from this source may contain known vulnerabilities that are not recommended for production use.

In a rapidly evolving technological landscape, security vulnerabilities are discovered regularly, and updates and patches are released to address them. By continuing to use adoptopenjdk.jfrog.io, you are essentially missing out on these critical updates, leaving your applications and systems exposed to potential security breaches.

In an effort to migrate users onto the new [packages.adoptium.net](https://packages.adoptium.net) service, we will be operating scheduled brownouts in which the old service will return an error code. This will break users but will be the most efficient way to encourage people to migrate to the new service. This will ultimatelt lead to the service being shut down at the end of 2023.

## Scheduled Brownout plan

The brownout plan is a carefully orchestrated process that aims to gradually phase out the usage of adoptopenjdk.jfrog.io while providing developers with sufficient time to migrate to [packages.adoptium.net](https://packages.adoptium.net). The following table outlines the key stages and timeline of the brownout plan:

| Time Period                | Brownout Duration (GMT)                    |
|----------------------------|--------------------------------------------|
| July 05 - July 20          | No Brownout, Notifications Only            |
| July 21 - July 27          | 2:00 - 3:00 and 14:00 - 15:00              |
| July 28 - August 3         | 1:00 - 3:00, 13:00 - 15:00, 22:00 - 00:00  |
| August 4 - August 10       | 1:00 - 5:00, 12:00 - 16:00, 22:00 - 02:00  |
| August 11 - August 17      | 1:00 - 9:00                                |
| August 18 - August 24      | 1:00 - 13:00                               |
| August 25 - August 31      | 1:00 - 17:00                               |
| September 1 - September 30 | A full day every other day                 |
| October 1 - December 31    | Full day for three consecutive days weekly |

## Migrating to packages.adoptium.net

To ensure the security and reliability of your Java applications, it is imperative to transition to the new platform, packages.adoptium.net. This updated service provides a more secure and up-to-date environment for obtaining Temurin binaries. By making this switch, you gain access to the following benefits:

- **Reliable Security Updates**: packages.adoptium.net is actively maintained, and security updates are promptly applied to address any vulnerabilities discovered within Temurin binaries. This ensures that you have the latest patches and fixes to safeguard your applications.

- **Long-Term Support**: packages.adoptium.net hosts long-term support (LTS) versions of Eclipse Temurin, providing stability and extended maintenance for your critical applications. This is particularly valuable for production environments that require ongoing support and bugfixes.

The documentation for switching to these new packages is available in our [Linux Installer Guide](/installation/linux/).

## A final thank you

The project would like to express their gratitude to [jFrog](https://jfrog.com/artifactory/) for their ongoing sponsorship of both the old (and new) Artifactory instances. Without the help of companies like jFrog, it would be impossible to offer the variety of services that we do. For our full list of infrastructure sponsors see our [Sponsors List](/sponsors).
