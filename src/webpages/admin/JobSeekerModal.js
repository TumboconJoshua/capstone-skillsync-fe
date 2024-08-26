import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

const JobSeekerModal = ({ jobSeeker, isOpen, toggle }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Job Seeker Details</ModalHeader>
      <ModalBody>
        {/* Display job seeker details here */}
        <p>User ID: {jobSeeker.id}</p>
        <p>First Name: {jobSeeker.first_name}</p>
        <p>Last Name: {jobSeeker.last_name}</p>
        {/* <p>Middle Name: {jobSeeker.middle_name}</p> */}
        {/* Add more details if needed */}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>Close</Button>
      </ModalFooter>
    </Modal>
  );
};

export default JobSeekerModal;
