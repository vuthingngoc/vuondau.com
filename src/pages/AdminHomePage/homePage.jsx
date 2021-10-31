import React, { useState } from 'react';
import HomePageBody from './component/homeBody';
import DangerNavbar from 'components/Navbars/DangerNavbar';
import FooterBlack from 'components/Footers/FooterBlack';
import jwtDecode from 'jwt-decode';

export default function HomePage(props) {
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

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('register-page');
    document.body.classList.add('full-screen');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      document.body.classList.remove('register-page');
      document.body.classList.remove('full-screen');
    };
  });

  return (
    <>
      {role === 2 && (
        <div>
          <DangerNavbar />
          <HomePageBody {...props} />
          <FooterBlack />
        </div>
      )}
    </>
  );
}
