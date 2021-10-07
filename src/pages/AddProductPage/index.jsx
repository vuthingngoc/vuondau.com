import React from 'react';

import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import AddProductBody from './components/AddProductBody';

export default function AddProductPage() {
  return (
    <>
      <DangerNavbar />
      <AddProductBody />
      <FooterBlack />
    </>
  );
}
