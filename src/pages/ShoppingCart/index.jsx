import FooterBlack from 'components/Footers/FooterBlack';
import ProductPageHeader from 'components/Headers/ProductPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import ShoppingCartBody from './components/ShoppingCartBody';

export default function ShoppingCartPage() {
  return (
    <>
      <ColorNavbar />
      <ProductPageHeader />
      <ShoppingCartBody />
      <FooterBlack />
    </>
  );
}
