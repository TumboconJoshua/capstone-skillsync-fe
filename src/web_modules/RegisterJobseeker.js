import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewLogo from "./skillsync.png";
import Head from "../layout/head/Head";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../components/Component";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL  } from "./axios/auth";
import axios from "axios";
import { Card } from "reactstrap";

const RegisterJobseeker = () => {
  const [passState, setPassState] = useState(false);
  const [confirmPassState, setConfirmPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorVal, setError] = useState('');
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const handleFormSubmit = async (formData) => {
    setLoading(true);

    try {

      const response = await axios.post(BASE_URL + '/register-jobseeker', formData);
      console.log(response);
      // Check for success based on your API response structure
      if (response.data && response.data.data) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('contact', JSON.stringify(response.data.data.contact));

        // navigate(`${process.env.PUBLIC_URL}/auth`);
        navigate(`${process.env.PUBLIC_URL}/resume`);
         
        
      } else {
        // Handle registration failure
        console.log('Response: failed:', response.data);
        setError(response.data);
      }
    } catch (error) {
      // Handle any other errors during registration
      setError(error.message);
      console.log('Response: error:', error);


    } finally {
      setLoading(false);
    }
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
  
  return <>
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
              style={{ width: '70px', height: '200px' }} />
          </Link>
        <div style={{ width: '80px' }} />
      </nav>

      
    <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
      <Card className="card-bordered" style={{ border: '1px solid ##088e54', margin: '10px', borderLeft: '5px solid #088e54' }}>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Create New Account as Job Seeker</p>
              </BlockDes>
            </BlockContent>
          

          {errorVal && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" />{errorVal}
              </Alert>
            </div>
          )}
          <form className="is-alter" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label className="form-label" htmlFor="first_name">
                First Name:
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name', { required: true })}
                  placeholder="Enter your first name"
                  className="form-control-lg form-control" />
                {errors.first_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            {/* <div className="form-group">
              <label className="form-label" htmlFor="middle_name">
                Middle Name (Optional)
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="middle_name"
                  placeholder="Enter your middle name"
                  className="form-control-lg form-control" />
              </div>
            </div> */}
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">
                Last Name:
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name', { required: true })}
                  placeholder="Enter your last name"
                  className="form-control-lg form-control" />
                {errors.last_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            {/* <div className="form-group">
              <label className="form-label" htmlFor="extension_name">
                Extension Name
              </label>
              <select
                  id="extension_name"
                  {...register('extension_name', { required: true })}
                  className="form-control-lg form-control"
                >
                  <option value="N/A">N/A</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="Jr.">Jr.</option>
                  <option value="Sr.">Sr.</option>
              </select>
            </div> */}
            {/* <div className="form-group">
              <label className="form-label" htmlFor="sex">
                Sex
              </label>
              <select
                  id="sex"
                  {...register('sex', { required: true })}
                  className="form-control-lg form-control"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
              </select>
            </div> */}
            {/* <div className="form-group">
              <label className="form-label" htmlFor="age">
                Age
              </label>
              <div className="form-control-wrap">
                <input
                  type="number"
                  id="age"
                  {...register('age', { required: true,min: 21,max: 60 })}
                  placeholder="Enter your age"
                  className="form-control-lg form-control" />
                {errors.age && errors.age.type === "required" && (
                    <p className="invalid">This field is required</p>
                )}
                {errors.age && errors.age.type === "min" && (
                    <p className="invalid">Age must be at least 21 years old</p>
                )}
                {errors.age && errors.age.type === "max" && (
                    <p className="invalid">Age must be less than or equal to 60 years old</p>
                )}
              </div>
            </div> */}
          {/* 
             <div className="form-group">
              <label className="form-label" htmlFor="contact_number">
                Contact #
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="contact_number"
                  {...register('contact_number', { required: true })}
                  placeholder="Enter your #"
                  className="form-control-lg form-control" />
                {errors.contact_number && <p className="invalid">This field is required</p>}
              </div>
            </div> *

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="address"
                  {...register('address', { required: true })}
                  placeholder="Enter your address"
                  className="form-control-lg form-control" />
                {errors.address && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="street">
              Street
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="street"
                  {...register('street', { required: true })}
                  placeholder="Enter your street"
                  className="form-control-lg form-control" />
                {errors.street && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="barangay">
              Barangay
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="barangay"
                  {...register('barangay', { required: true })}
                  placeholder="Enter your barangay"
                  className="form-control-lg form-control" />
                {errors.barangay && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="province">
              Province
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="province"
                  {...register('province', { required: true })}
                  placeholder="Enter your province"
                  className="form-control-lg form-control" />
                {errors.province && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="region">
              Region
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="region"
                  {...register('region', { required: true })}
                  placeholder="Enter your region"
                  className="form-control-lg form-control" />
                {errors.region && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="country">
              Country
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="country"
                  {...register('country', { required: true })}
                  placeholder="Enter your country"
                  className="form-control-lg form-control" />
                {errors.country && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="zipcode">
              Zipcode
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="zipcode"
                  {...register('zipcode', { required: true })}
                  placeholder="Enter your zipcode"
                  className="form-control-lg form-control" />
                {errors.zipcode && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="educational_attainment">
                Educational Attainment
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="educational_attainment"
                  {...register('educational_attainment', { required: true })}
                  placeholder="Enter your education"
                  className="form-control-lg form-control" />
                {errors.educational_attainment && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="experience">
              Experience
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="experience"
                  {...register('experience', { required: true })}
                  placeholder="Enter your experience"
                  className="form-control-lg form-control" />
                {errors.experience && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="birthdate">
                Birthdate
              </label>
              <div className="form-control-wrap">
                <input
                  type="date"
                  id="birthdate"
                  {...register('birthdate', { required: true })}
                  placeholder="Enter your birthdate"
                  className="form-control-lg form-control" />
                {errors.birthdate && <p className="invalid">This field is required</p>}
              </div>
            </div> */}
            
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email:
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="email"
                  bssize="lg"
                  id="default-01"
                  {...register('email', { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email" />
                {errors.email && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>
                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('password', { required: "This field is required" })}
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                />
                {errors.password && <span className="invalid">{errors.password.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password_confirmation">
                  Confirm Password:
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password_confirmation"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setConfirmPassState(!confirmPassState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${confirmPassState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>
                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={confirmPassState ? "text" : "password"}
                  id="password_confirmation"
                  {...register('password_confirmation', { required: "This field is required" })}
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${confirmPassState ? "is-hidden" : "is-shown"}`}
                />
                {errors.password_confirmation && <span className="invalid">{errors.password_confirmation.message}</span>}
              </div>
            </div>



            {/* <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Password:
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('password', { required: "This field is required" })}
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password && <span className="invalid">{errors.password.message}</span>}
              </div>
            </div>


            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Confirm Password:
                </label>
              </div>
              <div className="form-control-wrap">
                <a
                  href="#password_confirmation"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setPassState(!passState);
                  }}
                  className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password_confirmation"
                  {...register('password_confirmation', { required: "This field is required" })}
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password_confirmation && <span className="invalid">{errors.password_confirmation.message}</span>}
              </div>
            </div> */}


            {/* <div className="form-group">
                <label className="form-label" htmlFor="job_category">
                    Job Category
                </label>
                <select
                    id="job_category"
                    {...register('job_category', { required: true })}
                    className="form-control-lg form-control"
                    defaultValue="" // Set default value to an empty string
                >
                    <option value="" disabled>Select job category</option>
                 
                    {[
                    { id: 1, name: 'Office Work' },
                    { id: 2, name: 'Production' },
                    { id: 3, name: 'Skilled' },
                    { id: 4, name: 'Hospitality' },
                    { id: 5, name: 'BPO' },
                    { id: 6, name: 'Logistic' },
                    { id: 7, name: 'Construction' },
                    { id: 8, name: 'Delivery Service' },
                    { id: 9, name: 'Distributor' },
                    { id: 10, name: 'Government Institute' },
                    { id: 11, name: 'Heavy Equipment' },
                    { id: 12, name: 'IT Solutions' },
                    { id: 13, name: 'Language School' },
                    { id: 14, name: 'Manufacturing' },
                    { id: 15, name: 'Mining' },
                    { id: 16, name: 'Real State' },
                    { id: 17, name: 'Retail' },
                    { id: 18, name: 'Seaport' },
                    { id: 19, name: 'Shipyard' },
                    { id: 20, name: 'Trucking' },
                    { id: 21, name: 'Wholesale Trade' }
                    ].map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.job_category && <p className="invalid">Please select a job category</p>}
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="resume">
                Resume
              </label>
              <div className="form-control-wrap">
                <input
                  type="file"
                  id="resume"
                  {...register('resume', { required: true })}
                  className="form-control-lg form-control"
                  onChange={(e) => setValue("resume", e.target.files)} // Set value for resume input field
                />
                {errors.resume && <p className="invalid">Please upload your resume</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="profile_picture">
                Profile Picture
              </label>
              <div className="form-control-wrap">
                <input
                  type="file"
                  id="profile_picture"
                  {...register('profile_picture', { required: true })}
                  className="form-control-lg form-control"
                  onChange={(e) => setValue("profile_picture", e.target.files)} // Set value for resume input field
                />
                {errors.profile_picture && <p className="invalid">Please upload your profile picture</p>}
              </div>
            </div> */}
            <div className="form-group">
              <Button type="submit" color="primary" size="lg" className="btn-block">
                {loading ? <Spinner size="sm" color="light" /> : "Register"}
              </Button>
             
            </div>
          </form>
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/auth`}>
              <strong>Sign in instead</strong>
            </Link>
          </div>
        </PreviewCard>
      </Card>
    </Block>
  </>;
};
export default RegisterJobseeker;
