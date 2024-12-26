# Asciidoc Pages

Most static pages on this site are written as [asciidoc](https://asciidoctor.org/docs/what-is-asciidoc/) pages. These are similar to Markdown in format but give us more flexibility.

The directory layout of these files is very important as it determines the path to the file in the site. For example a document in `/foo/bar/index.adoc` will be served up as `/foo/bar` on the site. You could also store the same document as `/foo/bar.adoc` but we generally discourage this as we need a parent folder to store localised versions of the page.

```tree
.
├── about.adoc
├── docs
│   ├── aqavit-verification.adoc
│   ├── faq
│   │   ├── index.adoc
│   │   └── index.de.adoc
│   ├── first-timer-support
│   │   ├── index.adoc
│   │   └── index.de.adoc
│   └── qvs-policy
│       ├── index.adoc
│       └── index.de.adoc
├── installation
│   ├── archives.adoc
│   └── windows.adoc
└── supported-platforms.adoc
```

## Required Attributes

Every asciidoc file must have a `page-authors` attribute at the top. If you are starting a new page then start with just your own GitHub username. There is a [GitHub Action](https://github.com/adoptium/adoptium.net/blob/main/.github/workflows/check-contributors.yml) that will update contributors automatically once the doc has been merged so there is no need to add your username if you're editing an existing doc.

```adoc
:page-authors: gdams, karianna, sxa
:keywords: two-to-three, keywords, are, good
```

There may be other attributes that are required for your particular piece of documentation. See [Document Attributes](https://docs.asciidoctor.org/asciidoc/latest/attributes/document-attributes/) for more information.

## Localising Documentation

The site has multi-language support which means that documentation can be served up in the users local language. By default, the English version if served if a localised version doesn't exit.

Localised documentation is named with the language key in the name so a German version would be `index.de.adoc` and a Spanish version would be `index.es.adoc`.

If you want to modify an existing translation you can locate the file most easily using the `Edit this page` button at the bottom of the page:

![Edit this page](https://user-images.githubusercontent.com/20224954/157446389-2293e3cc-82b4-4375-96e8-7c60b8d5de56.png)

To add a newly translated document you must first ensure that the english version is inside a parent folder. E.g to translate `docs/foo.adoc` to German firstly create a directory called `foo` and move the `foo.adoc` file to `/docs/foo/index.adoc`. Once the directory is correctly laid-out you can create a file called `/docs/foo/index.de.adoc` which contains the translated documentation.

## Adding Images

You may wish to add images to the Asciidoc page. In order to do this you should add the image to the static directory at the root of this repository (`/static/images/`). Once you've added the image you can reference it in the document using the following syntax:

```adoc
image:sample_image.png[a description of the image]
```

Which would pick up the file from `/static/images/sample_image.png`. Please note that editors will not show the render the image because it has to be in a different directory for the site framework.
