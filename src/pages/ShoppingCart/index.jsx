import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
// import ProductPageHeader from 'components/Headers/ProductPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import ShoppingCartBody from './components/ShoppingCartBody';

export default function ShoppingCartPage() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <ShoppingCartBody />
      <FooterBlack />
    </>
  );
}
