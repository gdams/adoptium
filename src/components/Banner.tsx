import React from 'react';

const Banner = () => {

  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
     <strong className='p-1'>2nd of August 2022:</strong>
       We are going to replace the 8u342 binaries with a 8u345 release for a critical fix where it was no longer possible to change &quot;user.dir&quot;. <br/>
       This will extend our release cycle by a few more days.
       You can continue to track progress <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/153">by platform</a> 
       or <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/152">by detailed release checklist</a>.
     <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
