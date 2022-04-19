import React from 'react';

const Banner = () => {
  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
        <strong className='p-1'>22nd April 2022:</strong>
          We are creating the April 2022 CPU binaries for Eclipse Temurin 8u332, 11.0.15 and 17.0.3 and 18.0.1<br/>
          You can track progress <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/140">by platform</a> 
          or <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/139">by detailed release checklist</a>.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
