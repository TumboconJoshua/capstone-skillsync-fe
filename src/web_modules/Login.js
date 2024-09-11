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
import { Form, Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL  } from "./axios/auth";

import ApiService from './base/axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Card } from "reactstrap";
import "../web_modules/navbar/Services.css";
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorVal, setError] = useState("");
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

  const onFormSubmit = async (formData) => {
    setLoading(true);
    var apiService = new ApiService(BASE_URL);

    apiService.authenticate(formData.email, formData.password)
        .then(response => {
            console.log(response);

            localStorage.setItem('role', response.data.role);
            localStorage.setItem('accessToken', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            localStorage.setItem('contact', JSON.stringify(response.data.contact));
            localStorage.setItem('fullname', response.data.fullname);
            localStorage.setItem('Education',  JSON.stringify(response.data.educational_attainment));
            localStorage.setItem('Experience', JSON.stringify(response.data.experience));
            localStorage.setItem('profile', response.data.profile);

            // Show Swal notification on successful login
            Swal.fire({
                icon: 'success',
                title: 'Login Successful!',
                text: 'Welcome, ' + response.data.fullname,
                confirmButtonText: 'Continue',
            }).then(() => {
                if (response.data.role !== 'Employer') {
                    window.history.pushState(
                        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/general-page"}`,
                        "auth-login",
                        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/general-page"}`
                    );
                } else {
                    window.history.pushState(
                        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/job-dashboard"}`,
                        "auth-login",
                        `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/job-dashboard"}`
                    );
                }
                window.location.reload();
            });

            setLoading(false);
        })
        .catch(error => {
            setLoading(false);
            setTimeout(() => {
                console.log(error.response.data.data);
                var errors = error.response.data.data;
                var errorString = errors[0];
                setError(errorString);
            }, 1000);
        });
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


  const {  register, handleSubmit, formState: { errors } } = useForm();

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
      
    <Head title="Login" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
      <Card className="card-bordered" style={{ border: '1px solid ##088e54', margin: '10px', borderLeft: '5px solid #088e54' }}>
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Sign-In</BlockTitle>
              <BlockDes>
                <p>Access account using your email and password.</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="email">
                  Email:
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="email"
                  id="email"
                  {...register('email', { required: "This field is required" })}
                  defaultValue=""
                  placeholder="Enter your email"
                  className="form-control-lg form-control" />
                {errors.email && <span className="invalid">{errors.email.message}</span>}
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
                  
                >
                <Icon name={passState ? "eye" : "eye-off"} className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}/>  
                  
                </a>
                <input
                  type={passState ? "text" : "password"}
                  id="password"
                  {...register('password', { required: "This field is required" })}
                  defaultValue=""
                  placeholder="Enter your password"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password && <span className="invalid">{errors.password.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loading ? <Spinner size="sm" color="light" /> : "Sign in"}
              </Button>
            </div>
          </Form>
          
          <div className="form-note-s2 text-center pt-4">
            {" "}
            Don't have an account?{" "} <br/>
            <Link to={`${process.env.PUBLIC_URL}/reg-job`}>
              <strong>Sign Up as Job Seeker</strong>
            </Link>
          </div>
        </PreviewCard>
      </Card>
    </Block>
  </>;
};
export default Auth;
