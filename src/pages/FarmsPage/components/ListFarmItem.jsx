import React from 'react';
import { Container, CardBody, Col, Card, CardTitle, Row } from 'reactstrap';

export default function ListFarm(props) {
  const renderDataItem = () => {
    let items = props.items;
    let elems = [];
    let imageErrorSource = require('assets/img/sections/farms/VuonRau.jpg').default;
    elems = items.map((ele) => {
      return (
        <Col md="4">
          <Card className="card-product card-plain">
            <div className="card-image">
              <a href={ele.src}>
                <img alt="..." src={ele.image ? ele.image : imageErrorSource} />
              </a>
              <CardBody>
                <div className="card-description">
                  <CardTitle tag="h5">
                    <a href={ele.src} class="mr-1 btn btn-link">
                      {ele.name}
                    </a>
                  </CardTitle>
                  <p className="card-description">{ele.description}</p>
                  <p className="card-description">{ele.address}</p>
                </div>
              </CardBody>
            </div>
          </Card>
        </Col>
      );
    })
    // for (let item of items) {
    //   let elemUrl = `/farms/farmdetail/${item.id}`
    //   elems.push(
    //     <Row key={item.id.toString()}>
    //       <Col xs="3">
    //         <Card className="card-image">
    //           <a href={elemUrl}>
    //             <img alt="..." src={item.image ? item.image : imageErrorSource} />
    //           </a>
    //         </Card>
    //       </Col>
    //       <Col xs="7">
    //         <Row>
    //           <div style={{ fontSize: 20, fontWeight: 'bold' }}>{item.name}</div>
    //         </Row>
    //         <Row>Địa chỉ: {item.address}</Row>
    //         <Row>Mô tả: {item.description}</Row>
    //         <Row>Thông tin khác: </Row>
    //       </Col>
    //     </Row>
    //   );
    // }
    return <Row>{elems}</Row>;
  };

  return <Container>{renderDataItem()}</Container>;
}
