// This file is used to store defaults which can be accessed by other Javascript/Typescript functions

export const oses = ['Linux', 'alpine-linux', 'Windows', 'mac', 'AIX', 'Solaris']
export const arches = ['x64', 'x86', 'aarch64', 's390x', 'ppc64le', 'ppc64', 'arm', 'sparcv9']
export const packageTypes = ['JDK', 'JRE']
export const versions = [19, 18, 17, 16, 11, 8]
// LTS versions only are listed here
export const versionsLTS = [17, 11, 8]
export const marketplaceDistributions = ['microsoft', 'temurin', 'zulu', 'semeru_certified']
// The default JDK version to serve up on pages
export const defaultVersion = 17
export const defaultPackageType = 'jdk'
export const defaultArchitecture = 'x64'
