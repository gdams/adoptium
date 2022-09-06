export interface AsciidocPage {
    id: string;
    html: string;
    document: {
        title: string;
        main: string;
    },
    fields: {
        slug: string;
    },
    pageAttributes: {
        authors: string;
    }
}

export interface File {
    relativePath: string;
}