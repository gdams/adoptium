import React from 'react';

const Banner = () => {
  return (
    <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
        <strong className='p-1'>7th April 2022:</strong>
            Eclipse Temurin binaries for JDK18 GA for 10 platforms are available 
            via the 
            <a href="https://adoptium.net/temurin/releases"
            className="alert-link p-1 text-white"
            >
              website
            </a> and the 
            <a href="https://api.adoptium.net/"
            className="alert-link p-1 text-white"
            >
              Adoptium API
            </a>.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
