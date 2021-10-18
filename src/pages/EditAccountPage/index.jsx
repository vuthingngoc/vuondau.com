import React from 'react';

import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import EditAccountBody from './components/EditAccountBody';

export default function EditAccountPage(props) {
  return (
    <>
      <DangerNavbar />
      <EditAccountBody {...props} />
      <FooterBlack />
    </>
  );
}
