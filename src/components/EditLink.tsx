import React from 'react';
import { FaPen } from 'react-icons/fa';

type Props = {
  relativePath?: string;
};

const EditLink = ({ relativePath }: Props) => {

  const href = `https://github.com/adoptium/website-v2/edit/main/src/asciidoc-pages/${relativePath}`;

  return (
    <div className="mx-auto">
      <a href={href} target="_blank">
        Edit this page on GitHub
        <FaPen size={15} style={{ marginLeft: '.3em' }} />
      </a>
    </div>
  );
};

export default EditLink;
