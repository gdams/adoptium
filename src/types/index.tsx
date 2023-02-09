export interface AsciidocPage {
    id: string;
    html: string;
    document: {
        title: string;
        main: string;
    },
    fields: {
        slug: string;
        relativePath: string;
    },
    pageAttributes: {
        authors: string;
    }
}

export interface MDXPage {
    edges: MDXPageItem[];
}

export interface MDXPageItem {
    node: {
        frontmatter: {
            title: string;
            author: string;
            date: string;
            describtion: string;
        },
        fields: {
            slug: string;
            postPath: string;
        },
        excerpt: string;
    }
}

export interface SingleMDXPage {
    id: string;
    excerpt: string;
    frontmatter: {
        title: string;
        author: string;
        date: string;
        description: string;
        tags: string[];
        featuredImage?: {
            childImageSharp: {
                gatsbyImageData: {
                    images: {
                        fallback: {
                            src: string;
                        }
                    }
                }
            }
        }
    }
}

export interface SiteMetaData {
    siteMetadata: {
        title: string;
        siteUrl: string;
        social: {
            twitter: string;
        }
    }
}