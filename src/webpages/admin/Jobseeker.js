import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  PreviewCard,
} from "../../components/Component";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
import JobSeekerModal from "./JobSeekerModal";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";

const Jobseeker = ({ ...props }) => {
  // State to hold the job seekers data
  const [jobSeekers, setJobSeekers] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  // State to hold the currently selected job seeker
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);

  // Function to handle opening the modal
  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setSelectedJobSeeker(null);
    setModalOpen(false);
  };

  // Effect hook to fetch job seekers data when the component mounts
  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Function to fetch job seekers data from the server
  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobseekers`);
      setJobSeekers(response.data.data);
    } catch (error) {
      console.error('Error fetching job seekers:', error);
    }
  };

  const categories = [
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
];

const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
}, {});

  return (
    <>
      <Head title="Job Seekers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Jobseekers Table</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Job Category</th>
                  
                  {/* <th>Action</th> */}
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {jobSeekers.map(jobSeeker => (
                  <tr key={jobSeeker.id}>
                    <td>{jobSeeker.id}</td>
                    <td>{jobSeeker.first_name}</td>
                    <td>{jobSeeker.last_name}</td>
                    <td>{categoryMap[jobSeeker.category_id] || 'Unknown Category'}</td>
                    
                    {/* <td>
                      <Button color="primary" onClick={() => openModal(jobSeeker)}>View</Button>
                    </td> */}
                    {/* Add more columns if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)}>
            <ModalHeader toggle={() => setModalOpen(false)}>Job Seeker Details</ModalHeader>
            <ModalBody>
              {/* Display job seeker details here */}
              {selectedJobSeeker && (
                <>
                  <div>
                    <style>
                      {`
                      table {
                        width: 100%;
                        border-collapse: collapse;
                      }
                      table, th, td {
                        border: 1px solid black;
                      }
                      th, td {
                        padding: 8px;
                        text-align: left;
                      }
                      th {
                        background-color: #f2f2f2;
                      }
                    `}
                    </style>
                    <table>
                      <thead>
                        <tr>
                          <th>Field</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* <tr>
                      <td>User ID</td>
                      <td>{selectedJobSeeker.id}</td>
                    </tr> */}
                        <tr>
                          <td>First Name</td>
                          <td>{selectedJobSeeker.first_name}</td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>{selectedJobSeeker.last_name}</td>
                        </tr>
                        {/* <tr>
                          <td>Middle Name</td>
                          <td>{selectedJobSeeker.middle_name}</td>
                        </tr> */}
                        <tr>
                          <td>Extension Name</td>
                          <td>{selectedJobSeeker.extension_name}</td>
                        </tr>
                        <tr>
                          <td>Sex</td>
                          <td>{selectedJobSeeker.sex}</td>
                        </tr>
                        <tr>
                          <td>Birthdate</td>
                          <td>{selectedJobSeeker.birthdate}</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>{selectedJobSeeker.address}</td>
                        </tr>
                        <tr>
                          <td>Contact Number</td>
                          <td>{selectedJobSeeker.contact_number}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <br />

                  <a href={`http://localhost:8000/api/${selectedJobSeeker.resume}`} target="_blank" rel="noreferrer noopener">View Resume</a>

                </>
              )}
              {/* Add more details if needed */}
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={() => setModalOpen(false)}>Close</Button>
            </ModalFooter>
          </Modal>
        </Block>
      </Content>
    </>
  );
};

export default Jobseeker;
