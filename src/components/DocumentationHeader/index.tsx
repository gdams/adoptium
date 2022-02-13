import React from "react";

import { FaSearch } from 'react-icons/fa';
import './DocumentationHeader.scss';

const DocumentationHeader = () => {

  return (
    <div className="docs-header pb-5 text-center position-relative">
	    <div className="container">
		    <h1 className="text-white">Documentation</h1>
		    <div className="lead text-white">Everything you need to get started with Adoptium technology</div>
		    <div className="main-search-box pt-3 d-block mx-auto">
                <form className="search-form w-100">
                    <input type="text" placeholder="Search the docs..." name="search" className="form-control search-input text-start"/>
                    <button type="submit" className="btn search-btn" value="Search"><FaSearch size={16} /></button>
		        </form>
             </div>
	    </div>
    </div>
  );
};

export default DocumentationHeader;
