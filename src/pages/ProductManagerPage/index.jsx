import React from 'react';

import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import ProductManagerBody from './components/ProductManagerBody';

export default function ProductoManagerPage() {
  return (
    <>
      <DangerNavbar />
      <ProductManagerBody />
      <FooterBlack />
    </>
  );
}
