import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Content from "../../../layout/content/Content";
import Head from "../../../layout/head/Head";
import { Form, Spinner, Alert } from "reactstrap";
import {
  Button,
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Row,
  Col,
  PreviewAltCard,
  PreviewCard,
} from "../../../components/Component";
import { Link } from "react-router-dom";
import NewLogo from "./skillsync.png";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../web_modules/axios/auth";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./TransListCrypto.css"; 
import { Card } from "reactstrap";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import { FaEllipsisV } from 'react-icons/fa';

const TransListCrypto = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorVal, setError] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const profile = JSON.parse(localStorage.getItem('contact'));
  const [selectedOption, setSelectedOption] = useState('');

  
  const [experiences, setExperiences] = useState([]); // Array of objects { experience: string, years: number }
  const [newExperience, setNewExperience] = useState('');
  const [newYears, setNewYears] = useState('');
  

  const [education, setEducation] = useState([]);
  const [newEducation, setNewEducation] = useState('');
  const [customEducation, setCustomEducation] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);

  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (formData) => {
    setLoading(true);

    const resumeData = new FormData();
    resumeData.append("profile_picture", formData.profile_picture[0]);

    Object.keys(formData).forEach((key) => {
      if (key !== "profile_picture") {
        resumeData.append(key, formData[key]);
      }
    });

    resumeData.append("exp1", newExperience);
    resumeData.append("exp2", experiences);
    resumeData.append("edu1", newEducation);
    resumeData.append("edu2", education);

    resumeData.append("user_id", user.id);
    resumeData.append("contact_id", profile.id);

    const response = await axios.post(BASE_URL + '/submit-resume', resumeData);

    if (response.data === 1) {
      navigate(`${process.env.PUBLIC_URL}/auth`);
      setTimeout(() => {
        setSuccess('Successfully created');
        setLoading(false);
      }, 5000);
    } else {
      console.log('Response: failed:', 'Provided credentials are not correct');
    }
  };

  
  const handleAddEducation = () => {
    const educationToAdd = useCustomInput ? customEducation : newEducation;
    if (educationToAdd) {
      setEducation([...education, educationToAdd]);
      setNewEducation('');
      setCustomEducation('');
      setUseCustomInput(false);
    }
  };
  const handleDeleteEducation = (index) => {
    const updatedEducation = education.filter((_, i) => i !== index);
    setEducation(updatedEducation);
  };

  const handleChangeeducation = (e) => {
    setNewEducation(e.target.value);
  };

  const handleChangeCustomEducation = (e) => {
    setCustomEducation(e.target.value);
  };

  const toggleInputMethod = () => {
    setUseCustomInput(!useCustomInput);
    setNewEducation('');
    setCustomEducation('');
  };
  



  const handleAddExperience = () => {
    if (newExperience.trim() !== '' && newYears.trim() !== '') {
      const years = parseInt(newYears, 10);
      if (!isNaN(years)) {
        setExperiences([...experiences, { experience: newExperience, years }]);
        setNewExperience('');
        setNewYears('');
      } else {
        console.log("Please enter a valid number for years.");
      }
    } else {
      console.log("Please enter both experience and years.");
    }
  };
  
  const handleDeleteExperience = (index) => {
    const newExperienceList = experiences.filter((_, i) => i !== index);
    setExperiences(newExperienceList);
  };
  
  const handleExperienceChange = (event) => {
    setNewExperience(event.target.value);
  };
  
  const handleYearsChange = (event) => {
    const value = event.target.value;
    // Allow only numbers and limit to 2 digits
    if (/^\d{0,2}$/.test(value)) {
      setNewYears(value); // Update state or handle value
    }
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

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const navbarStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => navigate('/home'), 500);

  };

  const educationOptions = [
    'College Graduate',
    'College Level',
    'High School Graduate',
    'High School Level',
  ];

  return (
    <>

      <nav style={navbarStyle}>
        <div>
          <Button size="xl" className="btn-primary" color="primary" onClick={handleClick}>
            <IoMdArrowRoundBack color="light"/>
          </Button>
        </div>
        
          <Link to={process.env.PUBLIC_URL + "/home"} className="logo-link">
            <img
              className="logo-dark logo-img logo-img-lg mx-auto"
              src={NewLogo}
              alt="logo-dark"
              style={{ width: '100px', height: '200px' }} />
          </Link>
        <div style={{ width: '80px' }} />
      </nav>
    
    
      <center>
        <Head title="Resume"></Head>
        <Content>
          <BlockHead size="sm">
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle page></BlockTitle>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          {success && (
            <div className="mb-3">
              <Alert color="success" className="alert-icon">
                <Icon name="alert-circle" /> {success}
              </Alert>
            </div>
          )}
          <Card className="card-bordered mb-20px form-container text-start" style={{ border: '1px solid ##088e54', borderLeft: '5px solid #088e54' }}>
          <PreviewAltCard>
            <div className="p-2">
              <h3> Personal Information</h3>
              <Form className="mt-4" onSubmit={handleSubmit(handleFormSubmit)}>
                <Row className="g-gs">
                  <Col md="6">
                    <label className="form-label">Profile picture</label>
                    <PreviewAltCard>
                      <div className="card-title-group align-start mb-0">
                        <div className="card-title">
                          <h6 className="subtitle">Upload 1x1</h6>
                        </div>
                      </div>
                      <div className="card-amount">
                        <input
                          {...register('profile_picture')}
                          type="file"
                          className="form-control"
                          onChange={handleImageChange}
                          accept="image/*"
                        />
                      </div>
                    </PreviewAltCard>
                  </Col>
                  <Col md="6">
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="image-preview" />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input
                        id="first_name"
                        placeholder="Enter your first name"
                        defaultValue={profile.first_name}
                        {...register('first_name', { required: true })}
                        type="text"
                        className="form-control"
                      />
                      {errors.first_name && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input
                        id="last_name"
                        placeholder="Enter your last name"
                        defaultValue={profile.last_name}
                        {...register('last_name', { required: true })}
                        type="text"
                        className="form-control"
                      />
                      {errors.last_name && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                </Row>
                <Row>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Sex</label>
                    <select
                      className="form-control"
                      defaultValue={profile.sex}
                      {...register('gender', { required: true })}
                      id="gender"
                    >
                      <option value="">Select your Sex</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className="invalid">This field is required</p>}
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-group">
                    <label className="form-label">Contact number</label>
                    <input
                      type="text"
                      className="form-control"
                      pattern="\d{11}"
                      title="Contact number must be 11 digits"
                      maxLength="11"
                      id="contact"
                      placeholder="Enter your number"
                      {...register('contact', { required: true, pattern: /^[0-9]{11}$/ })}
                    />
                    {errors.contact && <p className="invalid">This field is required and must be 11 digits</p>}
                  </div>
                </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Birthday</label>
                      <input
                        type="date"
                        id="birthday"
                        {...register('birthday', { required: true })}
                        className="form-control"
                      />
                      {errors.birthday && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Birth Place</label>
                      <input type="text"
                        id="birth_place"
                        placeholder="Enter your birth place"
                        {...register('birth_place', { required: true })}
                        className="form-control" />
                      {errors.birth_place && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md="4"> 
                    <div className="form-group">
                      <label className="form-label">Civil Status</label>
                      <select
                        className="form-control"
                        {...register('civil_status', { required: true })}
                      >
                        <option value="">Select your Civil Status</option>
                        <option value="single">Single</option>
                        <option value="in a relationship">In a relationship</option>
                        <option value="married">Married</option>
                        <option value="separated">Separated</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                      </select>
                      {errors.civil_status && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="form-group">
                      <label className="form-label">Citizenship</label>
                      <input type="text"
                        id="citizenship"
                        placeholder="Enter your citizenship"
                        {...register('citizenship', { required: true })}
                        className="form-control" />
                      {errors.citizenship && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                  <Col md="4">
                    <div className="form-group">
                      <label className="form-label">Email</label>
                      <input type="text"
                        id="email"
                        placeholder="Enter your email address"
                        defaultValue={user.email}
                        {...register('email', { required: true })}
                        className="form-control" />
                      {errors.email && <p className="invalid">This field is required</p>}
                    </div>
                  </Col> 
                </Row>     

                <Row>
                  <Col md="6"> 
                    <div className="form-group">
                      <label className="form-label">Job Category:</label>
                      <select
                        className="form-control"
                        {...register('category', { required: true })}
                      >
                        <option value="">Select your Job Category</option>
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
                      {errors.category && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>
                  <Col md="6">
                    <div className="form-group">
                      <label className="form-label">Government ID:</label>
                      <div className="d-flex">
                        <select
                          id="gov-number-select"
                          onChange={handleSelectChange}
                          className="form-control me-2"
                          value={selectedOption}
                        >
                          <option value="">Select your Government ID:</option>
                          <option value="sss">SSS Number</option>
                          <option value="pagibig">Pag-IBIG Number</option>
                          <option value="philhealth">PhilHealth Number</option>
                          <option value="tin">TIN Number</option>
                        </select>
                        {/* ${selectedOption.replace(/([A-Z])/g, ' $1').trim()} */}
                        {selectedOption && (
                          <input
                            type="text"
                            id={selectedOption}
                            placeholder={`Enter your ID number`}
                            {...register(selectedOption, { required: true })}
                            className="form-control"
                          />
                        )}
                      </div>
                      {errors[selectedOption] && <p className="invalid mt-2">This field is required</p>}
                    </div>
                  </Col>     
                </Row>


                <Row>
                  <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Address No.</label>
                        <input type="text"
                          id="address"
                          placeholder="Enter your address no."
                          {...register('address', { required: true })}
                          className="form-control" />
                        {errors.address && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Street</label>
                          <input
                            type="text"
                            id="street"
                            {...register('street', { required: true })}
                            placeholder="Enter your street"
                            className="form-control" />
                          {errors.street && <p className="invalid">This field is required</p>}
                        </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Barangay</label>
                        <input
                          type="text"
                          id="barangay"
                          {...register('barangay', { required: true })}
                          placeholder="Enter your barangay"
                          className="form-control" />
                        {errors.barangay && <p className="invalid">This field is required</p>}                  
                      </div>
                    </Col>
                  </Row>
                  {/* className="g-gs" */}
                  <Row>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">City</label>
                        <input
                          type="text"
                          id="city"
                          {...register('city', { required: true })}
                          placeholder="Enter your city"
                          className="form-control" />
                        {errors.city && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Province</label>
                        <input
                          type="text"
                          id="province"
                          {...register('province', { required: true })}
                          placeholder="Enter your province"
                          className="form-control" />
                        {errors.province && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Region</label>
                        <select
                        className="form-control"
                        {...register('region', { required: true })}
                      >
                        <option value="">Select your Region</option>
                        <option value="Region I">Region I</option>
                        <option value="Region II">Region II</option>
                        <option value="Region III">Region III</option>
                        <option value="Region IV">Region IV</option>
                        <option value="MIMAROPA Region">MIMAROPA Region</option>
                        <option value="Region V">Region V</option>
                        <option value="Region VI">Region VI</option>
                        <option value="Region VII">Region VII</option>
                        <option value="Region VIII">Region VIII</option>
                        <option value="Region IX">Region IX</option>
                        <option value="Region X">Region X</option>
                        <option value="Region XI">Region XI</option>
                        <option value="Region XII">Region XII</option>
                        <option value="Region XIII">Region XIII</option>
                        <option value="NCR">NCR</option>
                        <option value="CAR">CAR</option>
                        <option value="BARMM">BARMM</option>
                      </select>
                      {errors.region && <p className="invalid">This field is required</p>}
                    </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Country</label>
                        <input
                          type="text"
                          id="country"
                          {...register('country', { required: true })}
                          placeholder="Enter your country"
                          className="form-control" />
                        {errors.country && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Zip code</label>
                        <input
                          type="text"
                          id="zipcode"
                          {...register('zipcode', { required: true })}
                          placeholder="Enter your zipcode"
                          className="form-control" />
                        {errors.zipcode && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label d-flex align-items-center">
                          Educational Attainment
                          <Button
                            type="button"
                            color="secondary"
                            className="ms-2 d-none d-md-block" // Show only on medium and larger screens
                            onClick={toggleInputMethod}
                          >
                            {useCustomInput ? 'Dropdown' : 'Input'}
                          </Button>
                          <Button
                            type="button"
                            color="secondary"
                            className="ms-2 d-block d-md-none" // Show only on small screens
                            onClick={toggleInputMethod}
                          >
                            {useCustomInput ? 'Drop' : 'Input'}
                          </Button>
                        </label>
                        {education.map((exp, index) => (
                          <div key={index} className="mb-2 d-flex align-items-center">
                            <input type="text" className="form-control mt-2" value={exp} readOnly />
                            <Button
                              type="button"
                              color="danger"
                              className="ms-2"
                              onClick={() => handleDeleteEducation(index)}
                              style={{ marginTop: '11px' }}
                            >
                              x
                            </Button>
                          </div>
                        ))}
                        <div className="d-flex align-items-center mt-2">
                          <div className="flex-grow-1 d-flex align-items-center">
                            {useCustomInput ? (
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Educational Attainment"
                                value={customEducation}
                                onChange={handleChangeCustomEducation}
                              />
                            ) : (
                              <select
                                className="form-control"
                                value={newEducation}
                                onChange={handleChangeeducation}
                              >
                                <option value="">Select Educational Attainment</option>
                                {educationOptions.map((option, index) => (
                                  <option key={index} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                          <Button
                            type="button"
                            color="primary"
                            className="ms-2 d-none d-md-block" // Show only on medium and larger screens
                            onClick={handleAddEducation}
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            color="primary"
                            className="ms-2 d-block d-md-none" // Show only on small screens
                            onClick={handleAddEducation}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </Col>

                    


                    <Col md="6">
                      <div className="form-group">
                        <label className="form-label" style={{marginTop: '20px'}}>Experience</label>
                        {experiences.map((exp, index) => (
                          <div key={index} className="mb-2 d-flex align-items-center">
                            <input type="text" className="form-control mt-2" value={exp.experience} readOnly />
                            <input
                              type="number"
                              className="form-control mt-2 ms-2"
                              value={exp.years}
                              readOnly
                            />
                            <Button
                              type="button"
                              color="danger"
                              className="ms-2"
                              onClick={() => handleDeleteExperience(index)}
                              style={{ marginTop: '11px' }}
                            >
                              x
                            </Button>
                          </div>
                        ))}
                        <div className="d-flex align-items-center mt-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Add Experience"
                            value={newExperience}
                            onChange={handleExperienceChange}
                          />
                          <input
                            type="number"
                            className="form-control ms-2"
                            placeholder="Years"
                            value={newYears}
                            onChange={handleYearsChange}
                            max="99" // Limits the maximum value to 99
                            min="0"  // Limits the minimum value to 0
                            step="1" // Ensures only integer values are allowed
                          />
                          <Button
                            type="button"
                            color="primary"
                            onClick={handleAddExperience}
                            className="ms-2 d-none d-md-block"
                          >
                            Add
                          </Button>
                          <Button
                            type="button"
                            color="primary"
                            onClick={handleAddExperience}
                            className="ms-2 d-block d-md-none"
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </Col>



                  </Row>
                  <br></br><br></br>
                  <Row className="mt-3">
                    <Col xs="12">
                      <div className="d-flex justify-content-between">
                        <Button
                          color="secondary"
                          size="lg"
                          className="btn-large"
                          onClick={() => navigate(`${process.env.PUBLIC_URL}/reg-job`)}
                        >
                          <IoMdArrowRoundBack size={20} /> Back
                        </Button>
                        <Button
                          type="submit"
                          color="primary"
                          size="lg"
                          className="btn-large"
                        >
                          {loading ? <Spinner size="sm" color="light" /> : "Submit"}
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  
              </Form>
            </div>
          </PreviewAltCard>
        </Card>
      </Content>
      </center>
    </>
  );
};

export default TransListCrypto;
