import React from 'react';

const Banner = () => {
//  return null;

   return (
     <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
      <strong className='p-1'>18th of January 2023:</strong>
         We are creating the January 2023 CPU binaries for Eclipse Temurin 8u362, 11.0.18, 17.0.6 and 19.0.2
         You can track progress
         <a
           href="https://github.com/adoptium/adoptium/issues/202"
           target='_blank'
           rel='noopener noreferrer'
           className="alert-link p-1 text-white"
         >by platforms</a>.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
   );
};

export default Banner;
