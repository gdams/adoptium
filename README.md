# Adoptium Site

[![Netlify Status](https://api.netlify.com/api/v1/badges/359195e4-6832-4457-b67c-e79ddaf8c549/deploy-status)](https://app.netlify.com/sites/eclipsefdn-adoptium/deploys) [![codecov](https://codecov.io/gh/adoptium/adoptium.net/branch/main/graph/badge.svg?token=XGJMJVT8BA)](https://codecov.io/gh/adoptium/adoptium.net) [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/adoptium/adoptium.net/badge)](https://api.securityscorecards.dev/projects/github.com/adoptium/adoptium.net)

This repository contains the source code for [https://adoptium.net](https://adoptium.net).

The main branch contains the source code necessary for development. The production site is hosted on Netlify which also supports pull request staging.

## Tech Stack

This is is a Node.js / npm driven stack with AsciiDoc used for static content and Gatsby as the rendering engine etc.

## How to develop locally

This assumes you already have Node.js and npm installed. Node.js version 18 or above is required. We recommend using [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md) to manage your versions.

1. Install your dependencies

    ```bash
    npm install
    ```

1. Start the site up. Gatsby will build all of the various parts of the site (Asciidoc etc). Note that this command takes some time to execute.

    ```bash
    npm start
    ```

1. If you need more memory (FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory)

    ```bash
    export NODE_OPTIONS=--max-old-space-size=4096
    ```

1. **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link:_`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the directory in your code editor of choice and edit relevant files under the `src/` directory. Save your changes and the browser will update in real time!

## Configuring the build

`gatsby-config.ts` is effectively your build script and `gatsby-node.ts` is where the Asciidoc rendering takes place.

## How to contribute

See [CONTRIBUTING.md](CONTRIBUTING.md)
