import React from "react";
import { Link } from 'gatsby'

import { FaSearch } from 'react-icons/fa';
import './DocumentationCard.scss';

const DocumentationCard = ({
  link,
  title,
  description,
  Icon
}) => {

  return (
    <div className="col-12 col-lg-4 py-3">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">
            <span className="theme-icon-holder card-icon-holder me-2">
                <Icon />
              </span>
              <span className="card-title-text">{title}</span>
          </h5>
          <div className="card-text">
            {description}
          </div>
          <Link className="card-link-mask" to={link}></Link>
        </div>
      </div>
  </div>
  );
};

export default DocumentationCard;
