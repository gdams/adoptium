import React from 'react';

const Banner = () => {

  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
     <strong className='p-1'>19th July 2022:</strong>
       We are creating the July 2022 PSU binaries for Eclipse Temurin 8u342, 11.0.16 and 17.0.4 and 18.0.2<br/>
       You can track progress <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/153">by platform</a> 
       or <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/152">by detailed release checklist</a>.
     <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
