import React from 'react';

const Banner = () => {
  // return null;

  // The following is an example that can be used for future code freezes
  // Comment Out The Above Line ( return null ; ) and uncomment the below

   return (
     <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
     <strong className='p-1'>28th of September 2023:</strong>
         We are awaiting access to the new Java 21's specification tests
         before formally releasing Eclipse Temurin 21.<br/>
         For further information including how to use our early access builds, please
         read <a href="/blog/2023/09/temurin21-delay">our blog</a>.
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
   );
};

export default Banner;
