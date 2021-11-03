import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import CheckoutBody from './components/CheckoutBody';

export default function CheckoutPage() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <CheckoutBody />
      <FooterBlack />
    </>
  );
}
