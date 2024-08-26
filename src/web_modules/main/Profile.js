import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
  NioIconCard,
  BlockBetween
} from "../../components/Component";
import { useForm } from "react-hook-form";
// import {  NioIconCard } from "../../../components/Component";
import Icon from "../../components/icon/Icon";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  // Button,

  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge, Spinner, Alert
} from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
import ApiService from '../base/axios';
const Profile = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const token = localStorage.getItem('accessToken');
  const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
  const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();
  
  const [oldPassState, setOldPassState] = useState(false);
  const [newPassState, setNewPassState] = useState(false);
  const [confirmNewPassState, setConfirmNewPassState] = useState(false);

  const [errorVal1, setError1] = useState("");
    const [errorVal2, setError2] = useState("");
 
    const [success, setSuccess] = useState("");
    const [successPass, setPassASuccess ] = useState("");

    useEffect(() => {
      if (errorVal1) {
          const timer = setTimeout(() => setError1(""), 3000); // Adjust time as needed (e.g., 3000ms = 3 seconds)
          return () => clearTimeout(timer);
      }
  }, [errorVal1]);

  useEffect(() => {
      if (errorVal2) {
          const timer = setTimeout(() => setError2(""), 3000);
          return () => clearTimeout(timer);
      }
  }, [errorVal2]);

  useEffect(() => {
    if (success) {
        console.log('Success message:', success); // Add this line
        const timer = setTimeout(() => setSuccess(""), 3000);
        return () => clearTimeout(timer);
    }
}, [success]);

  useEffect(() => {
      if (successPass) {
          console.log('Success message:', success); // Add this line
          const timer = setTimeout(() => setPassASuccess(""), 3000);
          return () => clearTimeout(timer);
      }
  }, [successPass]);

  const profile = JSON.parse(localStorage.getItem('contact'));
  const user = JSON.parse(localStorage.getItem('user'));
  
  
  const handlePasswordChange = async (formData) => {
    setLoading2(true);
    apiService.updatePassword(formData)
          .then(response => {
            console.log('Success response:', response.message); // Add this line
            setTimeout(() => {
                setLoading2(false);
                setPassASuccess(response.message);
            }, 1000);
        })
        .catch(error => {
            setTimeout(() => {
                console.log(error.response.data.data);
                var errors = error.response.data.data;
                var errorString = errors[0];
                setError2(errorString);
                setLoading2(false);

            }, 1000);
        });
}


  const handleFormSubmit = async (formData) => {
    var role = localStorage.getItem('role');
    setLoading(true);
    if (role == 'Employer') {
      apiService.updateProfileEmployer(formData)
        .then(response => {
          localStorage.setItem('contact', JSON.stringify(response.data.contact));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setSuccess("Profile updated successfully"); // Set the success message here
          setLoading(false);
        })
        .catch(error => {
          setTimeout(() => {
            console.log(error.response.data.data);
            var errors = error.response.data.data;
            var errorString = errors[0];
            setError1(errorString);
            setLoading(false);
          }, 1000);
        });
    } else {
      apiService.updateProfileJobseeker(formData)
        .then(response => {
          localStorage.setItem('contact', JSON.stringify(response.data.contact));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setLoading(false);
        })
        .catch(error => {
          setTimeout(() => {
            console.log(error.response.data.data);
            var errors = error.response.data.data;
            var errorString = errors[0];
            setError1(errorString);
            setLoading(false);
          }, 1000);
        });
    }
  }


  console.log(profile);
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle>Profile</BlockTitle>
            </BlockHeadContent>
          </BlockHead>
      
          <Row className="mt-2">
            <Col xs="12" sm="12" md="12" lg="12" xl="12">
                <Card className="card-bordered">
                    <CardBody className="card-inner">
                      <h5 className="mb-3">Basic Information</h5>
                      <form className="is-alter" onSubmit={handleSubmitForm1(handleFormSubmit)}>
                        <Row className="g-gs mt-50px">
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="first_name">
                                First Name
                              </label>
                            <div className="form-control-wrap">

                              <input
                                type="text"
                                defaultValue={profile.first_name}
                                id="first_name"
                                {...registerForm1('first_name', { required: true })}
                                placeholder="Enter your first name"
                                className="form-control-lg form-control" />
                              {errorsForm1.first_name && <p className="invalid">This field is required</p>}
                            </div>
                          </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label" htmlFor="last_name">
                                Last Name
                              </label>
                              <div className="form-control-wrap">
                                <input
                                  type="text"
                                  id="last_name"
                                  defaultValue={profile.last_name}
                                  {...registerForm1('last_name', { required: true })}
                                  placeholder="Enter your last name"
                                  className="form-control-lg form-control" />
                                {errorsForm1.last_name && <p className="invalid">This field is required</p>}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        
                        <Row md="6">
                          <Col md="6">
                          <div className="form-group">
                            <label className="form-label" htmlFor="sex">
                              Sex
                            </label>
                            <div className="form-control-wrap">
                              <select
                                defaultValue={profile.sex}
                                id="sex"
                                {...registerForm1('sex', { required: true })}
                                className="form-control-lg form-control"
                              > 
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                              </select>
                            </div>
                          </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                            <label className="form-label" htmlFor="contact_number">
                              Contact No.
                            </label>
                            <div className="form-control-wrap">
                              <input
                                defaultValue={profile.contact_number}
                                type="text"
                                id="contact_number"
                                {...registerForm1('contact_number', { required: true })}
                                placeholder="Enter your contact no."
                                className="form-control-lg form-control" />
                              {errorsForm1.contact_number && <p className="invalid">This field is required</p>}
                            </div>
                          </div>
                          </Col>
                        </Row>

                        <Row className="g-gs">
                          <Col md="6">
                            <div className="form-group">
                            <label className="form-label" htmlFor="address">
                              Address
                            </label>
                            <div className="form-control-wrap">
                              <input
                                defaultValue={profile.address}
                                type="text"
                                id="address"
                                {...registerForm1('address', { required: true })}
                                placeholder="Enter your sex"
                                className="form-control-lg form-control" />
                              {errorsForm1.address && <p className="invalid">This field is required</p>}
                            </div>
                          </div>
                          </Col>
                          <Col md="6">
                          <div className="form-group">
                          <label className="form-label" htmlFor="company">
                            Company Name
                          </label>
                          <div className="form-control-wrap">
                            <input
                              defaultValue={profile.company}
                              type="text"
                              id="company"
                              {...registerForm1('company', { required: true })}
                              placeholder="Enter your company"
                              className="form-control-lg form-control" />
                            {errorsForm1.company && <p className="invalid">This field is required</p>}
                          </div>
                        </div>
                          </Col>
                        </Row>

                        <Row className="g-gs">
                          <Col md="6"> 
                            <div className="form-group">
                          <label className="form-label" htmlFor="position">
                            Position
                          </label>
                          <div className="form-control-wrap">
                            <input
                              defaultValue={profile.position}
                              type="text"
                              id="position"
                              {...registerForm1('position', { required: true })}
                              placeholder="Enter your position"
                              className="form-control-lg form-control" />
                            {errorsForm1.position && <p className="invalid">This field is required</p>}
                          </div>
                        </div>
                          </Col>

                          <Col md="4">
                            <div className="form-group">
                          <label className="form-label" htmlFor="birthdate">
                            Birthdate
                          </label>
                          <div className="form-control-wrap">
                            <input
                              defaultValue={profile.birthdate}
                              type="date"
                              id="birthdate"
                              {...registerForm1('birthdate', { required: true })}
                              placeholder="Enter your birthdate"
                              className="form-control-lg form-control" />
                            {errorsForm1.birthdate && <p className="invalid">This field is required</p>}
                          </div>
                        </div>
                          </Col>

                          

                        </Row>


                        <Row className="g-gs">
                          
                          <Col md="4">
                          <div className="form-group">
                          <div className="form-label-group">
                            <label className="form-label" htmlFor="default-01">
                              Email
                            </label>
                          </div>
                          <div className="form-control-wrap">
                            <input
                              defaultValue={user.email}
                              type="email"
                              bssize="lg"
                              id="default-01"
                              {...registerForm1('email', { required: true })}
                              className="form-control-lg form-control"
                              placeholder="Enter your email address" />
                            {errorsForm1.email && <p className="invalid">This field is required</p>}
                          </div>
                        </div>
                          </Col>
                    
                        </Row>
                        <Row className="gy-4">
                          <Col size="6">
                              <div className="form-group mt-2">
                                <Button type="submit" color="primary" size="sm" >
                                    {loading ? <Spinner size="sm" color="light" /> : "Update"}
                                </Button>
                            </div>
                          </Col>
                        </Row>
                      </form>          
                      <br></br>
                      {success && (
                        <div className="mb-3">
                          <Alert color="success" className="alert-icon">
                            <Icon name="alert-circle" /> {success}
                          </Alert>
                        </div>
                      )}
                      {errorVal1 && (
                          <div className="mb-3">
                              <Alert color="danger" className="alert-icon">
                                  <Icon name="alert-circle" /> {errorVal1}
                              </Alert>
                          </div>
                      )}
                    </CardBody> 
                </Card>
            </Col>
          </Row>
          
          
          
          <Row className="mt-2">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <Card className="card-bordered">
                      <CardBody className="card-inner">
                  <h5 className="mb-3">Change Password</h5>
                  {successPass && (
                          <div className="mb-3">
                            <Alert color="success" className="alert-icon">
                              <Icon name="alert-circle" /> {successPass}
                            </Alert>
                          </div>
                        )}
                  {errorVal2 && (
                    <div className="mb-3">
                      <Alert color="danger" className="alert-icon">
                        <Icon name="alert-circle" />{errorVal2}
                      </Alert>
                    </div>
                  )}
                  <form onSubmit={handleSubmitForm2(handlePasswordChange)}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="old_password">
                        Old Password
                      </label>
                      <div className="form-control-wrap">
                        <a
                          href="#old_password"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setOldPassState(!oldPassState);
                          }}
                          className={`form-icon lg form-icon-right passcode-switch ${oldPassState ? "is-hidden" : "is-shown"}`}
                        >
                          <Icon name="eye" className="passcode-icon icon-show"></Icon>
                          <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                          type={oldPassState ? "text" : "password"}
                          id="old_password"
                          {...registerForm2('old_password', { required: true })}
                          placeholder="Enter your old password"
                          className={`form-control-lg form-control ${oldPassState ? "is-shown" : "is-hidden"}`}
                        />
                        {errorsForm2.old_password && <p className="invalid">This field is required</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="new_password">
                        New Password
                      </label>
                      <div className="form-control-wrap">
                        <a
                          href="#new_password"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setNewPassState(!newPassState);
                          }}
                          className={`form-icon lg form-icon-right passcode-switch ${newPassState ? "is-hidden" : "is-shown"}`}
                        >
                          <Icon name="eye" className="passcode-icon icon-show"></Icon>
                          <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                          type={newPassState ? "text" : "password"}
                          id="new_password"
                          {...registerForm2('new_password', { required: true })}
                          placeholder="Enter your new password"
                          className={`form-control-lg form-control ${newPassState ? "is-shown" : "is-hidden"}`}
                        />
                        {errorsForm2.new_password && <p className="invalid">This field is required</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="confirm_new_password">
                        Confirm New Password
                      </label>
                      <div className="form-control-wrap">
                        <a
                          href="#confirm_new_password"
                          onClick={(ev) => {
                            ev.preventDefault();
                            setConfirmNewPassState(!confirmNewPassState);
                          }}
                          className={`form-icon lg form-icon-right passcode-switch ${confirmNewPassState ? "is-hidden" : "is-shown"}`}
                        >
                          <Icon name="eye" className="passcode-icon icon-show"></Icon>
                          <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                        </a>
                        <input
                          type={confirmNewPassState ? "text" : "password"}
                          id="confirm_new_password"
                          {...registerForm2('confirm_new_password', { required: true })}
                          placeholder="Confirm your new password"
                          className={`form-control-lg form-control ${confirmNewPassState ? "is-shown" : "is-hidden"}`}
                        />
                        {errorsForm2.confirm_new_password && <p className="invalid">This field is required</p>}
                      </div>
                    </div>

                    <div className="form-group">
                      <Button type="submit" color="primary" size="sm" onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}>
                        {loading2 ? <Spinner size="sm" color="light" /> : "Change Password"}
                      </Button>
                    </div>
                    </form>
                  </CardBody>
                </Card>
              </Col>

          </Row>
        </Block>
      </Content>
    </>
  );
};

export default Profile;
