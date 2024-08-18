import crypto from 'crypto'
import path from 'path'
import fetch from 'node-fetch'
import fs from 'fs'
import util from 'node:util'
import { exec as execChild } from 'node:child_process'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { createFilePath } from 'gatsby-source-filesystem'
import locales from './locales/i18n'
import authors from './src/json/authors.json'
import type { GatsbyNode, Node } from 'gatsby'

import { localizedSlug, findKey, removeTrailingSlash } from './src/util/gatsby-node-helpers'
const exec = util.promisify(execChild)

interface SourceNodesArgs {
  actions: {
    createNode: (node: any) => void;
  };
  createNodeId: (id: string) => string;
}

interface AdoptiumData {
  available_releases: string[];
  available_lts_releases: string[];
  most_recent_lts: string;
  most_recent_feature_version: string;
}

interface MdxNode extends Node {
  frontmatter: {
    date: string;
  };
  fields: {
    slug: string;
    gitSHA?: string;
  }
}

interface LocaleEntry {
  default?: boolean;
  locale: string;
  path: string;
}

// Import available versions from Adoptium API
export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId }: SourceNodesArgs) => {
  const { createNode } = actions

  // Fetch available versions from Adoptium API
  const res = await fetch('https://api.adoptium.net/v3/info/available_releases')
  const data: AdoptiumData = await res.json()

  data.available_releases.forEach((release, i) => {
    const nodeContent = JSON.stringify(release)

    const nodeMeta = {
      id: createNodeId(`adoptium-release-${i}`), // Unique identifier for each node
      parent: null,
      children: [],
      internal: {
        type: 'Versions',
        content: nodeContent,
        contentDigest: crypto
          .createHash('md5')
          .update(nodeContent)
          .digest('hex')
      }
    }

    const lts = data.available_lts_releases.includes(release)

    const extraData = {
      version: release,
      lts,
      label: lts ? `${release} - LTS` : release.toString()
    }

    // Combine the metadata and data to create the node
    const node = Object.assign({}, extraData, nodeMeta)
    createNode(node)
  })

  // Create a node for the most recent LTS release
  const latestLTS = data.most_recent_lts
  const nodeContent = JSON.stringify(latestLTS)
  const node = {
    id: createNodeId('adoptium-lts-most-recent'), // Unique identifier for each node
    version: latestLTS,
    parent: null,
    children: [],
    internal: {
      type: 'MostRecentLTS',
      content: nodeContent,
      contentDigest: crypto
        .createHash('md5')
        .update(nodeContent)
        .digest('hex')
    }
  }
  createNode(node)

  // Create a node for the most_recent_feature_version
  const latestFeatureVersion = data.most_recent_feature_version
  const nodeContentFeatureVersion = JSON.stringify(latestFeatureVersion)
  const MostRecentFeatureVersion = {
    id: createNodeId('adoptium-feature-version-most-recent'), // Unique identifier for each node
    version: latestFeatureVersion,
    parent: null,
    children: [],
    internal: {
      type: 'MostRecentFeatureVersion',
      content: nodeContentFeatureVersion,
      contentDigest: crypto
        .createHash('md5')
        .update(nodeContentFeatureVersion)
        .digest('hex')
    }
  }
  createNode(MostRecentFeatureVersion)
}

export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions, getNodes }) => {
  const { createPage, deletePage } = actions

  // Throw error if page.context is undefined
  if (!page.context) {
    throw new Error('Error retrieving page context')
  }

  // Delete pages such as /about/index.de
  if (page.path.includes('index')) {
    return deletePage(page)
  }

  // First delete the incoming page that was automatically created by Gatsby
  // So everything in src/pages/
  // Don't do anything to the page if context has a language already set
  if (page.component.includes('asciidocTemplate') && page.context.locale === 'en') {
    // Grab the keys ('en' & 'de') of locales and map over them
    // eslint-disable-next-line array-callback-return
    Object.keys(locales).forEach(lang => {
      if (lang !== 'en') {
        // Use the values defined in "locales" to construct the path
        const localizedPath = locales[lang].default
          ? page.path
          : `${locales[lang].path}${page.path}`

        let locale = 'en'
        let defaultGitSHA

        if (fs.existsSync(`./content/asciidoc-pages${page.path}index.${lang}.adoc`)) {
          locale = lang
          // fetch fields.gitSHA from the default language file
          defaultGitSHA = (getNodes() as MdxNode[]).find(n => n.fields && n.fields.slug === page.path)?.fields?.gitSHA || null
        }

        return createPage({
          // Pass on everything from the original page
          ...page,
          // Since page.path returns with a trailing slash (e.g. "/de/")
          // We want to remove that
          path: removeTrailingSlash(localizedPath),
          // Pass in the locale as context to every page
          // This context also gets passed to the src/components/layout file
          // This should ensure that the locale is available on every page
          context: {
            ...(page.context ? page.context : {}),
            locale,
            defaultGitSHA,
            language: lang,
            i18n: {
              ...(page.context?.i18n ? page.context.i18n : {}),
              routed: true,
              originalPath: page.path,
              path: removeTrailingSlash(localizedPath),
              language: lang
            }
          }
        })
      }
    })
  } else {
    deletePage(page)
  }

  return createPage({
    // Pass on everything from the original page
    ...page,
    // Pass in the locale as context to every page
    // This context also gets passed to the src/components/layout file
    // This should ensure that the locale is available on every page
    context: {
      ...page.context
    }
  })
}

export const onCreateNode: GatsbyNode['onCreateNode'] = async ({ node, actions, getNode, getNodes }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Asciidoc') {
    const fetchFilePath = getNodes().find(n => n.id === node.parent)
    if (!fetchFilePath) {
      // Handle the case where fetchFilePath is not found.
      throw new Error(`No file path found for node with parent ID: ${node.parent}`);
    }

    const name = path.basename(fetchFilePath.relativePath as string, '.adoc')

    const currentFileDir = path.dirname(fetchFilePath.absolutePath as string);
    const partialDir = path.join(currentFileDir, '_partials')

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "en")
    const isDefault = name === 'index'

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, (o: LocaleEntry) => o.default === true)

    if (isDefault) {
      // Get Git SHA of the last commit to the file and add it as a field
      const gitLastCommitCMD = `git log -1 --format=%H ${fetchFilePath.absolutePath}`
      const { stdout, stderr } = await exec(gitLastCommitCMD)
      if (stderr) {
        console.error(stderr)
      }
      const gitLastCommit = stdout.trim() || null
      gitLastCommit && createNodeField({ node, name: 'gitSHA', value: gitLastCommit })
    }

    // Files are defined with "name-with-dashes.lang.adoc"
    // name returns "name-with-dashes.lang"
    // So grab the lang from that string
    // If it's the default language, pass the locale for that
    const lang = isDefault ? defaultKey : name.split('.')[1]

    createNodeField({ node, name: 'relativePath', value: fetchFilePath.relativePath })
    createNodeField({ node, name: 'locale', value: lang })
    createNodeField({ node, name: 'isDefault', value: isDefault })

    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'slug',
      node,
      value
    })

    createNodeField({
      node,
      name: 'partialDir',
      value: partialDir
    })
  } else if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode })
    const mdxNode = node as MdxNode
    const date = new Date(mdxNode.frontmatter.date)
    const year = date.getFullYear()
    const zeroPaddedMonth = `${date.getMonth() + 1}`.padStart(2, '0')

    createNodeField({
      name: 'slug',
      node,
      value: slug
    })
    createNodeField({
      name: 'postPath',
      node,
      value: `/blog/${year}/${zeroPaddedMonth}${slug}`
    })
  }
}

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions }) => {
  const { createPage, createSlice } = actions
  const postsPerPage = 10

  // Create Slice components https://www.gatsbyjs.com/docs/how-to/performance/using-slices/
  createSlice({
    id: 'navbar',
    component: path.resolve('src', 'components', 'NavBar', 'index.tsx'),
  })

  createSlice({
    id: 'footer',
    component: path.resolve('src', 'components', 'Footer', 'index.tsx'),
  })

  createSlice({
    id: 'banner',
    component: path.resolve('src', 'components', 'Banner', 'index.tsx'),
  })

  createSlice({
    id: 'adoptiumNews',
    component: path.resolve('src', 'components', 'AdoptiumNews', 'index.tsx'),
  })

  // create slice for AuthorBio
  for (const author of Object.keys(authors)) {
    createSlice({
      id: `author-bio-${author}`,
      component: path.resolve('src', 'components', 'AuthorBio', 'index.tsx'),
      context: {
        identifier: author,
        author: authors[author]
      }
    })
  }

  // Create Asciidoc pages.
  const asciidocTemplate = path.resolve('./src/templates/asciidocTemplate.tsx')

  const asciidocResults = await graphql<{
    docs: {
      edges: Array<{
        node: {
          childAsciidoc: {
            document: {
              title: string;
            };
            fields: {
              locale: string;
              isDefault: boolean;
              slug: string;
            };
          };
        };
      }>;
    };
  }>(`
    {
      docs: allFile(filter: {sourceInstanceName: {eq: "asciidoc-pages"}}) {
        edges {
          node {
            childAsciidoc {
              document {
                title
              }
              fields {
                locale
                isDefault
                slug
              }
            }
          }
        }
      }
    }
  `)

  if (asciidocResults.errors) {
    throw asciidocResults.errors
  }

  const docs = asciidocResults.data?.docs.edges

  // Check if docs is null and throw error if it is
  if (!docs) {
    throw new Error('Error retrieving Asciidoc pages')
  }

  docs.forEach(({ node: doc }) => {
    const title = doc.childAsciidoc.document.title
    const slug = doc.childAsciidoc.fields.slug

    // Use the fields created in exports.onCreateNode
    const locale = doc.childAsciidoc.fields.locale
    const isDefault = doc.childAsciidoc.fields.isDefault

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: asciidocTemplate,
      context: {
        // Pass both the "title" and "locale" to find a unique file
        // Only the title would not have been sufficient as articles could have the same title
        // in different languages, e.g. because an english phrase is also common in german
        title,
        locale
      }
    })
  })

  // Create author pages
  const authorJson = require('./src/json/authors.json')
  const authorPage = path.resolve('./src/templates/authorPage.tsx')

  for (const author of Object.keys(authorJson)) {
    fs.open(`./static/images/authors/${author}.jpg`, 'r', async function (err, fd) {
      if (err) {
        const githubUsername = authorJson[author].github
        const streamPipeline = promisify(pipeline)
        const response = await fetch(`https://github.com/${githubUsername}.png?size=250`)
        if (!response.ok) {
          throw new Error(`Unexpected response: ${response.statusText}`)
        }
        await streamPipeline(response.body, fs.createWriteStream(`./static/images/authors/${author}.jpg`))
      }
    })

    // Query all blog posts by author to determine the number of pages needed
    const authorPosts = await graphql<{
      allMdx: {
        totalCount: number;
      };
    }>(
      `
        {
          allMdx(filter: {frontmatter: {author: {eq: "${author}"}}}) {
            totalCount
          }
        }
      `
    )

    if (authorPosts.errors) {
      throw authorPosts.errors
    }

    if (!authorPosts.data) {
      throw new Error('Error retrieving author posts')
    }

    const numAuthorPages = Math.ceil(authorPosts.data.allMdx.totalCount / postsPerPage)

    Array.from({ length: numAuthorPages }).forEach((_, index) => {
      const currentPageNumber = index + 1
      const previousPageNumber =
        currentPageNumber === 1 ? null : currentPageNumber - 1
      const nextPageNumber =
        currentPageNumber === numAuthorPages ? null : currentPageNumber + 1
      createPage({
        path: index === 0 ? `/blog/author/${author}` : `/blog/author/${author}/page/${index + 1}`,
        component: authorPage,
        context: {
          author,
          limit: postsPerPage,
          skip: index * postsPerPage,
          numAuthorPages,
          currentPageNumber,
          previousPageNumber,
          nextPageNumber
        },
        slices: {
          authorBio: `author-bio-${author}`
        }
      })
    })
  }

  // Create blog posts pages.
  const tagTemplate = path.resolve('./src/templates/tagPage.tsx')
  const blogPost = path.resolve('./src/templates/blogPost.tsx')

  const blogPostResults = await graphql<{
    allMdx: {
      edges: Array<{
        node: {
          fields: {
            slug: string;
            postPath: string;
          };
          frontmatter: {
            title: string;
            tags: string[];
          };
          internal: {
            contentFilePath: string;
          };
        };
      }>;
    };
    tagsGroup: {
      group: Array<{
        fieldValue: string;
      }>;
    };
  }>(
    `
      {
        allMdx(sort: {frontmatter: {date: DESC}}) {
          edges {
            node {
              fields {
                slug
                postPath
              }
              frontmatter {
                title
                tags
              }
              internal {
                contentFilePath
              }
            }
          }
        }
        tagsGroup: allMdx(limit: 2000) {
          group(field: {frontmatter: {tags: SELECT}}) {
            fieldValue
          }
        }
      }
    `
  )

  if (blogPostResults.errors) {
    throw blogPostResults.errors
  }

  if (!blogPostResults.data) {
    throw new Error('Error retrieving blog posts')
  }

  const posts = blogPostResults.data.allMdx.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `${post.node.fields.postPath}`,
      component: `${blogPost}?__contentFilePath=${post.node.internal.contentFilePath}`,
      context: {
        slug: post.node.fields.slug,
        postPath: `${post.node.fields.postPath}`,
        previous,
        next
      }
    })
  })

  // Extract tag data from query
  const tags = blogPostResults.data.tagsGroup.group

  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${tag.fieldValue}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue
      }
    })
  })

  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, index) => {
    const currentPageNumber = index + 1
    const previousPageNumber =
      currentPageNumber === 1 ? null : currentPageNumber - 1
    const nextPageNumber =
      currentPageNumber === numPages ? null : currentPageNumber + 1

    createPage({
      path: `/blog/page/${index + 1}`,
      component: path.resolve('./src/templates/blogPage.tsx'),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPageNumber,
        previousPageNumber,
        nextPageNumber
      }
    })
  })
}
