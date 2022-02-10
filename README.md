# Adoptium Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/359195e4-6832-4457-b67c-e79ddaf8c549/deploy-status)](https://app.netlify.com/sites/eclipsefdn-adoptium-v2/deploys)

This repository contains the source code for [https://adoptium.net](https://adoptium.net).

The main branch contains the source code necessary for development. The production website is hosted on Netlify which also supports pull request staging.

## Tech Stack

This is is a NodeJS / NPM driven stack with AsciiDoc used for static content and Gatsby as the rendering engine etc.

## How to develop locally

This assumes you already have Node.js and NPM installed. At time of writing we use Node.js 16.14.0 and NPM 8.3.1. We recommend using nvm to manage your versions.

1. Install your dependencies

    ```shell
    npm install
    npm install --global gatsby-cli
    ```

1. Start the site up. Gatsby will build all of the various parts of the site (Asciidoc etc). Note that this command takes some time to execute.

    ```shell
    gatsby develop
    ```

1. **Open the source code and start editing!**

    Your site is now running at `http://localhost:8000`!

    _Note: You'll also see a second link:_`http://localhost:8000/___graphql`_. This is a tool you can use to experiment with querying your data. Learn more about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.com/tutorial/part-five/#introducing-graphiql)._

    Open the directory in your code editor of choice and edit relevant files under the `src/` directory. Save your changes and the browser will update in real time!

## Configuring the build

`gatsby-config.js` is effectively your build script and `gatsby-node.js` is where the Asciidoc rendering takes place.

## How to contribute

See [CONTRIBUTING.md]
