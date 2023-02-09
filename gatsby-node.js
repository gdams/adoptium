const path = require('path')
const fs = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util')
const { createFilePath } = require('gatsby-source-filesystem')
const locales = require('./locales/i18n')

const { localizedSlug, findKey, removeTrailingSlash } = require('./src/util/gatsby-node-helpers')

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

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
    Object.keys(locales).map(lang => {
      if (lang !== 'en') {
        // Use the values defined in "locales" to construct the path
        const localizedPath = locales[lang].default
          ? page.path
          : `${locales[lang].path}${page.path}`

        let locale = 'en'

        if (fs.existsSync(`./content/asciidoc-pages${page.path}index.${lang}.adoc`)) {
          locale = lang
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
            ...page.context,
            locale,
            language: lang,
            i18n: {
              ...page.context.i18n,
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

exports.onCreateNode = async ({ node, actions, getNode, getNodes }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Asciidoc') {
    const fetchFilePath = getNodes().find(n => n.id === node.parent)
    const name = path.basename(fetchFilePath.relativePath, '.adoc')

    // Check if post.name is "index" -- because that's the file for default language
    // (In this case "en")
    const isDefault = name === 'index'

    // Find the key that has "default: true" set (in this case it returns "en")
    const defaultKey = findKey(locales, o => o.default === true)

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
  } else if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode })
    const date = new Date(node.frontmatter.date)
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

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create Asciidoc pages.
  const asciidocTemplate = path.resolve('./src/templates/asciidocTemplate.tsx')

  const asciidocResults = await graphql(`
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

  const docs = asciidocResults.data.docs.edges

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

    createPage({
      path: `/blog/author/${author}`,
      component: authorPage,
      context: {
        author,
        limit: 10
      }
    })
  }

  // Create blog posts pages.
  const tagTemplate = path.resolve('./src/templates/tagPage.tsx')
  const blogPost = path.resolve('./src/templates/blogPost.tsx')

  const blogPostResults = await graphql(
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

  const postsPerPage = 10
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
