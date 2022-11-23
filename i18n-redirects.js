/**
 * Returns relative file path of given node under given `basePath` (optionally omitting file-extension)
 */
function getNodeRelativePath (
  { parent },
  omitFileExt,
  basePath = '/content/asciidoc-pages'
) {
  const fileAbsolutePath = parent.absolutePath
  const relativePath = (fileAbsolutePath || '').split(basePath)?.[1]
  if (!relativePath || !omitFileExt) return relativePath
  return relativePath.split('.')?.[0]
}

/**
 * Returns language code from file path of given node. As a fallback `defaultLang` is returned.
 */
function getNodeLangCode ({ parent }, defaultLang = 'en') {
  const fileAbsolutePath = parent.absolutePath
  const langCodeRegex = /(?:[^/]*\.)(.*)(?:\.adoc)/
  return (fileAbsolutePath || '').match(langCodeRegex)?.[1] || defaultLang
}

/**
 * Creates and returns the theoretically translated url with the original slug.
 * If `omitDefaultLang` is true, the given `defaultLang` will not be included in paths for this language.
 */
function getTranslatedUrlPath (
  slug,
  sourceLang,
  destLang,
  omitDefaultLang,
  defaultLang = 'en'
) {
  const baseUrlPathRegex = new RegExp(`(?:/${sourceLang})?(/.*)`)
  let baseUrlPath = slug.match(baseUrlPathRegex)?.[1] || '/'
  if (baseUrlPath.includes('index')) {
    baseUrlPath = baseUrlPath.split('/index')[0]
  }
  // Trim trailing slash
  baseUrlPath = baseUrlPath.replace(/\/$/, '')
  return omitDefaultLang && destLang === defaultLang
    ? `${baseUrlPath}`
    : `/${destLang}${baseUrlPath}`
}

/**
 * Determines equally named asciidoc-files with a different language,
 * and creates redirects from the theoretically translated url to the actual slug.
 */
module.exports = function createMultilingualRedirects (
  { createRedirect },
  allNodes,
  node
) {
  const { slug } = node.fields
  const relativePath = getNodeRelativePath(node, true)
  const langCode = getNodeLangCode(node)
  allNodes
    .map(({ node: translatedNode }) => ({
      translatedNode,
      translatedNodeLangCode: getNodeLangCode(translatedNode),
      translatedNodeRelativePath: getNodeRelativePath(translatedNode, true)
    }))
    .filter(
      ({ translatedNodeLangCode, translatedNodeRelativePath }) =>
        langCode !== translatedNodeLangCode &&
        relativePath === translatedNodeRelativePath
    )
    .forEach(({ translatedNode, translatedNodeLangCode }) => {
      if (translatedNode.fields.slug.includes('index')) {
        const newRedirect = {
          fromPath: getTranslatedUrlPath(
            slug,
            langCode,
            translatedNodeLangCode,
            true
          ),
          toPath: translatedNode.fields.slug,
          isPermanent: true,
          force: true,
          redirectInBrowser: true
        }

        createRedirect(newRedirect)
      }
    })
}
