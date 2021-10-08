import React from "react";

// reactstrap components

// core components

function SettingsHeader() {
  return (
    <>
      <div
        className="page-header page-header-xs settings-background"
        style={{
          backgroundImage: 'url(' + require('assets/img/homepage_cover.jpg').default + ')',
        }}
      >
        <div className="filter">
          <div className="content-center">
            <div className="motto">
              <h5 className="text-center">
                <img alt="..." src={require('assets/img/logoVuonDau.png').default} width="350px" height="130px" />
              </h5>
              <h7 className="text-center">Enjoy Fresh Product From Our Farm</h7>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsHeader;
