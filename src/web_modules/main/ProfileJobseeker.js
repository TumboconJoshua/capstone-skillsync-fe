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
    Spinner,
  } from "reactstrap";

import { BASE_URL  } from "../axios/auth";
import ApiService from '../base/axios';
import Swal from "sweetalert2";


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
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorVal1,
        confirmButtonText: 'OK', 
      }).then(() => setError1("")); 
    }
  }, [errorVal1]);

  useEffect(() => {
    if (errorVal2) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorVal2,
        confirmButtonText: 'OK', 
      }).then(() => setError2("")); 
    }
  }, [errorVal2]);

  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: success,
        confirmButtonText: 'OK', 
      }).then(() => setSuccess("")); 
    }
  }, [success]);

  useEffect(() => {
    if (successPass) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: successPass,
        confirmButtonText: 'OK', 
      }).then(() => setPasswordSuccess("")); 
    }
  }, [successPass]);


  useEffect(() => {
    fetchJobs();
  }, []); 

  const fetchJobs = async () => {

    setImagePreview(`http://localhost:8000` + profile.profile_picture);

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
                      <h5 className="mb-3">Basic Informations</h5>
                      <form className="is-alter" onSubmit={handleSubmitForm1(handleFormSubmit)}>
                        <Row className="mt-2">
                          
                        <Col
                            md="12"
                            style={{
                              display: 'flex',         // Enable flexbox layout
                              justifyContent: 'center', // Center horizontally
                              alignItems: 'center',     // Center vertically
                              height: '100%',           // Optional: to ensure the container has height
                            }}
                          >
                            {imagePreview ? (
                              <img 
                                src={imagePreview} 
                                alt="Preview" 
                                className="image-preview" 
                                style={{ width: '200px', height: '200px' }} // Remove flexbox properties from img
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
                         
                          <Col md="4">
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
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Birthday</label>
                              <input type="date" id="birthdate"  {...registerForm1('birthday')} defaultValue={profile.birthdate} className="form-control" />
                            </div>
                          </Col>

                          
                          <Col md="4">
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
                          
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Birth Place</label>
                              <input type="text" 
                                id="birth_place"
                                defaultValue={profile.birth_place}
                                {...registerForm1('birth_place', { required: true })}
                                placeholder="Enter your birthplace"
                                className="form-control" />
                                {errorsForm1.birth_place && <p className="invalid">This field is required</p>}
                              </div>
                          </Col>
                          <Col md="4"> 
                            <div className="form-group">
                              <label className="form-label">Civil Status
                              
                              </label>
                              <select
                                className="form-control"
                                id="civil_status"
                                defaultValue={profile.civil_status}
                                {...registerForm1('civil_status', { required: true })}
                              >
                                <option value="" disabled selected>
                                  Select your civil status
                                </option>
                                <option value="single">Single</option>
                                <option value="in a relationship">In a relationship</option>
                                <option value="married">Married</option>
                                <option value="separated">Separated</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                              </select>
                              {errorsForm1.civil_status && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">
                                Citizenship
                                
                              </label>
                              <select
                                id="citizenship"
                                defaultValue={profile.citizenship}
                                {...registerForm1('citizenship', { required: true })}
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
                              {errorsForm1.citizenship && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                        </Row>
                        <Row>

                          <Col md="4">
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
                          <Col md="4"> 
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
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Pag-Ibig No.
                              <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                              </label>
                              <input type="number"
                                id="pagibig"
                                placeholder="Enter your Pag-Ibig no."
                                defaultValue={profile.pagibig}
                                {...registerForm1('pagibig', { required: false })}
                                className="form-control" />
                              {errorsForm1.pagibig && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                        </Row>
                        <Row className="g-gs">
                        <Col md="4">
                              <div className="form-group">
                                <label className="form-label">SSS No.
                                <span className="text-muted" style={{ fontSize: '10px'}}> (Optional)</span>
                                </label>
                                <input type="number"
                                  id="sss"
                                  placeholder="Enter your SSS no."
                                  defaultValue={profile.sss}
                                  {...registerForm1('sss', { required: false })}
                                  className="form-control" />
                                {errorsForm1.sss && <p className="invalid">This field is required</p>}
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
                                  defaultValue={profile.philhealth}
                                  {...registerForm1('philhealth', { required: false })}
                                  className="form-control" />
                                {errorsForm1.philhealth && <p className="invalid">This field is required</p>}
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
                                  defaultValue={profile.tin}
                                  {...registerForm1('tin', { required: false })}
                                  className="form-control" />
                                {errorsForm1.tin && <p className="invalid">This field is required</p>}
                              </div>
                            </Col>
                        </Row>     

                       
                        <Row className="g-gs">
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Address No. </label>
                              <input type="text"
                                id="address"
                                placeholder="Enter your address no."
                                defaultValue={profile.address}
                                {...registerForm1('address', { required: true })}
                                className="form-control" />
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
                                  className="form-control" />
                                {errorsForm1.street && <p className="invalid">This field is required</p>}
                              </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Barangay
                              
                              </label>
                              <input
                                type="text"
                                id="barangay"
                                defaultValue={profile.barangay}
                                {...registerForm1('barangay', { required: true })}
                                placeholder="Enter your barangay"
                                className="form-control" />
                              {errorsForm1.barangay && <p className="invalid">This field is required</p>}                  
                            </div>
                          </Col>  
                        </Row>
                        <Row>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">City
                            
                              </label>
                              <input
                                type="text"
                                id="city"
                                defaultValue={profile.city}
                                {...registerForm1('city', { required: true })}
                                placeholder="Enter your city"
                                className="form-control" />
                              {errorsForm1.city && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Province
                          
                              </label>
                              <input
                                type="text"
                                id="province"
                                defaultValue={profile.province}
                                {...registerForm1('province', { required: true })}
                                placeholder="Enter your province"
                                className="form-control" />
                              {errorsForm1.province && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Region
                            
                              </label>
                              <select
                              className="form-control"
                              id="region"
                              defaultValue={profile.region}
                              {...registerForm1('region', { required: true })}
                            >
                              <option value="" disabled selected>
                                Select your region
                              </option>
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
                            {errorsForm1.region && <p className="invalid">This field is required</p>}
                          </div>
                          </Col>
                        </Row>

                        
                        <Row className="g-gs">
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Country </label>
                              <select
                                id="country"
                                defaultValue={profile.country}
                                {...registerForm1('country', { required: true })}
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
                              {errorsForm1.country && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>

                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Zip code
                            
                              </label>
                              <input
                                type="number"
                                id="zipcode"
                                defaultValue={profile.zipcode}
                                {...registerForm1('zipcode', { required: true })}
                                placeholder="Enter your zipcode"
                                className="form-control" />
                              {errorsForm1.zipcode && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>

                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">
                                Educational Attainment
                              </label>
                              <select
                                id="educational_attainment"
                                defaultValue={profile.educational_attainment}
                                {...registerForm1('educational_attainment', { required: true })}
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
                              {errorsForm1.educational_attainment && <p className="invalid">This field is required</p>}
                            </div>  
                          </Col>
                        </Row>
                        <Row>
                          <Col md="8">
                            <div className="form-group">
                              <label className="form-label">Experience</label>
                              <input
                                type="text"
                                id="experience"
                                defaultValue={profile.experience}
                                {...registerForm1('experience', { required: true })}
                                placeholder="Enter your work experience"
                                className="form-control" />
                              {errorsForm1.experience && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                          <Col md="4">
                            <div className="form-group">
                              <label className="form-label">Experience Years

                              </label>
                              <input
                                type="text"
                                id="experience_years"
                                defaultValue={profile.experience_years}
                                {...registerForm1('experience_years', { required: true })}
                                placeholder="ex. 2021 - 2022"
                                className="form-control" />
                              {errorsForm1.experience_years && <p className="invalid">This field is required</p>}
                            </div>
                          </Col>
                        </Row>
                        <br></br>
                        <Row className="gy-4">
                          <Col size="6">
                              <div className="form-group">
                                <Button type="submit" color="primary" size="sm" >
                                    {loading ? <Spinner size="sm" color="light" /> : "Update"}
                                </Button>
                            </div>
                          </Col>
                        </Row>
                      </form>
                      <br></br>
                    </CardBody> 
                </Card>
            </Col>
          </Row>

          

          <Row className="mt-2">
              <Col xs="12" sm="12" md="12" lg="12" xl="12">
                  <Card className="card-bordered">
                      <CardBody className="card-inner">
                          <h5 className="mb-3">Change Password</h5>

                          

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
