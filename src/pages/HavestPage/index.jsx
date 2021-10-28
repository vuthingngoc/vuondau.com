import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
// import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import React from 'react';
import HavestBody from './components/HavestBody';

export default function HavestPage(props) {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <HavestBody {...props} />
      <FooterBlack />
    </>
  );
}
