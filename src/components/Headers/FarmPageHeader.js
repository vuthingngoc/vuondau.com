import React from 'react';

// reactstrap components

// core components

function FarmPageHeader() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('profile-page');
    return function cleanup() {
      document.body.classList.remove('profile-page');
    };
  });
  return (
    <>
      <div
        className="page-header page-header-custom"
        style={{
          backgroundImage: 'url(' + require('assets/img/sections/PageHeader3.jpg').default + ')',
        }}
      >
        <div className="filter" />
      </div>
    </>
  );
}

export default FarmPageHeader;
