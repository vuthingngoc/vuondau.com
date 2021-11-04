import React, { useEffect, useState } from 'react';

import { Button, Label, FormGroup, Input, InputGroup, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

import ImageUpload from 'components/CustomUpload/ImageUpload.js';
import 'react-notifications/lib/notifications.css';
import { getDataByPath } from 'services/data.service';
import { updateDataAccount } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

export default function AdminProductDetailBody(props) {
  const [data, setData] = useState(null);
  const [productTypeData, setProductTypeData] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [productType, setProductType] = useState('');
  const [createDate, setCreateDate] = useState('');

  const [disable, setDisable] = useState(false);
  const history = useHistory();

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('add-product');
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove('add-product');
    };
  });

  async function loadData(id) {
    let path = `api/v1/products/${id}`;
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      setData(res.data);
      loadToState(res.data);
    }

    if (props.match.params.action === 'view') {
      setDisable(true);
    }
  }

  async function loadproductTypeData() {
    const path = 'api/v1/product-types';
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      const listType = [];
      res.data.forEach((ele) => {
        const optionType = { value: ele.id, label: ele.name };
        listType.push(optionType);
      });
      setProductTypeData(listType);
    }
  }

  const loadToState = (data) => {
    if (data !== null) {
      setName(data.name);
      setProductType({ value: data.product_type.id, label: data.product_type.name });
      setDescription(data.description);
      setCreateDate(data.data_of_create);
      setStatus(data.status);
    }
  };

  async function updateData() {
    if (data !== null) {
      let updateData = {
        product_type_id: productType.value,
        name: name,
        description: description,
        status: status,
      };
      const path = 'api/v1/products/';
      const res = await updateDataAccount(`${path}${props.match.params.id}`, updateData);
      if (res.status === 200) {
        setData(res.data);
        NotificationManager.success('Update Success', 'Your data has been update success', 3000);
      } else {
        NotificationManager.warning('Update Failed', 'Something wrongs when updating', 3000);
      }
    }
  }

  async function deleteData() {
    if (data !== null) {
      const res = await deleteDataByPath(`api/v1/products/${props.match.params.id}`, props.match.params.id);
      if (res.status === 204) {
        setData(null);
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
        history.push('/admin/manageproduct');
      } else {
        NotificationManager.warning('Deactive Failed', 'Something wrongs when deactive', 3000);
      }
    }
  }

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color: '#000000',
        fontWeight: 'bold',
        cursor: isDisabled ? 'not-allowed' : 'default',
      };
    },
  };

  useEffect(() => {
    if (data === null) {
      loadData(props.match.params.id);
      loadproductTypeData();
    }
  });

  return (
    <>
      <div className="main">
        <div className="section">
          <Container>
            <Row>
              <Col md="9" sm="9">
                <h3 style={{ fontWeight: 'bold' }}>Product Information</h3>
              </Col>
              <Col md="3" sm="3">
                <Button color="success" style={{ marginTop: '20px' }} onClick={() => setDisable(!disable)}>
                  {disable ? 'Enable Edit' : 'Disable Edit'}
                </Button>
              </Col>
            </Row>
            <div>
              <Row>
                <Col md="6" sm="6">
                  <h6>Product Image</h6>
                  <ImageUpload />
                  <Col md="8" sm="8">
                    <h6>Product Type</h6>
                    <FormGroup>
                      <Select
                        name="productType"
                        value={productType}
                        onChange={(value) => setProductType(value)}
                        options={productTypeData}
                        placeholder="CHOOSE CUSTOMER TYPE"
                        styles={colourStyles}
                      />
                    </FormGroup>
                  </Col>
                </Col>
                <Col md="6" sm="6">
                  <FormGroup>
                    <Row>
                      <Col md="8">
                        <h6>
                          Product Name <span className="icon-danger">*</span>
                        </h6>
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="border-input"
                          placeholder="Enter Product Name"
                          type="text"
                          disabled={disable}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col md="8">
                      <h6>
                        Date of Create <span className="icon-danger"></span>
                      </h6>
                      <InputGroup className="border-input">
                        <Input defaultValue={createDate} className="border-input" placeholder="Create Date" type="text" disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="10">
                      <h6>
                        Description <span className="icon-danger"></span>
                      </h6>
                      <InputGroup className="border-input">
                        <Input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="border-input"
                          placeholder="Enter Description"
                          type="text"
                          disabled={disable}
                        />
                      </InputGroup>
                    </Col>
                  </Row>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="checkbox"
                        checked={status === 1 ? true : false}
                        onChange={(e) => (e.target.checked ? setStatus(1) : setStatus(0))}
                        disabled={disable}
                      />
                      Account avaiable <span className="form-check-sign" />
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="buttons-row">
                <Col md="4" sm="4">
                  <Button block className="btn-round" color="default" outline type="summit" href="/admin/manageproduct">
                    Cancel
                  </Button>
                </Col>
                <Col md="4" sm="4">
                  <Button
                    block
                    className="btn-round"
                    color="danger"
                    onClick={(e) => {
                      if (window.confirm('Are you sure you wish to deactive this account?')) deleteData();
                    }}
                    disabled={disable}
                  >
                    Deactive
                  </Button>
                </Col>
                <Col md="4" sm="4">
                  <Button block onClick={updateData} className="btn-round" color="primary" type="submit" disabled={disable}>
                    Save and Publish
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
