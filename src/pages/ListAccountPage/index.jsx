import React from 'react';
import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import ListAccountbody from './components/ListAccountBody';
// import jwtDecode from 'jwt-decode';

export default function ListAccountPage() {
  return (
    <>
      <div>
        <DangerNavbar />
        <ListAccountbody />
        <FooterBlack />
      </div>
    </>
  );
}
