import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import ColorNavbar from 'components/Navbars/ColorNavbar';
import React from 'react';
import CreateProfileBody from './components/CreateProfileBody';

export default function CreateProfilePage() {
  return (
    <>
      <ColorNavbar />
      <FarmPageHeader />
      <CreateProfileBody />
      <FooterBlack />
    </>
  );
}
