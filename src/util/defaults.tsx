// This file is used to store defaults which can be accessed by other Javascript/Typescript functions

export const oses = ['Linux', 'alpine-linux', 'Windows', 'mac', 'AIX', 'Solaris'];
export const arches = ['x64', 'x86', 'aarch64', 's390x', 'ppc64le', 'ppc64', 'arm', 'sparcv9'];
export const packageTypes = ['JDK', 'JRE'];

let defaultPackageType = 'jdk';
let defaultArchitecture = 'x64';

export { defaultPackageType, defaultArchitecture };
