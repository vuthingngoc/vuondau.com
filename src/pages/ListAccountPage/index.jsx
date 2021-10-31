import React, { useState } from 'react';
import DangerNavbar from 'components/Navbars/DangerNavbar.js';
import FooterBlack from 'components/Footers/FooterBlack.js';
import ListAccountbody from './components/ListAccountBody';
import jwtDecode from 'jwt-decode';

export default function ListAccountPage() {
  const [role, setRole] = useState(1);
  React.useEffect(() => {
    if (localStorage) {
      if (localStorage.getItem('accessToken') !== null) {
        const userRole = jwtDecode(localStorage.getItem('accessToken')).ROLE === '2' ? 2 : 1;
        if (userRole === 2 && role !== userRole) {
          setRole(userRole);
        }
      }
    }
  }, [role]);
  return (
    <>
      {role === 2 && (
        <div>
          <DangerNavbar />
          <ListAccountbody />
          <FooterBlack />
        </div>
      )}
    </>
  );
}
