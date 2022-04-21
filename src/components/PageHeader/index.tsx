import React from "react";

import './PageHeader.scss';

interface Props {
  title: string;
  subtitle: string;
}

const PageHeader = ({
  title,
  subtitle
}: Props): null | JSX.Element => {
  if (!title || !subtitle) {
    return null;
  }

  return (
    <div className="docs-header p-5 text-center">
	    <div className="container">
		    <h1>{title}</h1>
		    <div className="lead">{subtitle}</div>
		      <div className="main-search-box pt-3 d-block mx-auto">
          </div>
        </div>
    </div>
  );
};

export default PageHeader;
