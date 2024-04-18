import React from 'react';

const Banner = () => {
  // The following is an example that can be used for future banner alert
  // Comment Out The Above Line ( return null ; ) and uncomment the below

  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
    <strong className='p-1'>16th April 2024:</strong>
        We are creating the April 2024 PSU binaries for Eclipse Temurin 8u412, 11.0.23, 17.0.11, 21.0.3 and 22.0.1<br/>
        You can track progress <a className='alert-link p-1 text-white' href="https://github.com/adoptium/temurin/issues/38">by platform</a>.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
