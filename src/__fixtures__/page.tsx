import {
    AsciidocPage,
    File,
} from '../types';

export const createAsciidocData = (): {
    asciidoc: AsciidocPage;
    file: File;
  } => ({
    asciidoc: {
        id: 'asciidoc-1',
        html: '<p>Hello World, this is a <pre><code>test</code></pre></p>',
        document: {
            title: 'Asciidoc Page title',
            main: 'Asciidoc Page content',
        },
        pageAttributes: {
            authors: 'author1, author2',
        },
        fields: {
            slug: '/asciidoc/asciidoc-page-title',
        }
    },
    file: {
        relativePath: 'test.adoc',
    }
});
