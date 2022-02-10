const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const createMultilingualRedirects = require(`./i18n-redirects`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Create Asciidoc pages.
  const asciidocTemplate = path.resolve(`./src/templates/asciidocTemplate.js`);

  const asciidocResults = await graphql(`
    {
      allAsciidoc {
        edges {
          node {
            id
            fields {
              slug
            }
            parent {
              ... on File {
                relativePath
                absolutePath
              }
            }
          }
        }
      }
    }
  `);
  
   asciidocResults.data.allAsciidoc.edges.forEach(({ node }) => {

      const articleNodes = asciidocResults.data.allAsciidoc.edges;
      createMultilingualRedirects(actions, articleNodes, node);
      // Create page for each asciidoc file
      createPage({
        path: node.fields.slug,
        component: asciidocTemplate,
        context: {
          id: node.id
        },
      });
    });
};

exports.onCreateNode = async ({ node, actions, getNode, loadNodeContent }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Asciidoc`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};