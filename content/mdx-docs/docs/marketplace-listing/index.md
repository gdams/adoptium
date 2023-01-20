---
title: 'Adoptium&reg; Marketplace Publisher Product Listing Repository'
authors: johnoliver, tellison, gdams
---

## Overview

Adoptium promotes products listed in the [marketplace](/marketplace). Each publisher manages a location containing structured information about their products. Adoptium regularly updates the marketplace with the information from your product listing. The location refers to a "respository" of data resources. Such a respository may be implemented as a simple file system, dynamically created data stream, version controlled store, database, or other facility that responds to HTTP requests for individual URIs with the information described below.

In the description and examples below we will refer to "files" and "directories" as the implementation of the repository to keep it simple.

## Nomenclature

A repository consists of three types of files, namely *index* files, *release* files and *signature* files.

* Index files : describe the location of release files and index files.
* Release files : contain a list of marketplace products.
* Signature files : contain a digital signature associated with an Index or Release file.

All files are read assuming UTF-8 encoding.

## Signature Files

Signature files are used to ensure that the index and release file data has been received correctly, and has not been modified en route. The Adoptium marketplace agent will read a file and check the associated file signature. The file's signature is stored in a file with the same name as the file it is signing, with the suffix `.sha256.sign`.

The signature must be a Base64-encoded, RSA encrypted, SHA-256 hash of your entire file content. The signature will be verified using the public key provided in your [publisher information](/docs/marketplace-guide#providing-publisher-information).

There are a number of [tools](https://opensource.com/article/19/6/cryptography-basics-openssl-part-2) and [code examples](https://www.baeldung.com/java-digital-signature) available to help produce such signatures.

<Collapsible title='Generating, verifying, and encoding a signature usings OpenSSL'>

```bash
# Generate signature
openssl dgst -sha256 -sign private.pem -out index.json.sig index.json

# Verify
openssl dgst -sha256 -verify public.pem -signature index.json.sig index.json

#Base64 encode for publishing
cat index.json.sig | base64 -w 0 > index.json.sha256.sign
```

</Collapsible>

## Simple Product Listing Repository

The simplest product listing repository comprises one index file and one release file, with associated digital signatures.

The top-level index file must appear at the root of the repository location, and must be called `index.json`.

Here's a simple listing repository example.

```output
/index.json // <1>
/index.json.sha256.sign // <2>
/release.json // <3>
/release.json.sha256.sign // <4>
```

1. Main product repository index file.
1. Digital signature for index file.
1. Product release listing file.
1. Digital signature for release listing file.

The simplest `index.json` file only contains a reference to a single `releases.json` file.

```json
{
  "schema_version": "1.0.0",
  "releases": [
    "example.json"
  ]
}
```

## Structured Repository Layout

The product listing repository may be structured with multiple index files and release files to suit each vendor's publishing preferences.  For example, a publisher may choose to generate a releases file per Java version, per platform, per calendar release, and so on. The Adoptium marketplace will start at the root `index.json` and transitively walk each index file exhaustively to find all release files.

As a further more complex example, the following repository shows a release file structure organized by Java version and release identifier.

```tree
.
├── 17
│   ├── index.json
│   ├── index.json.sha256.sign
│   ├── jdk_17_0_1_12.json
│   ├── jdk_17_0_1_12.json.sha256.sign
│   ├── jdk_17_0_2_8.json
│   └── jdk_17_0_2_8.json.sha256.sign
├── 8
│   ├── index.json
│   ├── index.json.sha256.sign
│   ├── jdk8u312_b07.json
│   └── jdk8u312_b07.json.sha256.sign
├── index.json
└── index.json.sha256.sign
```

In this repository the root `/index.json` would contain

```json
{
  "schema_version": "1.0.0",
  "indexes": [
    "8/index.json",
    "17/index.json"
  ],
  "releases": [
  ]
}
```

and the `17/index.json` would contain

```json
{
  "schema_version": "1.0.0",
  "indexes": [
  ],
  "releases": [
    "jdk_17_0_1_12.json",
    "jdk_17_0_2_8.json"
  ]
}
```

Note that although in this example we have created one index file per major Java version and one release file for each Java release, this is not a requirement. An index may contain multiple indices and releases, and a release file may contain multiple version releases if desired.

TIP: Each index and release file reference is considered relative to the index file path, i.e if `https://release.adoptium.net/repo/17/index.json` contained a release of `jdk_17_0_2_8.json`, the path of `https://release.adoptium.net/repo/17/jdk_17_0_2_8.json` will be examined.

## Release File

The release file contains details about your products, including the Java version, target machine architcture, download location, test result location, and more. The name of the release file is not relevant to the Adoptium marketplace beyond being referenced from an index file as described above.

{/*TODO: fix up URL when schema moves to main branch*/}

Your products' release file listing must adhere to the
[marketplace product JSON schema](https://github.com/adoptium/api.adoptium.net/tree/marketplace/marketplace), and Adoptium provides [examples](https://github.com/adoptium/api.adoptium.net/blob/marketplace/marketplace/adoptium-marketplace-schema-tests/src/test/resources/net/adoptium/marketplace/schema/) and
[code](https://github.com/adoptium/api.adoptium.net/tree/marketplace/marketplace/adoptium-marketplace-schema) to help produce product listing data in the correct format.

The live Temurin release files are available in a our public [marketplace data repository](https://github.com/adoptium/marketplace-data) and serve as an example of what is expected.

## Repository Read and Marketplace Update Process

Adoptium typically retrieves the product listing information hourly, though this period is not guaranteed and may vary. Adoptium may consider your HTTP response [cache-control http headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control) such as `max-age` to guide the frequency of fetching the product listing. In turn the Adoptium request may specify a [conditional request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests) for your listing file with headers such as [If-Modified-Since](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Modified-Since) to help reduce workload.

A product listing file will be rejected if it does not adhere to the schema, or the signature does not verify the content successfully. We will contact you if the listing file is repeatedly failing these validation checks.

When read successfully, the new marketplace information replaces any previous information held for [this vendor](/docs/marketplace-guide#providing-publisher-information).

In summary, the update process proceeds as follows:

1. The updater pulls the root index and verifies it against the signature.
1. Further indexes, if any, are extracted from the index recursively until all indexes have been read and verified.
1. The location of all release files are extracted from all the indexes.
1. Each release file is pulled and validated against the corresponding signature.
1. Release file information is parsed and validated according to the schema
1. All product information is replaced in the marketplace for this vendor.
