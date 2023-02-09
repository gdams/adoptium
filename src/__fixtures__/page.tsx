import {
    AsciidocPage,
    MDXPage,
    SingleMDXPage,
    SiteMetaData
} from '../types';

export const createAsciidocData = (): {
    asciidoc: AsciidocPage;
  } => ({
    asciidoc: {
        id: 'asciidoc-1',
        html: `
            <p>Hello World, this is a <pre><code>test</code></pre></p>
            <table><thead><td>Header 1</td><td>Header 2</td></thead><tbody><tr><td>Cell 1</td><td class="icon">Cell 2</td></tr></tbody></table>
            <a href="https://www.eclipse.org">Eclipse</a>
            <span class="icon">[docker]</span>
            <span class="icon">[check]</span>
            <div class="toc">
                <ul class="sectlevel1">
                    <li><a href="#section-1">Section 1</a></li>
                </ul>
            </div>
        `,
        document: {
            title: 'Asciidoc Page title',
            main: 'Asciidoc Page content',
        },
        pageAttributes: {
            authors: 'author1, author2',
        },
        fields: {
            slug: '/asciidoc/asciidoc-page-title',
            relativePath: 'test.adoc',
        }
    },
});

export const createMDXData = (): {
    allMdx: MDXPage;
} => ({
    allMdx: {
        edges: [
            {
                node: {
                    frontmatter: {
                        title: 'MDX Page title',
                        author: 'pmc',
                        date: '2021-01-01',
                        describtion: 'MDX Page describtion',
                    },
                    fields: {
                        slug: '/mdx/mdx-page-title',
                        postPath: '/mdx/mdx-page-title',
                    },
                    excerpt: 'MDX Page excerpt',
                }
            }
        ]
    }
});

export const createSingleMDXData = (): {
    mdx: SingleMDXPage;
    site: SiteMetaData;
} => ({
    mdx: {
        id: 'mdx-1',
        excerpt: 'MDX Page excerpt',
        frontmatter: {
            title: 'MDX Page title',
            author: 'pmc',
            date: '2021-01-01',
            description: 'MDX Page describtion',
            tags: ['tag1', 'tag2'],
        }
    },
    site: {
        siteMetadata: {
            title: 'Site title',
            siteUrl: 'https://adoptium.net',
            social: {
                twitter: 'twitter',
            }
        }
    }
});