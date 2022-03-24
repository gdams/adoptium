import React from 'react';

const Banner = () => {
  return (
    <div className="alert alert-light bg-pink alert-dismissible fade show mb-0 text-center" role="alert">
        <strong className='p-1'>11th February 2022:</strong>
            If you have recently picked up the jdk-11.0.14+9 release, please update to jdk-11.0.14.1+1 to pick up 
            <a href="https://github.com/adoptium/jdk11u/commit/ef5fff53ef1b047c2fca47047fe743689cc2734f"
            className="alert-link p-1"
            >
                a fix for a regression in the HTTPClient code
            </a>.
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  );
};

export default Banner;
