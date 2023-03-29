import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const BrandCarousel = () => {
  const logos = [
    "microsoft.svg", // Replace with your logo image file names
    "ibm-logo.png",
    "bloomberg.svg",
    "huawei.svg",
    "macstadium.png",
    "redhat.svg",
    "google.svg",
  ];

  const [slidesToShow, setSlidesToShow] = useState(1);

  const getSlidesToShow = () => {
    // if window is defined, get the width of the screen else return 1200 for CI testing
    const screenWidth =
      typeof window !== "undefined" ? window.innerWidth : 1200;
    if (screenWidth >= 992) {
      return 6;
    } else {
      return 2;
    }
  };

  useEffect(() => {
    setSlidesToShow(getSlidesToShow());
  }, []);

  const interval = slidesToShow === 1 ? 2000 : 5000; // Set interval based on slidesToShow value
  const logosToAdd =
    (slidesToShow - (logos.length % slidesToShow)) % slidesToShow; // Calculate number of logos to add for complete row
  const logosToDisplay = [...logos, ...logos.slice(0, logosToAdd)]; // Create new array with logos to display

  return (
    <Carousel
      interval={interval} // Time in ms to auto-slide to the next item
      pause={false} // Disable pausing on mouseover when showing multiple slides
      wrap={true} // Enable infinite loop
      controls={false} // Hide the previous and next buttons
    >
      {logosToDisplay.map((logo, index) => {
        if (index % slidesToShow === 0) {
          return (
            <Carousel.Item key={index}>
              <Row className="justify-content-center">
                {logosToDisplay
                  .slice(index, index + slidesToShow)
                  .map((logo, subIndex) => (
                    <Col key={`${index}-${subIndex}`}>
                      <img
                        className="d-block px-3"
                        style={{
                          filter: "grayscale(100%)",
                          opacity: "0.7",
                          maxHeight: "4em",
                          margin: "1rem auto",
                        }}
                        src={`/images/${logo}`}
                        alt={`Brand logo ${index + subIndex + 1}`}
                      />
                    </Col>
                  ))}
              </Row>
            </Carousel.Item>
          );
        } else {
          return null;
        }
      })}
    </Carousel>
  );
};

export default BrandCarousel;
