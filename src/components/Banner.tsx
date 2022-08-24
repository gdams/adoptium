import React from 'react';

const Banner = () => {

  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
     <strong className='p-1'>18th of August 2022:</strong>

       Upstream OpenJDK has released fixes to <a className='alert-link p-1 text-white' href="https://mail.openjdk.org/pipermail/jdk-updates-dev/2022-August/016460.html">resolve a regression</a> in some of the July releases. We are working to release 11.0.16.1+1 and 17.0.4.1+1.
       As usual, you can continue to track progress <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/153">by platform</a> 
       or <a className='alert-link p-1 text-white' href="https://github.com/adoptium/adoptium/issues/152">by detailed release checklist</a>.
     <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
