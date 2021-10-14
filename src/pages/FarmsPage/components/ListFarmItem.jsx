import React from 'react';
import { Container, Row, Col, Card } from 'reactstrap';

export default function ListFarm(props) {
  const renderDataItem = () => {
    let items = props.items;
    let elems = [];
    for (let item of items) {
      let elemUrl = `/farms/farmdetail/${item.id}`
      elems.push(
        <Row key={item.id.toString()}>
          <Col xs="3">
            <Card className="card-image">
              <a href={elemUrl}>
                <img alt="..." src={item.image} />
              </a>
            </Card>
          </Col>
          <Col xs="7">
            <Row>
              <div style={{ fontSize: 20, fontWeight: 'bold' }}>{item.farmName}</div>
            </Row>
            <Row>Địa chỉ: {item.address}</Row>
            <Row>Mô tả: {item.description}</Row>
            <Row>Thông tin khác: </Row>
          </Col>
        </Row>
      );
    }
    return elems;
  };

  return <Container>{renderDataItem()}</Container>;
}
