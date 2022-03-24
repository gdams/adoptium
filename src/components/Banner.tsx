import React from 'react';

const Banner = () => {
  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
        <strong className='p-1'>22nd March 2022:</strong>
            The Eclipse Temurin 18 GA Release effort has begun! You can track progress
            <a href="https://github.com/adoptium/adoptium/issues/131"
            className="alert-link p-1 text-white"
            >
                by platform
            </a>
            or
            <a href="https://github.com/adoptium/adoptium/issues/130"
            className="alert-link p-1 text-white"
            >
                by detailed release checklist
            </a>.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
