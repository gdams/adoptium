---
title: Eclipse Temurin JDK 24.0.0+36 enables JEP 493
date: "2025-02-27"
author: sgehwolf
description: Eclipse Temurin enables JEP 493 for the JDK 24 general availability release (24.0.0+36) which significantly reduces the size of the JDK archive.
tags:
  - temurin
  - announcement
  - release-notes
---

The upcoming release of Eclipse Temurin 24.0.0+36 will have [JEP
493](https://openjdk.org/jeps/493) enabled. Note: It's disabled by default.
That is, the JDK 24 release archive of Eclipse Temurin will be about 35%
smaller. The installed size on-disk will be about 15% smaller. It also means
that the release no longer includes the `jmods` folder. That folder included
packaged modules of the JDK and was being used when running the `jlink`
command.

JEP 493 enhances the JDK to use `jlink` without needing the `jmods` folder (or
packaged modules). `jlink` will work as before for most use-cases. For example,
in order to create a custom runtime with only `java.se` modules one could
create such a runtime as before with the following command (note: the
`--verbose` option was added for explicitness):

```bash
$ ./jdk-24+36/bin/jlink --add-modules java.se \
       --output jdk-24.se-only --verbose
Linking based on the current run-time image
java.base jrt:/java.base (run-time image)
java.compiler jrt:/java.compiler (run-time image)
java.datatransfer jrt:/java.datatransfer (run-time image)
java.desktop jrt:/java.desktop (run-time image)
java.instrument jrt:/java.instrument (run-time image)
java.logging jrt:/java.logging (run-time image)
java.management jrt:/java.management (run-time image)
java.management.rmi jrt:/java.management.rmi (run-time image)
java.naming jrt:/java.naming (run-time image)
java.net.http jrt:/java.net.http (run-time image)
java.prefs jrt:/java.prefs (run-time image)
java.rmi jrt:/java.rmi (run-time image)
java.scripting jrt:/java.scripting (run-time image)
java.se jrt:/java.se (run-time image)
java.security.jgss jrt:/java.security.jgss (run-time image)
java.security.sasl jrt:/java.security.sasl (run-time image)
java.sql jrt:/java.sql (run-time image)
java.sql.rowset jrt:/java.sql.rowset (run-time image)
java.transaction.xa jrt:/java.transaction.xa (run-time image)
java.xml jrt:/java.xml (run-time image)
java.xml.crypto jrt:/java.xml.crypto (run-time image)

Providers:
  java.desktop provides java.net.ContentHandlerFactory used by java.base
  java.base provides java.nio.file.spi.FileSystemProvider used by java.base
  java.naming provides java.security.Provider used by java.base
  java.security.jgss provides java.security.Provider used by java.base
  java.security.sasl provides java.security.Provider used by java.base
  java.xml.crypto provides java.security.Provider used by java.base
  java.management.rmi provides javax.management.remote.JMXConnectorProvider used by java.management
  java.management.rmi provides javax.management.remote.JMXConnectorServerProvider used by java.management
  java.desktop provides javax.print.PrintServiceLookup used by java.desktop
  java.desktop provides javax.print.StreamPrintServiceFactory used by java.desktop
  java.management provides javax.security.auth.spi.LoginModule used by java.base
  java.desktop provides javax.sound.midi.spi.MidiDeviceProvider used by java.desktop
  java.desktop provides javax.sound.midi.spi.MidiFileReader used by java.desktop
  java.desktop provides javax.sound.midi.spi.MidiFileWriter used by java.desktop
  java.desktop provides javax.sound.midi.spi.SoundbankReader used by java.desktop
  java.desktop provides javax.sound.sampled.spi.AudioFileReader used by java.desktop
  java.desktop provides javax.sound.sampled.spi.AudioFileWriter used by java.desktop
  java.desktop provides javax.sound.sampled.spi.FormatConversionProvider used by java.desktop
  java.desktop provides javax.sound.sampled.spi.MixerProvider used by java.desktop
  java.logging provides jdk.internal.logger.DefaultLoggerFinder used by java.base
  java.desktop provides sun.datatransfer.DesktopDatatransferService used by java.datatransfer 
$ ./jdk-24.se-only/bin/java --version
openjdk 24-beta 2025-03-18
OpenJDK Runtime Environment Temurin-24+36-202502111438 (build 24-beta+36-ea)
OpenJDK 64-Bit Server VM Temurin-24+36-202502111438 (build 24-beta+36-ea, mixed mode)
```

As you can see, `jlink` still works. For some of the more uncommon use-cases we
provide some frequently asked questions below that you might find helpful.

Should you run into problems with this feature, please report a bug about it here:
https://github.com/adoptium/adoptium-support/issues

## Frequently Asked Questions (FAQ)

### Won't jlink no longer work without JMODs?

This is what JEP 493 changes. Since Eclipse Temurin 24 enables the feature at
build time, `jlink` will link from the runtime image and will, therefore, no
longer need JMODs for creating custom runtimes. The user experience is the same
when using jlink.  One can check with `jlink --help` that JEP 493 is enabled:

```bash
$ ./jdk-24+36/bin/jlink --help | tail -n2
Capabilities:
      Linking from run-time image enabled
```

### Using jpackage fails with: "jlink failed with: Error: This JDK does not contain packaged modules and cannot be used to create another image with the jdk.jlink module"

Linking from the runtime image doesn't allow including the `jdk.jlink` module
itself. See "Restrictions" in the [JEP](https://openjdk.org/jeps/493). Since
the `jdk.jlink` module, with JEP 493 enabled, includes extra data needed for
linking from the runtime image, it has been decided to prevent such multi-hop
`jlink` runs.

With that said, this is actually a `jpackage`
[bug](https://bugs.openjdk.org/browse/JDK-8345185). `jpackage` ought not to
perform service bindings for providers in the set of modules that get linked
into a default runtime that `jpackage` generates under the hood. The bug,
[JDK-8345185](https://bugs.openjdk.org/browse/JDK-8345185), has been fixed in
JDK 24.0.2 (July 2025 release). Until then, it's suggested to pass required
modules for your application with the `--add-modules` option of `jpackage`.
Note that the `DEFAULT-MODULE-PATH` set for JDK 24 without service bindings
that JDK 24.0.2 would use is (modulo some application specific modules):

```bash
java.rmi,jdk.management.jfr,jdk.jdi,jdk.xml.dom,java.xml,java.datatransfer,
jdk.httpserver,java.desktop,java.security.sasl,jdk.zipfs,java.base,jdk.javadoc,
jdk.management.agent,jdk.jshell,jdk.jsobject,java.sql.rowset,jdk.sctp,
jdk.unsupported,java.smartcardio,java.security.jgss,java.compiler,jdk.nio.mapmode,
jdk.dynalink,jdk.unsupported.desktop,jdk.accessibility,jdk.security.jgss,
jdk.incubator.vector,java.sql,java.transaction.xa,java.logging,java.xml.crypto,
jdk.jfr,jdk.internal.md,jdk.net,java.naming,jdk.internal.ed,java.prefs,
java.net.http,jdk.compiler,jdk.internal.opt,jdk.jconsole,jdk.attach,
jdk.internal.le,java.management,jdk.jdwp.agent,jdk.internal.jvmstat,
java.instrument,jdk.management,jdk.security.auth,java.scripting,jdk.jartool,
java.management.rmi
```

### Generating a runtime using jlink with ALL-MODULE-PATH no longer seems to work

When I run `jlink --add-modules ALL-MODULE-PATH --output myimage` I get:

```output
Error: --module-path option must be specified with --add-modules ALL-MODULE-PATH
```

The relevant upstream OpenJDK change is
[JDK-8345259](https://bugs.openjdk.org/browse/JDK-8345259). Prior to JDK 24,
using `--add-modules ALL-MODULE-PATH` was equivalent to `--add-modules
ALL-MODULE-PATH --module-path $JAVA_HOME/jmods` which essentially meant to
create a runtime with *all* JDK modules. If this is what you intended to get a
"smaller" runtime, then a similar result could be achieved by:

1. Taking a JDK 24 Eclipse Temurin installation, copy it to a new location.
   Note that it already doesn't include the `jmods` folder.
2. Removing the `src.zip` file from the `lib` folder (~51 MB)

If you are really interested in smaller custom runtimes, however, you should
not include *all* JDK modules. I.e. consider using explicit modules in
`--add-modules` clause instead.
