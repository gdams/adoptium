import React from 'react';
import { render } from '@testing-library/react';
import BlogPost, { Head, formatDiv } from '../../templates/blogPost';
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe';
import { createSingleMDXData } from '../../__fixtures__/page';

let mockData = createSingleMDXData();
const pageContext = {
  previous: {
    fields: {
      postPath: '/blog/previous'
    },
    frontmatter: {
      title: 'Previous'
    }
  },
  next: {
    fields: {
      postPath: '/blog/next'
    },
    frontmatter: {
      title: 'Next'
    }
  }
}

describe('BlogPost Template page', () => {
  it('renders correctly', () => {
    const { container } = render(<BlogPost data={mockData} pageContext={pageContext} location={{}} children={'sample blog'} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('renders correctly - featured image', () => {
    mockData.mdx.frontmatter.featuredImage = {
      childImageSharp: {
        gatsbyImageData: {
          images: {
            fallback: {
              src: 'https://fake-image.com'
            }
          }
        }
      }
    }
    const { container } = render(<BlogPost data={mockData} pageContext={pageContext} location={{}} children={'sample blog'} />);
    // eslint-disable-next-line
    const pageContent = container.querySelector('main');

    expect(pageContent).toMatchSnapshot();
  });

  it('formatDiv renders correctly', () => {
    const { container } = render(formatDiv({ dangerouslySetInnerHTML: { __html: '<p>test</p>' } }));
    expect(container).toMatchSnapshot();
  });

  it('formatDiv renders correctly - inline code block', () => {
    const { container } = render(formatDiv({ dangerouslySetInnerHTML: { __html: '<code class="language-text">test</code>' } }));
    expect(container).toMatchSnapshot();
  });

  it('head renders correctly', () => {
    const { container } = render(<Head data={mockData} />);
    // eslint-disable-next-line
    const title = container.querySelector('title');
    expect(title?.textContent).toEqual('MDX Page title | Adoptium');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<BlogPost data={mockData} pageContext={pageContext} location={{}} children={'sample blog'} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});