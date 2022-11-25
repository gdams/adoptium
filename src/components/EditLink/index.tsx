import React from 'react';
import { IoMdGitPullRequest } from 'react-icons/io';

type Props = {
  relativePath?: string;
};

const EditLink = ({ relativePath }: Props) => {

  if (!relativePath) {
    return null;
  }

  const href = `https://github.com/adoptium/adoptium.net/edit/main/content/asciidoc-pages/${relativePath}`;

  return (
    <div className='mx-auto pt-5'>
      <span className='fw-bold'>Help us make these docs great!</span><br/>
      <span>All Adoptium docs are open source. See something that's wrong or unclear?</span><br/>
      <a href={href} className='btn btn-secondary mt-2' style={{borderColor: '#0869DA', backgroundColor: '#f6f8fa'}} target='_blank' rel='noopener noreferrer'>
        <IoMdGitPullRequest size={18} style={{ marginRight: '.3em' }} />
        Edit this page
      </a>
    </div>
  );
};

export default EditLink;
