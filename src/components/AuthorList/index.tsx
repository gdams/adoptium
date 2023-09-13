import React from 'react';
import Author from './Author';
import styles from './index.module.scss';
import { Trans } from 'gatsby-plugin-react-i18next';

interface Props {
  authors: string[];
}

const AuthorList = ({ authors }: Props): JSX.Element => {
  if (authors.length) {
    return (
      <div className={styles.authorList}>
        <Trans 
          i18nKey='asciidoc.author.list.title' 
          defaults='DOCUMENTATION AUTHORS'
        />
        <ul>
          {authors.map(
            (author, i): JSX.Element => (
              <Author index={i} username={author} key={author} size="60" />
            )
          )}
        </ul>
      </div>
    );
  }

  return <div />;
};

export default AuthorList;
