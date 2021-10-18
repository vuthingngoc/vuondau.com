import React from 'react';
import FarmManagerBody from './component/FarmManagerBody';
import DangerNavbar from 'components/Navbars/DangerNavbar';
import FooterBlack from 'components/Footers/FooterBlack'

export default function FarmManagerPage(props) {
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
      <DangerNavbar />
      <FarmManagerBody {...props}/>
      <FooterBlack />
    </>
  );
}