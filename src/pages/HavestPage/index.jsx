import FooterBlack from 'components/Footers/FooterBlack';
import ProfilePageHeader from 'components/Headers/ProfilePageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import HavestBody from './components/HavestBody';

export default function HavestPage() {
  return (
    <>
      <ColorNavbar />
      <ProfilePageHeader />
      <HavestBody />
      <FooterBlack />
    </>
  );
}
