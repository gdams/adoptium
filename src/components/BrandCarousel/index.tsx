import React from "react";
import Slider from "react-slick";

import "./BrandCarousel.scss"

const BrandCarousel = () => {
  const logos = [
    "microsoft.svg", // Replace with your logo image file names
    "ibm-logo.png",
    "adopters/logo-societe-generale.svg",
    "redhat.svg",
    "google.svg",
    "adopters/logo-dynatrace.png",
    "redhat.svg",
  ];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        slidesToShow: 4
      }
    }, {
      breakpoint: 520,
      settings: {
        slidesToShow: 2
      }
    }]
  };

  return (
    <Slider {...settings}>
      {logos.map((logo, logoIndex) => (
        <div key={logoIndex}>
          <img
            src={`/images/${logo}`}
            className="mx-auto d-block"
            style={{
              filter: "grayscale(100%)",
              opacity: "0.7",
              maxWidth: "10em",
              transition: "filter 0.3s" 
            }}
            onMouseEnter={e => e.currentTarget.style.filter = "grayscale(0%)"}
            onMouseLeave={e => e.currentTarget.style.filter = "grayscale(100%)"}
            alt={`${logo} logo`}
          />
        </div>
      ))}
    </Slider>
  )
};

export default BrandCarousel;
