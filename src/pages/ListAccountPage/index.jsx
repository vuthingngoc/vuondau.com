import React from 'react';
import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import ListAccountbody from './components/ListAccountBody';

export default function ListAccountPage() {
  return (
    <>
      <DangerNavbar />
      <ListAccountbody />
      <FooterBlack />
    </>
  );
}
