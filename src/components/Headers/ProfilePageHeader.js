import React from "react";

// reactstrap components

// core components

function ProfilePageHeader() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <div
        className="page-header page-header-small"
        style={{
          backgroundImage: 'url(' + require('assets/img/havest-header-background.jpg').default + ')',
        }}
      >
        <div className="filter" />
        <div className="content-center">
          <div className="motto">
            <h1 className="text-center">
              <img alt="..." src={require('assets/img/logoVuonDau.png').default} width="300px" height="140px" />
            </h1>
            <h3 className="text-center">Enjoy Fresh Product From Our Farm</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfilePageHeader;
