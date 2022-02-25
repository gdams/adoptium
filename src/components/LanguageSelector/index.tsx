import React from 'react';
import { useI18next, Trans } from 'gatsby-plugin-react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useLocation } from '@reach/router';
import Flag from 'react-world-flags'
import './LanguageSelector.scss';

const LanguageSelector = (): JSX.Element => {
  const {languages, changeLanguage} = useI18next();
  const location = useLocation();

  return (
    <div className="App lngg">
      <Form>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-flags" className="text-left text-white">
            <Trans>Change Language</Trans>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languages.map((lng) => (
              <a
                href=""
                key={lng}
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname.includes('index')) {
                    let newPath = location.pathname.split("/index")[0].slice(3)
                    changeLanguage(lng, newPath);
                  } else {
                    changeLanguage(lng);
                  }
                }}>
                <Dropdown.Item key={lng} eventKey={lng}>
                  {lng === 'en'
                    ? <Flag code='gb' width="35"/>
                    : <Flag code={lng} width="35"/>}
                    <Trans>{lng}</Trans>
                </Dropdown.Item>
              </a>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default LanguageSelector;
