import React, { useState,useEffect  }  from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,

} from "../../components/Component";
import { useForm } from "react-hook-form";
// import {  NioIconCard } from "../../../components/Component";
import Icon from "../../components/icon/Icon";
import {
    Button,

    Row,
    Col,
    Card,

    CardBody,

    // Button,

    Spinner,Alert
  } from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL  } from "../axios/auth";
import ApiService from '../base/axios';


const ProfileJB = ({ ...props }) => {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const token = localStorage.getItem('accessToken');
  const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));

  const { register: registerForm1, handleSubmit: handleSubmitForm1, formState: { errors: errorsForm1 } } = useForm();
  const { register: registerForm2, handleSubmit: handleSubmitForm2, formState: { errors: errorsForm2 } } = useForm();

  const [oldPassState, setOldPassState] = useState(false);
  const [newPassState, setNewPassState] = useState(false);
  const [confirmNewPassState, setConfirmNewPassState] = useState(false);

  const profile = JSON.parse(localStorage.getItem('contact'));
  const user = JSON.parse(localStorage.getItem('user'));
  const ed = JSON.parse(localStorage.getItem('Education'));
  const ex = JSON.parse(localStorage.getItem('Experience'));

  const [imagePreview, setImagePreview] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  const [errorVal1, setError1] = useState("");
  const [errorVal2, setError2] = useState("");
  const [success, setSuccess] = useState("");
  const [successPass, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (errorVal1) {
      const timer = setTimeout(() => setError1(""), 3000);
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
      const timer = setTimeout(() => setSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (successPass) {
      const timer = setTimeout(() => setPasswordSuccess(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successPass]);

  useEffect(() => {
    fetchJobs();
  }, []); 

  const fetchJobs = async () => {
    setImagePreview(`http://localhost:8000/` + profile.profile_picture);
    setExperiences(ex || []);
    setEducation(ed || []);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handlePasswordChange = async (formData) => {
    setLoading2(true);
    apiService.updatePassword(formData)
      .then(response => {
        setTimeout(() => {
          setLoading2(false);
          setPasswordSuccess(response.message);
        }, 1000);
      })
      .catch(error => {
        setTimeout(() => {
          var errors = error.response.data.data;
          var errorString = errors[0];
          setError2(errorString);
          setLoading2(false);
        }, 1000);
      });
  };

  const handleFormSubmit = async (formData) => {
    var role = localStorage.getItem('role');
    setLoading(true);
    formData['id'] = profile['id'];

    if (role === 'Employer') {
      apiService.updateProfileEmployer({ ...formData, educational_attainment: education, experience: experiences })
        .then(response => {
          localStorage.setItem('contact', JSON.stringify(response.data.contact));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('fullname', response.data.fullname);
          localStorage.setItem('Education', JSON.stringify(response.data.educational_attainment));
          localStorage.setItem('Experience', JSON.stringify(response.data.experience));
          setLoading(false);
        })
        .catch(error => {
          setTimeout(() => {
            var errors = error.response.data.data;
            var errorString = errors[0];
            setError1(errorString);
            setLoading(false);
          }, 1000);
        });
    } else {
      apiService.updateProfileJobseeker({ ...formData, educational_attainment: education, experience: experiences })
        .then(response => {
          localStorage.setItem('contact', JSON.stringify(response.data.contact));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          setLoading(false);
          setSuccess(response.message);
        })
        .catch(error => {
          setTimeout(() => {
            var errors = error.response.data.data;
            var errorString = errors[0];
            setError1(errorString);
            setLoading(false);
          }, 1000);
        });
    }
  };

  const handleEducationChange = (index, value) => {
    const newEducation = [...education];
    newEducation[index] = value;
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([...education, ""]);
  };

  const deleteEducation = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
  };

  const handleExperienceChange = (index, value) => {
    const newExperiences = [...experiences];
    newExperiences[index] = value;
    setExperiences(newExperiences);
  };

  const addExperience = () => {
    setExperiences([...experiences, ""]);
  };

  const deleteExperience = (index) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(newExperiences);
  };

  const onSubmit = (data) => {
    console.log(data);
  };



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
                      <h5 className="mb-3">Basic Informationss</h5>
                      <form className="is-alter" onSubmit={handleSubmitForm1(handleFormSubmit)}>
                        <Row className="mt-2">
                          <Col md="6">
                          {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="image-preview" 
                                style={{ width: '200px', height: '150px' }} 
                            />
                        ) : (
                            <input 
                                {...registerForm1('profile_picture')}
                                type="file" 
                                className="form-control w-50" 
                                onChange={handleImageChange} 
                                accept="image/*" 
                            />
                        )}
                          </Col>
                            
                        </Row>
                        <Row className="g-gs mt-50px">
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">First Name</label>
                              <input 
                                id="first_name"
                                defaultValue={profile.first_name}
                                {...registerForm1('first_name', { required: true })}
                                type="text" className="form-control" 
                                />
                                {errorsForm1.first_name && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Last Name</label>
                              <input 
                                  id="last_name"
                                  defaultValue={profile.last_name}
                                {...registerForm1('last_name', { required: true })}
                                type="text" className="form-control" 
                                />
                                {errorsForm1.last_name && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                        </Row>
                        <Row md="6">
                         
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Sex</label>
                              <select className="form-control" defaultValue={profile.sex} {...registerForm1('gender')} id="gender">
                                <option value="">Select</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                              </select>
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Contact number</label>
                              <input
                                type="number"
                                className="form-control"
                                pattern="[0-9]{11}"
                                title="Contact number must be 11 digits"
                                maxLength="11"
                                id="contact_number"
                                defaultValue={profile.contact_number}
                                {...registerForm1('contact_number', { required: true })}
                                />
                                {errorsForm1.contact_number && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          
                        </Row>
                        <Row className="g-gs">
                        
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Birthday</label>
                              <input type="date" id="birthdate"  {...registerForm1('birthday')} defaultValue={profile.birthdate} className="form-control" />
                            </div>
                          </Col>
                          <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Email</label>
                              <input type="text" 
                                id="email"
                                defaultValue={user.email}
                                {...registerForm1('email', { required: true })}
                                className="form-control" />
                                {errorsForm1.email && <p className="invalid">This field is required</p>}
                              </div>
                          </Col>
                        </Row>
                        <Row className="g-gs">
                          <Col md="6"> 
                            <div className="form-group">
                              <label className="form-label">Job Category</label>
                              <select className="form-control" {...registerForm1('category')} defaultValue={profile.category_id}>
                                <option value="">Select</option>
                                <option value="1">Office Work</option>
                                <option value="2">Production</option>
                                <option value="3">Skilled</option>
                                <option value="4">Hospitality</option>
                                <option value="5">BPO</option>
                                <option value="6">Logistic</option> 
                                <option value="7">Construction</option>
                                <option value="8">Delivery Service</option>
                                <option value="9">Distributor</option>
                                <option value="10">Government Institute</option>
                                <option value="11">Heavy Equipment</option>
                                <option value="12">IT Solutions</option>
                                <option value="13">Language School</option>
                                <option value="14">Manufacturing</option>
                                <option value="15">Mining</option>
                                <option value="16">Real State</option>
                                <option value="17">Retail</option>
                                <option value="18">Seaport</option>
                                <option value="19">Shipyard</option>
                                <option value="20">Trucking</option>
                                <option value="21">Wholesale Trade</option>
                              </select>
                            </div>
                          </Col>

                          {/* <Col md="6">
                            <div className="form-group">
                              <label className="form-label">Nationality</label>
                              <input type="text" 
                                id="nationality"
                                defaultValue={profile.nationality}
                                {...registerForm1('nationality', { required: true })}
                                className="form-control" />
                                {errorsForm1.nationality && <p className="invalid">This field is required</p>}
                              </div>
                          </Col> */}

                        </Row>
                        <Row className="g-gs">
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Address No.</label>
                                <input
                                  type="text"
                                  id="address"
                                  defaultValue={profile.address}
                                  {...registerForm1('address', { required: true })}
                                  placeholder="Enter your address no."
                                  className="form-control-lg form-control" />
                                {errorsForm1.address && <p className="invalid">This field is required</p>}
                              </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Street</label>
                                <input
                                  type="text"
                                  id="street"
                                  defaultValue={profile.street}
                                  {...registerForm1('street', { required: true })}
                                  placeholder="Enter your street"
                                  className="form-control-lg form-control" />
                                {errorsForm1.street && <p className="invalid">This field is required</p>}
                              </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Barangay</label>
                              <input
                                type="text"
                                id="barangay"
                                {...registerForm1('barangay', { required: true })}
                                placeholder="Enter your barangay"
                                  defaultValue={profile.barangay}
                                  className="form-control-lg form-control" />
                              {errorsForm1.barangay && <p className="invalid">This field is required</p>}                  
                            </div>
                          </Col>
                        </Row>
                        <Row className="g-gs">
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">City</label>
                              <input
                                type="text"
                                id="city"
                                {...registerForm1('city', { required: true })}
                                placeholder="Enter your city"
                                  defaultValue={profile.city}
                                  className="form-control-lg form-control" />
                              {errorsForm1.city && <p className="invalid">This field is required</p>}                  
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Province</label>   
                              <input
                                type="text"
                                id="province"
                                defaultValue={profile.province}
                                {...registerForm1('province', { required: true })}
                                placeholder="Enter your province"
                                className="form-control-lg form-control" />
                              {errorsForm1.province && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Region</label>
                              <input
                                type="text"
                                id="region"
                                {...registerForm1('region', { required: true })}
                                defaultValue={profile.region}
                                placeholder="Enter your region"
                                className="form-control-lg form-control" />
                              {errorsForm1.region && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                        </Row>
                        <Row className="g-gs">
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Country</label>
                              <input
                                type="text"
                                id="country"
                                {...registerForm1('country', { required: true })}
                                defaultValue={profile.country}
                                placeholder="Enter your country"
                                className="form-control-lg form-control" />
                              {errorsForm1.country && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                          <div className="form-group">
                              <label className="form-label">Zip code</label>
                            <input
                              type="text"
                              id="zipcode"
                              defaultValue={profile.zipcode}
                              {...registerForm1('zipcode', { required: true })}
                              placeholder="Enter your zipcode"
                              className="form-control-lg form-control" />
                            {errorsForm1.zipcode && <p className="invalid">This field is required</p>}
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
                                      <Icon name="alert-circle" />
                                      {errorVal2}
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
                                  defaultValue=""
                                  type={oldPassState ? "text" : "password"}
                                  id="old_password"
                                  {...registerForm2('old_password', { required: true })}
                                  placeholder="Enter your old password"
                                  className={`form-control-lg form-control ${oldPassState ? "is-hidden" : "is-shown"}`}
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
                                  defaultValue=""
                                  type={newPassState ? "text" : "password"}
                                  id="new_password"
                                  {...registerForm2('new_password', { required: true })}
                                  placeholder="Enter your new password"
                                  className={`form-control-lg form-control ${newPassState ? "is-hidden" : "is-shown"}`}
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
                                  defaultValue=""
                                  type={confirmNewPassState ? "text" : "password"}
                                  id="confirm_new_password"
                                  {...registerForm2('confirm_new_password', { required: true })}
                                  placeholder="Confirm your new password"
                                  className={`form-control-lg form-control ${confirmNewPassState ? "is-hidden" : "is-shown"}`}
                                />
                                {errorsForm2.confirm_new_password && <p className="invalid">This field is required</p>}
                              </div>
                            </div>

                              <div className="form-group">
                                  <Button type="submit" color="primary" size="sm">
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

export default ProfileJB;
