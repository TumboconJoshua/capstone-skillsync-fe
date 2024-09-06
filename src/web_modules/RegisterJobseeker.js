import React, { useState, useEffect } from "react";
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
import Swal from 'sweetalert2';

const RegisterJobseeker = () => {
  const [passState, setPassState] = useState(false);
  const [confirmPassState, setConfirmPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorVal, setError] = useState('');
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (errorVal) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorVal,
        confirmButtonText: 'OK',
      }).then(() => setError("")); 
    }
  }, [errorVal]);

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
