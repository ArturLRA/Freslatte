import Carousel from 'react-bootstrap/Carousel';
import React from 'react';
import Banner1 from '../images/bannerImage1.jpg';
import Banner2 from '../images/bannerImage2.jpg';
import Banner3 from '../images/bannerImage3.webp';


function Carrosel() {
  return (
    <Carousel className>
      
      <Carousel.Item>
            <img src={Banner1} alt='Logo Fresslatte'/>
      </Carousel.Item>

      <Carousel.Item>
            <img src={Banner2} alt='Logo Fresslatte'/>
      </Carousel.Item>
      
      <Carousel.Item>
            <img src={Banner3} alt='Logo Fresslatte'/>
      </Carousel.Item>

    </Carousel>
  );
}

export default Carrosel;