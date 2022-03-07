import React from 'react';
import { Link } from 'gatsby-plugin-react-i18next';

import { FaExternalLinkAlt } from 'react-icons/fa';
import './DocumentationCard.scss';

const DocumentationCard = ({
  links,
  title,
  Icon
}) => {
  return (
  <div className='col-12 col-lg-4 py-3'>
    <div className='card shadow-sm'>
      <div className='card-body'>
        <h5 className='card-title mb-3'>
          <span className='theme-icon-holder card-icon-holder me-2'>
              <Icon />
            </span>
            <span className='card-title-text'>{title}</span>
        </h5>
        <div className='card-text'>
          <div className='list-group list-group-flush'>
            {links.map((link) => (
              // Check if internal or external
              link.link.includes('http')
              ? <a href={link.link} key={link.link} target='_blank' rel='noopener noreferrer' className='list-group-item list-group-item-action'>{link.name} <FaExternalLinkAlt size={13} /></a>
              : <Link to={link.link} key={link.link} className='list-group-item list-group-item-action'>{link.name}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default DocumentationCard;
