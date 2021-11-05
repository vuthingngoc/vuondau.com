import React, { useEffect, useState } from 'react';

import { Button, Label, FormGroup, Input, InputGroup, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

import ImageUpload from 'components/CustomUpload/ImageUpload.js';
import 'react-notifications/lib/notifications.css';
import { getDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';
import { createDataByPath } from 'services/data.service';
import { uploadImgToImgur } from 'services/data.service';

export default function AdminProductDetailBody(props) {
  const [data, setData] = useState(null);
  const [productTypeData, setProductTypeData] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(0);
  const [productType, setProductType] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [imageBase64, setImageBase64] = useState('');
  const [image, setImage] = useState('');
  const [imageId, setimageId] = useState('');

  const [disable, setDisable] = useState(false);
  const history = useHistory();

  const base64Callback = (base64) => {
    setImageBase64(base64);
  };

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('add-product');
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
      const resImage = await getDataByPath(`api/v1/product-pictures/${id}`);
      if (resImage?.status === 200) {
        if (resImage.data[0]) {
          setImage(resImage.data[0].src);
          setimageId(resImage.data[0].id);
        }
      }
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
      const updateData = {
        product_type_id: productType.value,
        name: name,
        description: description,
        status: status,
      };
      const path = 'api/v1/products/';
      const res = await updateDataByPath(`${path}${props.match.params.id}`, updateData);
      if (res.status === 200) {
        setData(res.data);
        updateDataImage(res.data.id);
      } else {
        NotificationManager.warning('Update Failed', 'Something wrongs when updating', 3000);
      }
    }
  }

  async function updateDataImage(productID) {
    const imageUrl = await uploadImgForUrl();
    if (imageUrl !== '' && productID !== '') {
      const updateDataImage = {
        product_id: productID,
        src: imageUrl,
        alt: '...',
      };
      const path = 'api/v1/product-pictures/';
      const resImage = await updateDataByPath(`${path}${imageId}`, updateDataImage);
      if (resImage.status === 200) {
        NotificationManager.success('Update Success', 'Your data has been update success', 3000);
      } else {
        NotificationManager.warning('Update Failed', 'Update Product Success But Update Image Failed', 3000);
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

  async function createData() {
    if (name !== '' && productType !== '') {
      const createData = {
        product_type_id: productType.value,
        name: name,
        description: description,
      };
      const path = 'api/v1/products';
      const res = await createDataByPath(`${path}`, createData);
      if (res.status === 201) {
        createDataImage(res.data.id);
      } else {
        NotificationManager.warning('Create Failed', 'Something wrongs when create', 3000);
      }
    } else {
      NotificationManager.warning('You need to fill Product Name and Product Type', 'Create Failed', 3000);
    }
  }

  async function createDataImage(id) {
    const imageUrl = await uploadImgForUrl();
    if (imageUrl !== '') {
      const createDataImage = {
        product_id: id,
        src: imageUrl,
        alt: '...',
      };
      const path = 'api/v1/product-pictures';
      const res = await createDataByPath(`${path}`, createDataImage);
      if (res.status === 201) {
        NotificationManager.success('Create Success', 'Your data has been create success', 3000);
        history.push(`/admin/manageproduct/productdetail/${res.data.id}/edit`);
      } else {
        NotificationManager.warning('Create Error', 'Create Product Successed But Upload Image Failed', 3000);
        history.push(`/admin/manageproduct/productdetail/${res.data.id}/edit`);
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

  async function uploadImgForUrl() {
    if (imageBase64 !== '') {
      const image = convertBase64Img(imageBase64);
      const res = await uploadImgToImgur(image);
      if (res.status === 200) {
        return res.data.data.display_url;
      } else return '';
    }
  }

  const convertBase64Img = (base64) => {
    if (base64 !== '') {
      const stringBase64 = base64;
      const tmp = stringBase64.split(',');
      return tmp[1];
    }
    return '';
  };

  useEffect(() => {
    if (data === null && props.match.params.action !== 'newproduct') {
      loadData(props.match.params.id);
    }
    if (productTypeData === null) {
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
              {props.match.params.action !== 'newproduct' && (
                <Col md="3" sm="3">
                  <Button color="success" style={{ marginTop: '20px' }} onClick={() => setDisable(!disable)}>
                    {disable ? 'Enable Edit' : 'Disable Edit'}
                  </Button>
                </Col>
              )}
            </Row>
            <div>
              <Row>
                <Col md="6" sm="6">
                  <h6>Product Image</h6>
                  <ImageUpload imageUrl={image} base64Callback={base64Callback} />
                  <Col md="8" sm="8">
                    <h6>Product Type</h6>
                    <FormGroup>
                      <Select
                        name="productType"
                        value={productType}
                        onChange={(value) => setProductType(value)}
                        options={productTypeData}
                        placeholder="CHOOSE PRODUCT TYPE"
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
                        <Input
                          defaultValue={createDate}
                          className="border-input"
                          placeholder="This will auto fill when create"
                          type="text"
                          disabled
                        />
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
                  {props.match.params.action !== 'newproduct' && (
                    <FormGroup check style={{ marginTop: '10px' }}>
                      <Label check>
                        <Input
                          type="checkbox"
                          checked={status === 1 ? true : false}
                          onChange={(e) => (e.target.checked ? setStatus(1) : setStatus(0))}
                          disabled={disable}
                        />
                        Product avaiable <span className="form-check-sign" />
                      </Label>
                    </FormGroup>
                  )}
                </Col>
              </Row>
              <Row className="buttons-row">
                <Col md="4" sm="4">
                  <Button block className="btn-round" color="default" outline type="summit" href="/admin/manageproduct">
                    Cancel
                  </Button>
                </Col>
                {props.match.params.action !== 'newproduct' && (
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
                )}
                {props.match.params.action !== 'newproduct' && (
                  <Col md="4" sm="4">
                    <Button block onClick={updateData} className="btn-round" color="primary" type="submit" disabled={disable}>
                      Save and Publish
                    </Button>
                  </Col>
                )}

                {props.match.params.action === 'newproduct' && (
                  <Col md="6" sm="6">
                    <Button block className="btn-round" color="success" type="submit" onClick={() => createData()}>
                      Save and Create
                    </Button>
                  </Col>
                )}
              </Row>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}
