import React from 'react';
import { render } from '@testing-library/react';
import LanguageSelector from '..';

jest.mock('react-i18next', () => ({
  useTranslation: (): {} => ({ t: (key: string): string => key }),
  Trans: (): ReactElement => <></>,
}));

jest.mock("@reach/router", () => {
  const RouterMocks = jest.requireActual("@reach/router");
  return {
    ...RouterMocks,
    useLocation: jest.fn().mockReturnValue({
      pathname: '/mock-path'
    })
  };
});

describe('DocumentationCard component', () => {
  it('renders correctly', () => {
    const { container } = render(
      <LanguageSelector />
    );
    expect(container).toMatchSnapshot();
  });
});