import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import ProductBody from './components/ProductBody';

export default function ProductPage() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <ProductBody />
      <FooterBlack />
    </>
  );
}
