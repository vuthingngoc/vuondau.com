import FooterBlack from 'components/Footers/FooterBlack';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import HavestDetailBody from './components/HavestDetailBody';

export default function HavestDetailPage() {
  return (
    <>
      <ColorNavbar />
      <ProfilePageHeader />
      <HavestDetailBody />
      <FooterBlack />
    </>
  );
}
