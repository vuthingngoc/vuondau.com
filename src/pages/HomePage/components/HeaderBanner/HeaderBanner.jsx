import React, { useState } from 'react';
// import styled from 'styled-components';
import AwesomeSlider from 'react-awesome-slider';
import cover1 from './image/cover1.jpg';
import cover2 from './image/cover2.jpg';
import cover3 from './image/cover3.png';

import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';

export default function HeaderBanner() {
  const [bannerImage] = useState({
    src: [cover1, cover2, cover3],
  });
  return (
    <AwesomeSlider animation="scaleOutAnimation">
      {bannerImage.src.map((img, index) => {
        return (
          <div key={`d-${index}`} style={{ backgroundColor: 'white' }}>
            <img src={img} width="100%" height="920vh" alt={`banner${index}`} key={`image-${index}`} />
          </div>
        );
      })}
    </AwesomeSlider>
  );
}
