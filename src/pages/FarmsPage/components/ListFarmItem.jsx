import React from 'react';
import { Container, CardBody, Col, Card, CardTitle, Row, Button } from 'reactstrap';

export default function ListFarm(props) {

  const renderDataItem = () => {
    let items = props.items;
    let elems = [];
    let imageErrorSource = require('assets/img/no_image.jpg').default;
    elems = items.map((ele, index, arr) => {
      let elemUrl = `/farms/farmdetail/${ele.id}`
      let displayItem = props.displayItem ? props.displayItem : arr.length;
      return (
        index < displayItem &&
        <Col md="4">
          <Card className="card-product card-plain-custom">
            <div className="card-image">
                <img alt="..." src={ele.src ? ele.src : imageErrorSource} />
              <CardBody>
                <div className="card-description" style={{ textAlign: 'center' }}>
                  <CardTitle tag="h5">
                    <a href={ele.src} class="mr-1 btn btn-link">
                      {ele.name}
                    </a>
                  </CardTitle>
                  <Button className="btn-round" color="default" outline href={elemUrl}>
                    Thăm vườn
                  </Button>
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
