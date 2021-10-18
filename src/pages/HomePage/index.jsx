import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbar';
// import HeaderSlider from './components/HeaderSlider';
import BodyProduction from './components/BodyProduct';
import FooterEcommerce from 'components/Footers/FooterEcommerce';
import SettingsHeader from 'components/Headers/SettingsHeader';

export default function Homepage() {
  return (
    <>
      <ColorNavbar />
      <SettingsHeader />
      <BodyProduction />
      <FooterEcommerce />
    </>
  );
}
