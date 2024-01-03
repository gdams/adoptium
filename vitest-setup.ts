import { expect, vi } from 'vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import React from 'react'
import 'vitest-axe/extend-expect'
import '@testing-library/jest-dom'
import 'vitest-canvas-mock'
import 'jest-canvas-mock';

expect.extend(axeMatchers);

vi.mock('gatsby', async () => {
  const gatsby = await vi.importActual<typeof import('gatsby')>('gatsby')

  const mockUseStaticQuery = {
    site: {
      siteMetadata: {
        title: 'Sample Title',
        description: 'Sample Description',
        siteUrl: 'https://sample.com',
      }
    },
    mostRecentLts: {
      version: 1,
    },
    mostRecentFeatureVersion: {
      version: 2,
    },
    allVersions: {
      edges: [
        {
          node: {
            id: 'mock-id-1',
            version: 1,
            label: '1 - LTS',
            lts: true,
          }
        },
        {
          node: {
            id: 'mock-id-2',
            version: 2,
            label: '2',
            lts: false,
          }
        },
      ]
    },
    avatar: {
      edges: [
        {
          node: {
            name: 'pmc',
            childImageSharp: {
              gatsbyImageData: {
                layout: 'fixed',
                images: {
                  fallback: {
                    src: 'https://sample-images.com/pmc.png',
                  }
                }
              }
            }
          }
        }
      ]
    },
    mdx: {
      frontmatter: {
        author: 'pmc',
      }
    }
  }

  return {
    ...gatsby,
    graphql: vi.fn(),
    StaticQuery: vi.fn(),
    useStaticQuery: vi.fn().mockImplementation(() => mockUseStaticQuery),
    Slice: vi.fn()
    .mockImplementation(({ alias }) =>
      React.createElement('div', { className: `slice--${alias}` })
    ),
    navigate: vi.fn(),
  }
})

vi.mock('gatsby-plugin-image', async () => {
  const plugin = await vi.importActual<typeof import('gatsby-plugin-image')>('gatsby-plugin-image')

  const mockImage = ({imgClassName, imgStyle, ...props}: any) => {
    return React.createElement('img', {
      className: imgClassName,
      stlye: imgStyle,
      ...props
    })
  }

  const mockPlugin = {
    ...plugin,
    GatsbyImage: vi.fn().mockImplementation(mockImage),
    StaticImage: vi.fn().mockImplementation(mockImage),
  }

  return mockPlugin
})

vi.mock('@gatsbyjs/reach-router', async () => {
  return {
    useLocation: () => ({
      pathname: '/'
    })
  }
})

vi.mock('react-world-flags', async () => {
  return {
    default: () => 'Flag'
  }
})

vi.mock('gatsby-plugin-react-i18next', async () => {
  return {
    Link: vi.fn().mockImplementation(({ to, getProps, ...rest }) =>
      React.createElement('a', {
        ...rest,
        href: to
      })
    ),
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: async () => await new Promise(() => {})
      }
    }),
    useI18next: () => ({
      language: 'en',
      languages: ['en', 'en-GB', 'es', 'de', 'zh-CN'],
      changeLanguage: async () => await new Promise(() => {})
    }),
    Trans: () => 'Text'
  }
})

const IntersectionObserverMock = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn()
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
