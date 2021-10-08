import React from 'react';

import { Button, Label, FormGroup, Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col } from 'reactstrap';

import ImageUpload from 'components/CustomUpload/ImageUpload.js';

export default function AddProductBody() {
  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('add-product');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('add-product');
    };
  });

  return (
    <>
      <div className="main">
        <div className="section">
          <Container>
            <h3>Add Product</h3>
            <div>
              <Row>
                <Col md="6" sm="6">
                  <h6>Product Image</h6>
                  <ImageUpload />
                </Col>
                <Col md="6" sm="6">
                  <FormGroup>
                    <h6>
                      Product's name <span className="icon-danger">*</span>
                    </h6>
                    <Input className="border-input" placeholder="Enter product's name..." type="text" />
                  </FormGroup>
                  <Row className="price-row">
                    <Col md="8">
                      <h6>
                        Price <span className="icon-danger">*</span>
                      </h6>
                      <InputGroup className="border-input">
                        <Input className="border-input" defaultValue="" placeholder="Enter price" type="text" />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>VNĐ</InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <FormGroup>
                    <h6>Description</h6>
                    <Input
                      className="textarea-limited"
                      maxLength="150"
                      placeholder="Product description limited to 150 characters."
                      rows="10"
                      type="textarea"
                    />
                    <h5>
                      <small>
                        <span className="pull-right" id="textarea-limited-message">
                          150 characters left
                        </span>
                      </small>
                    </h5>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input defaultValue="" type="checkbox" />
                      Product avaiable <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="buttons-row">
                <Col md="4" sm="4">
                  <Button block className="btn-round" color="default" outline type="summit">
                    Cancel
                  </Button>
                </Col>
                <Col md="4" sm="4">
                  <Button block className="btn-round" color="danger">
                    Delete
                  </Button>
                </Col>
                <Col md="4" sm="4">
                  <Button block className="btn-round" color="primary" type="submit">
                    Save &amp; Publish
                  </Button>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
