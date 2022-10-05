import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image';
import img1 from '../assets/mern.png';
import img2 from '../assets/online_shopping.png';
import img3 from '../assets/tech_stack.png';

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <Image
            width={1496}
            height={600}
            // loading="lazy"
            src={img1.src}
            alt=""
          />
        </div>
        <div>
          <Image
            width={1496}
            height={600}
            // loading="lazy"
            src={img2.src}
            alt=""
          />
        </div>
        <div>
          <Image
            width={1496}
            height={600}
            // loading="lazy"
            src={img3.src}
            alt=""
          />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
