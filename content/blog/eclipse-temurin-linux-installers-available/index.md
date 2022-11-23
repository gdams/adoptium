---
title: Eclipse Temurin Linux (RPM/DEB) installer packages
date: "2021-12-30T12:00:00+00:00"
author: georgeadams
description: Eclipse Temurin RPM and DEB packages are now available for installing on your favourite Linux distribution.
tags:
  - Temurin
---

Eclipse Temurin RPM and DEB packages are now available for installing on your favourite Linux distribution.

## Eclipse Temurin Package Names

The following name schema is being used:

```output
temurin-<version>-jdk
e.g temurin-17-jdk or temurin-8-jdk
```

## Deb installation on Debian or Ubuntu

1. Ensure the necessary packages are present:

    ```bash
    apt-get install -y wget apt-transport-https gnupg
    ```

1. Download the Eclipse Adoptium GPG key:

    ```bash
    wget -O - https://packages.adoptium.net/artifactory/api/gpg/key/public | apt-key add -
    ```

1. Configure the Eclipse Adoptium apt repository by replacing the values in angle brackets:

    ```bash
    echo "deb https://packages.adoptium.net/artifactory/deb $(awk -F= '/^VERSION_CODENAME/{print$2}' /etc/os-release) main" | tee /etc/apt/sources.list.d/adoptium.list
    ```

1. Install the Temurin version you require:

    ```bash
    apt-get update # update if you haven't already
    apt-get install temurin-17-jdk
    ```

## CentOS/RHEL/Fedora Instructions

1. Add the RPM repository to `/etc/yum.repos.d/adoptium.repo` making sure to change the CentOS version if you are not using CentOS 8, and if you are on a 32-bit ARM system, replace `$(uname -m)` with `armv7hl`. RPMs are also available for RHEL and Fedora. To check the full list of versions supported take a look at the list in the tree at https://packages.adoptium.net/ui/repos/tree/General after clicking the "Artifacts" link on the left

    ```bash
    cat <<EOF > /etc/yum.repos.d/adoptium.repo
    [Adoptium]
    name=Adoptium
    baseurl=https://packages.adoptium.net/artifactory/rpm/centos/8/$(uname -m)
    enabled=1
    gpgcheck=1
    gpgkey=https://packages.adoptium.net/artifactory/api/gpg/key/public
    EOF
    ```

1. Install the Temurin version you require:

    ```bash
    yum update # update if you haven't already
    yum install temurin-17-jdk
    ```

## openSUSE/SLES Instructions

1. Import the RPM repository making sure to change the openSUSE version if you are not using OpenSUSE 15.2. RPM’s are also available for SLES 12 and 15. To check the full list of versions supported take a look at https://packages.adoptium.net/ui/repos/tree/General/rpm.

    ```bash
    zypper ar -f https://packages.adoptium.net/artifactory/rpm/opensuse/15.2/$(uname -m) adoptium
    ```

1. Install the Temurin version you require:

    ```bash
    zypper install temurin-17-jdk
    ```

Please raise any issues over at https://github.com/adoptium/installer/issues.
