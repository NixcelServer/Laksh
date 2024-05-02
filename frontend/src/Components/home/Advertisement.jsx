import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const AdvertisementSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider  {...settings} style={{ textAlign: 'center' }}>
      <div>
        <img src="/images/image1.png" alt="Advertisement 1" style={{ margin: '0 auto' }}/>
      </div>
      <div>
        <img src="/images/image2.png" alt="Advertisement 2"style={{ margin: '0 auto' }} />
      </div>
      <div>
        <img src="/images/image3.png" alt="Advertisement 3" style={{ margin: '0 auto' }}/>
      </div>
      {/* Add more images as needed */}
    </Slider>
  );
};

export default AdvertisementSlider;
