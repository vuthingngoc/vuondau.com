import React, { useState } from 'react';
// import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';

export default function HeaderBanner() {
  const [bannerImage] = useState({
    src: [
      'http://freshfoods.vn/images/cover-freshfoods.png',
      'http://freshfoods.vn/images/cover-salmon-freshfoods.jpg',
      'http://freshfoods.vn/images/cover-beef.jpg',
    ],
  });
  return (
    <AwesomeSlider animation="scaleOutAnimation">
      {bannerImage.src.map((src, index) => {
        return (
          <div key={`d-${index}`} style={{ backgroundColor: 'white' }}>
            <img src={src} width="100%" height="920vh" alt={`banner${index}`} key={`image-${index}`} />
          </div>
        );
      })}
    </AwesomeSlider>
  );
}
