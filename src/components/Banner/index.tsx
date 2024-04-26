import React from 'react';

const Banner = () => {
  // return null;

  // The following is an example that can be used for future banner alert
  // Comment Out The Above Line ( return null ; ) and uncomment the below

   return (
     <div className="alert text-white alert-dismissible fade show mb-0 text-center" style={{ backgroundColor: '#ff1464' }} role="alert">
       <strong className='p-1'>26th March 2024:</strong>
       Case Study: Building the World's Most Secure OpenJDK Distribution<br/>
       Find out how the Eclipse Foundation and Adoptium Working Group are pioneering software supply chain security with Eclipse Temurin.<br/>
       <a className='alert-link p-1 text-white' href="https://outreach.eclipse.foundation/adoptium-temurin-supply-chain-security?utm_campaign=Temurin%20Case%20Study&utm_source=website&utm_medium=adoptium%20docs">Read more</a>
       <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>
   );
};

export default Banner;
