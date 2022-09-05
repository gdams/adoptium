import { expect, vi } from "vitest"
import * as matchers from "vitest-axe/matchers";
import React from "react"
import "vitest-axe/extend-expect";

expect.extend(matchers);

vi.mock(`gatsby`, async () => {
  const gatsby = await vi.importActual<typeof import("gatsby")>(`gatsby`)

  const mockUseStaticQuery = {
    site: {
      siteMetadata: {
        siteTitle: `Testing Gatsby Head API`,
        siteUrl: `https://www.yourdomain.tld`,
        siteDescription: `Showing how to test Gatsby Head API with Vitest and Playwright`,
      },
    },
  }

  return {
    ...gatsby,
    graphql: vi.fn(),
    StaticQuery: vi.fn(),
    useStaticQuery: vi.fn().mockImplementation(() => mockUseStaticQuery),
  }
})

vi.mock(`@reach/router`, async () => {
    return {
        useLocation: () => ({
            pathname: `/`,
        }),
    }
})

vi.mock(`gatsby-plugin-react-i18next`, async () => {
    return {
        Link: vi.fn().mockImplementation(({ to, ...rest }) =>
            React.createElement(`a`, {
            ...rest,
            href: to,
            })
        ),
        useTranslation: () => ({
            t: (key: string) => key,
            i18n: {
                changeLanguage: () => new Promise(() => {}),
            },
        }),
        useI18next: () => ({
            language: `en`,
            languages: [`en`, `de`],
            changeLanguage: () => new Promise(() => {}),
        }),
        Trans: () => `<>Text</>`,
    }
});

const IntersectionObserverMock = vi.fn(() => ({
    disconnect: vi.fn(),
    observe: vi.fn(),
    takeRecords: vi.fn(),
    unobserve: vi.fn(),
}))

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)