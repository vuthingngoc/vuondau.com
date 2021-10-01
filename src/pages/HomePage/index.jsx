import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import IndexHeader from 'components/Headers/IndexHeader';
import HeaderSlider from './components/HeaderSlider';
import BodyProduction from './components/BodyProduct';
import FooterEcommerce from 'components/Footers/FooterEcommerce';

export default function Homepage() {
  return (
    <>
      <ColorNavbar />
      <IndexHeader />
      <HeaderSlider />
      <BodyProduction />
      <FooterEcommerce />
    </>
  );
}
