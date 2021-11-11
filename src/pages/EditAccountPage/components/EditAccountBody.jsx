import React, { useState, useEffect } from 'react';

import { Button, Label, FormGroup, Input, InputGroup, Container, Row, Col, InputGroupAddon, InputGroupText } from 'reactstrap';
import ReactDatetime from 'react-datetime';
import Select from 'react-select';

// import ImageUpload from 'components/CustomUpload/ImageUpload.js';
import 'react-notifications/lib/notifications.css';
import { getDataByPath } from 'services/data.service';
import { updateDataByPath } from 'services/data.service';
import { deleteDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

export default function EditAccountBody(props) {
  const [data, setData] = useState(null);
  const [customerTypeData, setCustomerTypeData] = useState([]);
  const [fullname, setFullname] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(0);
  const [status, setStatus] = useState(0);
  const [customerType, setCustomerType] = useState('');
  const [view] = useState(props.match.params.view);

  const [disable, setDisable] = useState(false);
  const history = useHistory();

  document.documentElement.classList.remove('nav-open');
  React.useEffect(() => {
    document.body.classList.add('add-product');
    return function cleanup() {
      document.body.classList.remove('add-product');
    };
  });

  const handleDate = (e) => {
    setBirthDay(e.format('DD-MM-YYYY'));
  };

  // const handleDefaultDisable = () => {
  //   const endpoint = prop
  // }

  const birthDayConvertToShow = (birthDay) => {
    const string = birthDay.slice(0, 10);
    const array = string.split('-');
    return `${array[2]}-${array[1]}-${array[0]}`;
  };

  const birtDayConvertToUpdate = (birthDay) => {
    const array = birthDay.split('-');
    return `${array[2]}-${array[1]}-${array[0]}`;
  };

  async function loadData(id) {
    let path = `api/v1/customers/${id}`;
    if (view === 'farmer') {
      path = `api/v1/farmers/${id}`;
    }
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      setData(res.data);
      loadToState(res.data);
    }
    if (props.match.params.action === 'view') {
      setDisable(true);
    }
  }

  async function loadCustomerTypeData() {
    const path = 'api/v1/customer-types';
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      const listType = [];
      res.data.forEach((ele) => {
        const optionType = { value: ele.id, label: ele.name };
        listType.push(optionType);
      });
      setCustomerTypeData(listType);
    }
  }

  const loadToState = (data) => {
    if (data !== null) {
      setFullname(data.full_name);
      setEmail(data.email);
      const birth_day = birthDayConvertToShow(data.birth_day);
      setBirthDay(birth_day);
      setPhone(data.phone);
      setGender(data.gender);
      setStatus(data.status);
      if (view === 'customer') setCustomerType({ value: data.customer_type_navigation.id, label: data.customer_type_navigation.name });
    }
  };

  async function updateData() {
    if (data !== null) {
      const birth_day = birtDayConvertToUpdate(birthDay);
      let updateData = {
        customer_type: customerType.value,
        full_name: fullname,
        password: data.password,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        status: status,
      };
      let path = 'api/v1/customers/';
      if (view === 'farmer') {
        updateData = {
          full_name: fullname,
          password: data.password,
          phone: phone,
          birth_day: birth_day,
          gender: gender,
          status: status,
        };
        path = 'api/v1/farmers/';
      }
      const res = await updateDataByPath(`${path}${props.match.params.id}`, updateData);
      if (res.status === 200) {
        setData(res.data);
        NotificationManager.success('Update Success', 'Your data has been update success', 3000);
      } else {
        NotificationManager.warning('Update Failed', 'Something wrongs when updating', 3000);
      }
    }
  }

  async function deleteData() {
    let path = 'api/v1/customers/';
    if (view === 'farmer') {
      path = 'api/v1/farmers/';
    }
    if (data !== null) {
      const res = await deleteDataByPath(`${path}${props.match.params.id}`, props.match.params.id);
      if (res.status === 204) {
        setData(null);
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
        history.push('/admin/manageaccount');
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
      if (view === 'customer') loadCustomerTypeData();
    }
  });

  return (
    <>
      <div className="main">
        <div className="section">
          <Container>
            <Row>
              <Col md="9" sm="9">
                <h3 style={{ fontWeight: 'bold' }}>Account Information</h3>
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
                  {view === 'customer' && (
                    <Col md="8" sm="8">
                      <h6>Customer Type</h6>
                      <FormGroup>
                        <Select
                          name="customerType"
                          value={customerType}
                          onChange={(value) => setCustomerType(value)}
                          options={customerTypeData}
                          placeholder="CHOOSE CUSTOMER TYPE"
                          styles={colourStyles}
                        />
                      </FormGroup>
                    </Col>
                  )}
                </Col>
                <Col md="6" sm="6">
                  <FormGroup>
                    <h6>
                      Account's Name <span className="icon-danger">*</span>
                    </h6>
                    <Row>
                      <Col md="10">
                        <h6>
                          Fullname <span className="icon-danger">*</span>
                        </h6>
                        <Input
                          value={fullname}
                          onChange={(e) => setFullname(e.target.value)}
                          className="border-input"
                          placeholder="Fullname"
                          type="text"
                          disabled={disable}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <Row>
                    <Col md="8">
                      <h6>
                        Email <span className="icon-danger"></span>
                      </h6>
                      <InputGroup className="border-input">
                        <Input defaultValue={email} className="border-input" placeholder="Enter Email" type="text" disabled />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <h6>
                        Birthday <span className="icon-danger"></span>
                      </h6>
                      <InputGroup className="date" id="datetimepicker">
                        <ReactDatetime
                          value={birthDay}
                          onChange={handleDate}
                          dateFormat="DD-MM-YYYY"
                          timeFormat={false}
                          inputProps={{
                            readOnly: true,
                            className: 'form-control',
                            placeholder: 'Birth Day',
                          }}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <span className="glyphicon glyphicon-calendar">
                              <i className="fa fa-calendar" />
                            </span>
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <h6>
                        Phone <span className="icon-danger"></span>
                      </h6>
                      <InputGroup className="border-input">
                        <Input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="border-input"
                          placeholder="Enter Phone"
                          type="text"
                          disabled={disable}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="4">
                      <h6>
                        Gender <span className="icon-danger"></span>
                      </h6>
                      <div className="form-check-radio">
                        <Label check>
                          <Input
                            onChange={(e) => (e.target.checked ? setGender(1) : setGender(0))}
                            id="Male"
                            name="exampleRadios"
                            type="radio"
                            checked={gender === 1 ? true : false}
                            disabled={disable}
                          />
                          Male <span className="form-check-sign" />
                        </Label>
                      </div>
                      <div className="form-check-radio">
                        <Label check>
                          <Input
                            onChange={(e) => (e.target.checked ? setGender(0) : setGender(1))}
                            id="Female"
                            name="exampleRadios"
                            type="radio"
                            checked={gender === 0 ? true : false}
                            disabled={disable}
                          />
                          Female <span className="form-check-sign" />
                        </Label>
                      </div>
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
                  <Button block className="btn-round" color="default" outline type="summit" href="/admin/manageaccount">
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
