import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/logo.png";
import LogoDark from "../images/logo-dark.png";
import Head from "../layout/head/Head";
import AuthFooter from "../pages/auth/AuthFooter";
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
import { Spinner, Alert } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { BASE_URL  } from "./axios/auth";
import axios from "axios";
const RegisterEmployer = () => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorVal, setError] = useState("");
  const navigate = useNavigate();
  const handleFormSubmit = async (formData) => {
    setLoading(true);

    try {
      // Make an API request to register employer
      const response = await axios.post(BASE_URL + '/register', formData);

      // Check for success based on your API response structure
      if (response.data && response.data.data) {
        navigate(`${process.env.PUBLIC_URL}/auth`);
      } else {
        // Handle registration failure
        setError(response.message);
        console.log('Registration failed:', response.data.error);
      }
    } catch (error) {
      // Handle any other errors during registration
      setError(error.message);
      console.log('Registration error:', error);


    } finally {
      setLoading(false);
    }
  };
  return <>
    <Head title="Register" />
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Register</BlockTitle>
              <BlockDes>
                <p>Create New Account Employer</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>

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
                First Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="first_name"
                  {...register('first_name', { required: true })}
                  placeholder="Enter your name"
                  className="form-control-lg form-control" />
                {errors.first_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="last_name">
                Last Name
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="last_name"
                  {...register('last_name', { required: true })}
                  placeholder="Enter your name"
                  className="form-control-lg form-control" />
                {errors.last_name && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="sex">
                Sex
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="sex"
                  {...register('sex', { required: true })}
                  placeholder="Enter your sex"
                  className="form-control-lg form-control" />
                {errors.sex && <p className="invalid">This field is required</p>}
              </div>
            </div>
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
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="address">
                Address
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="address"
                  {...register('address', { required: true })}
                  placeholder="Enter your sex"
                  className="form-control-lg form-control" />
                {errors.address && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="company">
                Company
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="company"
                  {...register('company', { required: true })}
                  placeholder="Enter your company"
                  className="form-control-lg form-control" />
                {errors.company && <p className="invalid">This field is required</p>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="position">
                Position
              </label>
              <div className="form-control-wrap">
                <input
                  type="text"
                  id="position"
                  {...register('position', { required: true })}
                  placeholder="Enter your position"
                  className="form-control-lg form-control" />
                {errors.position && <p className="invalid">This field is required</p>}
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
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Email or Username
                </label>
              </div>
              <div className="form-control-wrap">
                <input
                  type="email"
                  bssize="lg"
                  id="default-01"
                  {...register('email', { required: true })}
                  className="form-control-lg form-control"
                  placeholder="Enter your email address or username" />
                {errors.email && <p className="invalid">This field is required</p>}
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Passcode
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
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
                {errors.password && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>

            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Confirm Passcode
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
                  placeholder="Enter your passcode"
                  className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`} />
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
      </Block>
      <AuthFooter />
  </>;
};
export default RegisterEmployer;
