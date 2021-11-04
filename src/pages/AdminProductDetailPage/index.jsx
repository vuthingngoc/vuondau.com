import React from 'react';

import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import AdminProductDetailBody from './components/AdminProductDetailBody';

export default function AdminProductDetailPage(props) {
  return (
    <>
      <DangerNavbar />
      <AdminProductDetailBody {...props} />
      <FooterBlack />
    </>
  );
}
