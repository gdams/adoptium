# Important Update: Removal of CentOS 7 Eclipse Temurin Images

We would like to inform our users that as of the next PSU release on July 16th, Eclipse Temurin images with the CentOS 7 base will be removed. This decision comes in light of CentOS 7 reaching its End of Life (EOL) on June 30th, 2024. No further updates or support will be provided for CentOS 7, and to ensure the continued security and stability of your applications, we recommend migrating to the UBI9-minimal images.

## Key Changes

- **CentOS 7 EOL**: As CentOS 7 has reached its EOL, it will no longer receive updates or support.
- **Removal Date**: CentOS 7 based Eclipse Temurin images will be removed in the PSU release on July 16th.
- **New Base Image**: All users should migrate to the UBI9-minimal images.

### Migration Guide

To assist with this transition, here is a simple migration guide. If you are currently using an image like `17-jdk-centos7`, you should update your Dockerfile to use `17-jdk-ubi9-minimal`.

#### Example Migration

**Old Dockerfile using CentOS 7:**
```Dockerfile
FROM eclipse-temurin:17-jdk-centos7

# Your application setup here
```

**New Dockerfile using UBI9-minimal:**
```Dockerfile
FROM eclipse-temurin:17-jdk-ubi9-minimal

# Your application setup here
```

### Important Note on Package Manager

When migrating to UBI9-minimal, note that the package manager differs from CentOS 7. Instead of yum, you will need to use microdnf.

#### Example Package Installation

**Using yum in CentOS 7:**

```Dockerfile
RUN yum install -y some-package
```

**Using microdnf in UBI9-minimal:**

```Dockerfile
RUN microdnf install -y some-package
```

### Resources

For more details on the End of Life for CentOS 7, you can refer to the official announcement by Red Hat: [CentOS Linux EOL](https://www.redhat.com/en/topics/linux/centos-linux-eol).

If you have any questions or need further assistance with the migration, please create a [GitHub issue](https://github.com/adoptium/containers/issues/new).

Thank you for your understanding and cooperation in ensuring a smooth transition.
