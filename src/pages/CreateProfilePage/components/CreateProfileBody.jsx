import React, { useState } from 'react';
import ReactDatetime from 'react-datetime';
import { useAuth } from 'contexts/AuthContext';

import { Button, FormGroup, Form, Input, Container, Row, Col, Label, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { createDataByPath } from 'services/data.service';
import { useHistory } from 'react-router';
import { NotificationManager } from 'react-notifications';

export default function CreateProfileBody(props) {
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState(1);
  const [birthDay, setBirthDay] = useState('01-01-2000');

  const { currentUser } = useAuth();
  const history = useHistory();

  const handleDate = (e) => {
    setBirthDay(e.format('DD-MM-YYYY'));
  };

  const birtDayConvertToUpdate = (birthDay) => {
    const array = birthDay.split('-');
    return `${array[2]}-${array[1]}-${array[0]}`;
  };

  async function createProfile() {
    const birth_day = birtDayConvertToUpdate(birthDay);
    let email = '';
    if (currentUser) {
      email = currentUser.email;
    }
    const data = {
      email: email,
      customer_type: '3e3eb7b4-510a-488d-837a-2f01e3898787',
      full_name: fullname,
      password: '',
      phone: phone,
      birth_day: birth_day,
      gender: gender,
    };
    const res = await createDataByPath('api/v1/customers', data);
    console.log(res);
    if (res.status === 201) {
      if (localStorage) {
        localStorage.setItem('accessToken', res.data.jwt_token);
      }
      history.push('/home');
      NotificationManager.success('Create Success', 'Your data has been create success', 3000);
    } else {
      NotificationManager.warning('Create Failed', 'Something wrongs when create profile', 3000);
    }
  }

  return (
    <>
      <Container>
        <h3 className="text-center" style={{ fontWeight: 'bold' }}>
          Update Your Profile
        </h3>
        <Row>
          <Col className="ml-auto mr-auto" md="8">
            <Form
              className="settings-form"
              onSubmit={(e) => {
                e.preventDefault();
                createProfile();
              }}
            >
              <Row>
                <Col md="6" sm="6">
                  <FormGroup>
                    <label>Fullname</label>
                    <Input
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
                      className="border-input"
                      placeholder="Fullname"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
                <Col md="6" sm="6">
                  <FormGroup>
                    <label>Phone</label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="border-input"
                      placeholder="Phone"
                      type="text"
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <label>Email</label>
                <Input value={currentUser && currentUser.email} className="border-input" placeholder="Email" type="text" disabled />
              </FormGroup>
              <Row>
                <Col md="6">
                  <FormGroup>
                    <label>
                      Gender: <span className="icon-danger"></span>
                    </label>
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
                  </FormGroup>
                </Col>
                <Col md="6">
                  <label>
                    Birthday <span className="icon-danger"></span>
                  </label>
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
                      required
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
              <div className="text-center">
                <Button className="btn-wd btn-round" color="info" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
