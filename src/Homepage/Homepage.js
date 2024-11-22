import React from 'react';
import image1 from '../assets/images/1.webp';
import image2 from '../assets/images/2.webp';
import image3 from '../assets/images/3.webp';
import image4 from '../assets/images/4.webp';
import image5 from '../assets/images/5.webp';
import image6 from '../assets/images/6.webp';
import image7 from '../assets/images/7.webp';

import './Homepage.css'; // Import custom styles

const HomePage = () => {
  const images = [
    { src: image1, alt: 'Image showing feature 1' },
    { src: image2, alt: 'Image showing feature 2' },
    { src: image3, alt: 'Image showing feature 3' },
    { src: image4, alt: 'Image showing feature 4' },
    { src: image5, alt: 'Image showing feature 5' },
    { src: image6, alt: 'Image showing feature 6' },
    { src: image7, alt: 'Image showing feature 7' }
  ];

  return (
    <div className="home">
      <div className="home__image-gallery">
        {images.map((image, index) => (
          <img key={index} src={image.src} alt={image.alt} className="home__image" />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
