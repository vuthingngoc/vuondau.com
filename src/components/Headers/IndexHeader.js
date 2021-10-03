import React from 'react';

// reactstrap components

// core components

function IndexHeader() {
  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundImage: 'url(' + require('assets/img/homepage_cover.jpg').default + ')',
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

export default IndexHeader;
