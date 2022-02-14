import React, { useState } from "react";
import { useFlexSearch } from "react-use-flexsearch";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import './DocumentationHeader.scss';

const DocumentationHeader = ({
  data: {
    localSearchDocs: { index, store },
  }
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  let hintArray = [];
  const unflattenResults = (results) => {
    hintArray = [];
    for (let result in results) {
      if (!results[result].path.includes('index')) {
        let item = {
          id: results[result].id,
          label: results[result].title,
          link: results[result].path
        }
        hintArray.push(item)
      }
    }
  }

  const results = useFlexSearch(searchQuery, index, store);
  unflattenResults(results);

  return (
    <div className="docs-header p-5 text-center position-relative">
	    <div className="container">
		    <h1>Documentation</h1>
		    <div className="lead">Everything you need to get started with Adoptium technology</div>
		      <div className="main-search-box pt-3 d-block mx-auto">
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={hintArray}
              onChange={(event: any, option: any) => {
                window.location.href = option.link;
              }}
              renderInput={(params) => 
                <TextField {...params}
                  onChange={e => setSearchQuery(e.target.value)}
                  label="Start typing to search the docs..."
                />
              }
            />
          </div>
        </div>
    </div>
  );
};

export default DocumentationHeader;
