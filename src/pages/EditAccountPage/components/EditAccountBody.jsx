import React, { useState, useEffect } from 'react';

import { Button, Label, FormGroup, Input, InputGroup, Container, Row, Col, InputGroupAddon, InputGroupText } from 'reactstrap';
import ReactDatetime from 'react-datetime';

import ImageUpload from 'components/CustomUpload/ImageUpload.js';
import 'react-notifications/lib/notifications.css';
import { getDataByPath } from 'services/data.service';
import { updateDataAccount } from 'services/data.service';
import { deleteDataAccount } from 'services/data.service';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

export default function EditAccountBody(props) {
  const [data, setData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(0);
  const [status, setStatus] = useState(0);
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

  const handleDate = (e) => {
    setBirthDay(e.format('DD-MM-YYYY'));
  };

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
    const path = `api/v1/customers/${id}`;
    const res = await getDataByPath(path);
    if (res?.status === 200) {
      setData(res.data);
      loadToState(res.data);
    }
  }

  const loadToState = (data) => {
    if (data !== null) {
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      const birth_day = birthDayConvertToShow(data.birth_day);
      setBirthDay(birth_day);
      setPhone(data.phone);
      setGender(data.gender);
      setStatus(data.status);
    }
  };

  async function updateData() {
    if (data !== null) {
      const birth_day = birtDayConvertToUpdate(birthDay);
      const updateData = {
        customer_type: data.customer_type_navigation.id,
        first_name: firstName,
        last_name: lastName,
        password: data.password,
        phone: phone,
        birth_day: birth_day,
        gender: gender,
        status: status,
      };
      const res = await updateDataAccount(`api/v1/customers/${props.match.params.id}`, updateData);
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
      const res = await deleteDataAccount(`api/v1/customers/${props.match.params.id}`, props.match.params.id);
      if (res.status === 204) {
        setData(null);
        NotificationManager.success('Deactive Success', 'Your data has been deactive success', 3000);
        history.push('/admin/manageaccount');
      } else {
        NotificationManager.warning('Deactive Failed', 'Something wrongs when deactive', 3000);
      }
    }
  }

  useEffect(() => {
    if (data === null) {
      loadData(props.match.params.id);
    }
  });

  return (
    <>
      <div className="main">
        <div className="section">
          <Container>
            <h3>Account Information</h3>
            <div>
              <Row>
                <Col md="6" sm="6">
                  <h6>Account Image</h6>
                  <ImageUpload />
                </Col>
                <Col md="6" sm="6">
                  <FormGroup>
                    <h6>
                      Account's Name <span className="icon-danger">*</span>
                    </h6>
                    <Row>
                      <Col md="4">
                        <h6>
                          First Name <span className="icon-danger">*</span>
                        </h6>
                        <Input
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="border-input"
                          placeholder="First Name"
                          type="text"
                        />
                      </Col>
                      <Col md="4">
                        <h6>
                          Last Name <span className="icon-danger">*</span>
                        </h6>
                        <Input
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="border-input"
                          placeholder="Last Name"
                          type="text"
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
                  >
                    Deactive
                  </Button>
                </Col>
                <Col md="4" sm="4">
                  <Button block onClick={updateData} className="btn-round" color="primary" type="submit">
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
