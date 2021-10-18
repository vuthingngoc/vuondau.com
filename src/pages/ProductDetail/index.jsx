import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
// import ProductPageHeader from 'components/Headers/ProductPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import BodyProductDetail from './components/BodyProductDetail';
import SimilarProduct from './components/SimilarProduct';

export default function ProductDetail() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <BodyProductDetail />
      <SimilarProduct />
      <FooterBlack />
    </>
  );
}
