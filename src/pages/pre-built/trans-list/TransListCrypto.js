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
                    <span className="text-muted"
                      style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-34px', marginLeft: '23%' }}
                    >(Required)</span>
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
                      <label className="form-label">First Name
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span></label>
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
                      <label className="form-label">Last Name
                      <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                      </label>
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
                    <label className="form-label">Sex
                    <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                    </label>
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
                    <label className="form-label">Contact number
                    <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      pattern="\d{11}"
                      title="Contact number must be 11 digits"
                      maxLength="11"
                      id="contact"
                      placeholder="ex. 09123456789"
                      {...register('contact', { required: true, pattern: /^[0-9]{11}$/ })}
                    />
                    {errors.contact && <p className="invalid">This field is required and must be 11 digits</p>}
                  </div>
                </Col>
                </Row>
                <Row>
                <Col md="6">
                    <div className="form-group">
                      <label className="form-label">
                        Birthday
                        <span className="text-muted" style={{ fontSize: '10px' }}> (required)</span>
                      </label>
                      <input
                        type="date"
                        id="birthday"
                        max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                        {...register('birthday', {
                          required: true,
                          validate: (value) => {
                            const today = new Date();
                            const birthDate = new Date(value);
                            const age = today.getFullYear() - birthDate.getFullYear();
                            const monthDiff = today.getMonth() - birthDate.getMonth();
                            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                              return age - 1 >= 18;
                            }
                            return age >= 18;
                          }
                        })}
                        className="form-control"
                      />
                      {errors.birthday && errors.birthday.type === 'required' && (
                        <p className="invalid">This field is required</p>
                      )}
                      {errors.birthday && errors.birthday.type === 'validate' && (
                        <p className="invalid">You must be at least 18 years old</p>
                      )}
                    </div>
                  </Col>

                  <Col md="6">
                      <div className="form-group">
                        <label className="form-label">Birth Place
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
                        <input
                          type="text"
                          id="birth_place"
                          {...register('birth_place', { required: true })}
                          placeholder="Enter your birthplace"
                          className="form-control" />
                        {errors.birth_place && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>

                </Row>
                <Row>
                  <Col md="4"> 
                    <div className="form-group">
                      <label className="form-label">Civil Status
                      <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                      </label>
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
                      <label className="form-label">
                        Citizenship
                        <span className="text-muted" style={{ fontSize: '10px' }}> (Required)</span>
                      </label>
                      <select
                        id="citizenship"
                        {...register('citizenship', { required: true })}
                        className="form-control"
                      >
                        <option value="" disabled selected>
                          Select your citizenship
                        </option>
                        <option value="American">American</option>
                        <option value="Canadian">Canadian</option>
                        <option value="British">British</option>
                        <option value="Australian">Australian</option>
                        <option value="Indian">Indian</option>
                        <option value="Filipino">Filipino</option>
                        <option value="German">German</option>
                        <option value="French">French</option>
                        <option value="Italian">Italian</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Brazilian">Brazilian</option>
                        <option value="South African">South African</option>
                        <option value="South Korean">South Korean</option>
                        <option value="Russian">Russian</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Swedish">Swedish</option>
                        
                      </select>
                      {errors.citizenship && <p className="invalid">This field is required</p>}
                    </div>
                  </Col>

                  <Col md="4">
                    <div className="form-group">
                      <label className="form-label">Email
                      <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                      </label>
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
                      <label className="form-label">Job Category:
                      <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                      </label>
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
                        <label className="form-label">Pag-Ibig No.
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                        </label>
                        <input type="number"
                          id="pagibig"
                          placeholder="Enter your Pag-Ibig no."
                          {...register('pagibig', { required: false })}
                          className="form-control" />
                        {errors.pagibig && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                </Row>
                <Row>
                <Col md="4">
                      <div className="form-group">
                        <label className="form-label">SSS No.
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                        </label>
                        <input type="number"
                          id="sss"
                          placeholder="Enter your SSS no."
                          {...register('sss', { required: false })}
                          className="form-control" />
                        {errors.sss && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Philhealth No.
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                        </label>
                        <input type="number"
                          id="philhealth"
                          placeholder="Enter your Philhealth no."
                          {...register('philhealth', { required: false })}
                          className="form-control" />
                        {errors.philhealth && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Tin No.
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                        </label>
                        <input type="number"
                          id="tin"
                          placeholder="Enter your Tin no."
                          {...register('tin', { required: false })}
                          className="form-control" />
                        {errors.tin && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                </Row>


                <Row>
                  <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Address No.
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
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
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
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
                        <label className="form-label">Barangay
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
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
                        <label className="form-label">City
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
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
                        <label className="form-label">Province
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
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
                        <label className="form-label">Region
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
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
                        <label className="form-label">
                          Country
                          <span className="text-muted" style={{ fontSize: '10px' }}> (Required)</span>
                        </label>
                        <select
                          id="country"
                          {...register('country', { required: true })}
                          className="form-control"
                        >
                          <option value="" disabled selected>
                            Select your country
                          </option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Australia">Australia</option>
                          <option value="India">India</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="Brazil">Brazil</option>
                          <option value="China">China</option>
                          <option value="Japan">Japan</option>
                          <option value="South Korea">South Korea</option>
                          <option value="Mexico">Mexico</option>
                          <option value="Russia">Russia</option>
                          <option value="South Africa">South Africa</option>
                          <option value="Italy">Italy</option>
                          <option value="Netherlands">Netherlands</option>
                          <option value="Spain">Spain</option>
                          <option value="Sweden">Sweden</option>
                          <option value="Philippines">Philippines</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Belgium">Belgium</option>
                          <option value="Chile">Chile</option>
                          <option value="Denmark">Denmark</option>
                          <option value="Egypt">Egypt</option>
                          <option value="Finland">Finland</option>
                          <option value="Greece">Greece</option>
                          <option value="Hong Kong">Hong Kong</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Ireland">Ireland</option>
                          <option value="Malaysia">Malaysia</option>
                          <option value="New Zealand">New Zealand</option>
                          <option value="Norway">Norway</option>
                          <option value="Poland">Poland</option>
                          <option value="Portugal">Portugal</option>
                          <option value="Saudi Arabia">Saudi Arabia</option>
                          <option value="Switzerland">Switzerland</option>
                          <option value="Thailand">Thailand</option>
                          <option value="Turkey">Turkey</option>
                          <option value="United Arab Emirates">United Arab Emirates</option>

                          {/* Add more countries as needed */}
                        </select>
                        {errors.country && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>

                    <Col md="4">
                      <div className="form-group">
                        <label className="form-label">Zip code
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
                        <input
                          type="number"
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
                        <label className="form-label">
                          Educational Attainment
                          <span className="text-muted" style={{ fontSize: '10px' }}> (Optional)</span>
                        </label>
                        <select
                          id="educational_attainment"
                          {...register('educational_attainment', { required: true })}
                          className="form-control"
                        >
                          <option value="" disabled selected>
                            Select your educational attainment
                          </option>
                          <option value="College Graduate">College Graduate</option>
                          <option value="College Level">College Level</option>
                          <option value="High School Graduate">High School Graduate</option>
                          <option value="High School Level">High School Level</option>
                        </select>
                        {errors.educational_attainment && <p className="invalid">This field is required</p>}
                      </div>  
                    </Col>
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label">Experience
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
                        <input
                          type="text"
                          id="experience"
                          {...register('experience', { required: true })}
                          placeholder="Enter your experience"
                          className="form-control" />
                        {errors.experience && <p className="invalid">This field is required</p>}
                      </div>
                    </Col>
                    <Col md="3">
                      <div className="form-group">
                        <label className="form-label">Experience Years
                        <span className="text-muted" style={{ fontSize: '10px'}}> (Required)</span>
                        </label>
                        <input
                          type="text"
                          id="experience_years"
                          {...register('experience_years', { required: true })}
                          placeholder="ex. 2021 - 2022"
                          className="form-control" />
                        {errors.experience_years && <p className="invalid">This field is required</p>}
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
