import React from 'react';
import ColorNavbar from 'components/Navbars/ColorNavbarCustomize';
import FooterBlack from 'components/Footers/FooterBlack';
import FarmPageHeader from 'components/Headers/FarmPageHeader';
import FarmBody from './components/FarmBody';

export default function FarmsPage(props) {
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
      <ColorNavbar />
      <FarmPageHeader />
      <FarmBody {...props}/>
      <FooterBlack />
    </>
  );
}