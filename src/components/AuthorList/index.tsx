import React from 'react';
import Author from './Author';
import styles from './index.module.scss';

interface Props {
  authors: string[];
}

const AuthorList = ({ authors }: Props): JSX.Element => {
  if (authors.length) {
    return (
      <div className={styles.authorList}>
        DOCUMENTATION AUTHORS
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
