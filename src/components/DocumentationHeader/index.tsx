import React, { useState } from "react";
import { convert } from 'html-to-text'
import { useFlexSearch } from "react-use-flexsearch";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Trans } from 'gatsby-plugin-react-i18next';

import './DocumentationHeader.scss';

interface Props {
  data: {
    localSearchDocs: {
      index: string;
      store: object;
    }
  }
}

const DocumentationHeader = ({
  data: {
    localSearchDocs: { index, store },
  }
}: Props): null | JSX.Element => {
  const [searchQuery, setSearchQuery] = useState('');

  let hintArray: Array<object> = [];
  const unflattenResults = (results: object) => {
    hintArray = [];
    for (let result in results) {
      if (!results[result].path.includes('index')) {
        let item: Object = {
          id: results[result].id,
          label: convert(results[result].title),
          link: results[result].path
        }
        hintArray.push(item)
      }
    }
  }

  const results = useFlexSearch(searchQuery, index, store);
  unflattenResults(results);

  return (
    <div className="docs-header p-5 text-center">
	    <div className="container">
		    <h1><Trans i18nKey='docs.documentation.title' defaults="Documentation"/></h1>
		    <div className="lead"><Trans i18nKey='docs.documentation.tagline' defaults="Everything you need to get started with Adoptium technology" /></div>
		      <div className="main-search-box pt-3 d-block mx-auto">
            <Autocomplete
              disablePortal
              data-testid="autocomplete"
              id="combo-box-demo"
              options={hintArray}
              onChange={(event: any, option: any) => {
                window.location.href = option.link;
              }}
              renderInput={(params) => 
                <TextField {...params}
                  onChange={e => setSearchQuery(e.target.value)}
                  label={<Trans i18nKey='docs.documentation.placeholder' defaults="Start typing to search the docs..." />}
                />
              }
            />
          </div>
        </div>
    </div>
  );
};

export default DocumentationHeader;
