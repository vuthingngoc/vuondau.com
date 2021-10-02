import FooterBlack from 'components/Footers/FooterBlack';
import ProductPageHeader from 'components/Headers/ProductPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import BodyProductDetail from './components/BodyProductDetail';
import SimilarProduct from './components/SimilarProduct';

export default function ProductDetail() {
  return (
    <>
      <ColorNavbar />
      <ProductPageHeader />
      <BodyProductDetail />
      <SimilarProduct />
      <FooterBlack />
    </>
  );
}
