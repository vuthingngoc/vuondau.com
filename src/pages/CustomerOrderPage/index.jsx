import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import CustomerOrderBody from './components/CustomerOrderBody';

export default function CustomerOrder() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <CustomerOrderBody />f
      <FooterBlack />
    </>
  );
}
