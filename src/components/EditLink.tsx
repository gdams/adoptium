import React from 'react';
import { IoMdGitPullRequest } from 'react-icons/io';

type Props = {
  relativePath?: string;
};

const EditLink = ({ relativePath }: Props) => {

  const href = `https://github.com/adoptium/website-v2/edit/main/src/asciidoc-pages/${relativePath}`;

  return (
    <div className='mx-auto pt-5'>
      <span className='fw-bold'>Help us make these docs great!</span><br/>
      <span>All Adoptium docs are open source. See something that's wrong or unclear?</span><br/>
      <a href={href} className='btn btn-secondary mt-2' style={{borderColor: '#0869DA', backgroundColor: '#f6f8fa'}} target='_blank'>
        <IoMdGitPullRequest size={18} style={{ marginRight: '.3em' }} />
        Make a contribution
      </a>
    </div>
  );
};

export default EditLink;
