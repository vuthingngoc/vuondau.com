import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
// import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import HavestDetailBody from './components/HavestDetailBody';

export default function HavestDetailPage(props) {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <HavestDetailBody {...props} />
      <FooterBlack />
    </>
  );
}
