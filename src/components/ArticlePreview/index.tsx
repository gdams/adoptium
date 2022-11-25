import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';

import Byline from '../Byline';

/**
 * Article intro displayed on front page, archive, author page.
 */
const ArticlePreview = (props) => {
  const author = props.author;
  const date = props.date;
  const postPath = props.postPath;
  const title = props.title;
  const description = props.description;
  const excerpt = props.excerpt;
  const identifier = props.identifier;

    return (
        <article className='pb-3'>
            <header>
                <h2 className='h3'>
                <Link to={postPath}>
                    {title}
                </Link>
                </h2>
                <Byline author={author} date={date} identifier={identifier}/>
            </header>
            <section>
                <p>
                {description || excerpt} <Link to={postPath}>Read more</Link>
                </p>
            </section>
        </article>
    );
};

export default ArticlePreview;
