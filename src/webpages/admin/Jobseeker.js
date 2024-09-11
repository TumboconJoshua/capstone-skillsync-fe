import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
} from "../../components/Component";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
import Icon from "../../components/icon/Icon";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';




const Jobseeker = ({ ...props }) => {
  // State to hold the job seekers data
  const [jobSeekers, setJobSeekers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);   
  const [imagePreview, setImagePreview] = useState(null);


  const [searchTerm, setSearchTerm] = useState("");

  // Function to handle opening the modal
  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setModalOpen(true);
  
    // Fetch additional details of the selected job seeker
    axios.get(`${BASE_URL}/jobseeker/${jobSeekers.id}`)
      .then((response) => {
        const birthDate = new Date(response.data.birthdate);
        const today = new Date();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        response.data.age = age;
  
        console.log('Job Seeker Details:', response.data);
  
        // Verify the image URL
        const imageUrl = `http://localhost:8000${response.data.profile}`;
        console.log('Image URL:', imageUrl);
  
        setSelectedJobSeeker(response.data);
        setImagePreview(imageUrl);
      })
      .catch((error) => {
        console.error('Error fetching job seeker details', error);
      });
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
    { id: 16, name: 'Real Estate' },
    { id: 17, name: 'Retail' },
    { id: 18, name: 'Seaport' },
    { id: 19, name: 'Shipyard' },
    { id: 20, name: 'Trucking' },
    { id: 21, name: 'Wholesale Trade' }
  ];

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // Filter job seekers based on search term
    if (e.target.value === '' || e.target.value === null) {
      fetchJobSeekers();
    } else {
      const filteredData = jobSeekers.filter((job) =>
        job.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setJobSeekers(filteredData);
    }
  };

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
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Job Seekers Table</BlockTitle>
              </BlockHeadContent>
              <BlockHeadContent>
                
                  
                  <div className="toggle-expand-content" style={{ display: "block" }}>
                    <ul className="nk-block-tools g-3">
                      <li>
                        <div className="form-control-wrap">
                          <div className="form-icon form-icon-right">
                            <Icon name="search"></Icon>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="default-04"
                            placeholder="Quick search by Title"
                            onChange={handleSearch}
                          />
                        </div>
                      </li>
                      
                    </ul>
                  </div>
                
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                   {/*<th>User ID</th>*/}
                  <th>Full Name</th>
                  <th>Job Category</th>
                  <th>Address</th>
                  
                  <th>Action</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {jobSeekers.map(jobSeeker => (
                  <tr key={jobSeeker.id}>
                    {/*<td>{jobSeeker.id}</td>*/}
                    <td>{jobSeeker.last_name}, {jobSeeker.first_name} {jobSeeker.middle_name} {jobSeeker.extension_name}</td>
                    <td>{categoryMap[jobSeeker.category_id] || 'Unknown Category'}</td>
                    <td>{jobSeeker.address} {jobSeeker.street}, {jobSeeker.barangay} {jobSeeker.city} </td>
                    
                    <td>
                      <Button color="primary" onClick={() => openModal(jobSeeker)}><FontAwesomeIcon icon={faEye} /></Button>
                    </td>
                    {/* Add more columns if needed */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} size="lg">
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

                  <br/>

                  

                </>
              )}
              {/* Add more details if needed */}

                {selectedJobSeeker && (
                  <>
                    <div>
                      <div style={{textAlign: 'center'}}>
                        <img 
                          src={selectedJobSeeker.profile_picture} 
                          alt="Profile Pictures" 
                          className="image-preview" 
                          style={{ width: '200px', height: '150px', alignContent: 'left' }} 
                        />
                        
                        </div>
                      <br></br>
                      
                      <p><strong>Full Name: </strong>{selectedJobSeeker.first_name  }{selectedJobSeeker.middle_name  } {selectedJobSeeker.last_name  }&nbsp;&nbsp;&nbsp;
                      <strong>Age: </strong>{selectedJobSeeker.age}&nbsp;&nbsp;&nbsp;
                      <strong>Sex: </strong>{selectedJobSeeker.sex}</p>
                      <p><strong>Contact No: </strong>{selectedJobSeeker.contact_number}&nbsp;&nbsp;&nbsp;
                      <strong>Email: </strong>{selectedJobSeeker.email }</p><p>
                      <strong>Birthdate: </strong>{selectedJobSeeker.birthdate}&nbsp;&nbsp;&nbsp;
                      <strong>Citizenship: </strong>{selectedJobSeeker.citizenship}</p>
                      <p><strong>Birth Place: </strong>{selectedJobSeeker.birth_place}&nbsp;&nbsp;&nbsp;
                      <strong>Civil Status: </strong>{selectedJobSeeker.civil_status}</p>
                      <p><strong>SSS No: </strong>{selectedJobSeeker.sss}&nbsp;&nbsp;&nbsp;
                      <strong>Pag-Ibig No: </strong>{selectedJobSeeker.pagibig}&nbsp;&nbsp;&nbsp;
                      <strong>Philhealth No: </strong>{selectedJobSeeker.philhealth}&nbsp;&nbsp;&nbsp;
                      <strong>Tin No: </strong>{selectedJobSeeker.tin}
                      </p>
                      <br></br>
                      <h6>Address Details</h6>
                      <p><strong>Address #:</strong> { selectedJobSeeker.address}</p>
                      <p><strong>Street:</strong> { selectedJobSeeker.street}</p>
                      <p><strong>Barangay:</strong> { selectedJobSeeker.barangay}</p>
                      <p><strong>City:</strong> { selectedJobSeeker.city}</p>
                      <p><strong>Province:</strong> { selectedJobSeeker.province}</p>
                      <p><strong>Region:</strong> { selectedJobSeeker.region}</p>
                      <p><strong>Country:</strong> { selectedJobSeeker.country}</p>
                      <p><strong>Zip code:</strong> { selectedJobSeeker.zipcode}</p>
                      <p><strong>Educational Attainment:</strong> { selectedJobSeeker.educational_attainment}</p>
                      <p><strong>Experience:</strong> { selectedJobSeeker.experience} <strong>Year:</strong> { selectedJobSeeker.experience_years}</p>
                      {/* <p><strong>Years:</strong> { selectedResume.experience_years}</p> */}
                      <br></br>
                    </div>
                    <ModalFooter></ModalFooter>        
                  </>
                )}

            </ModalBody>
          </Modal>
        </Block>
      </Content>
    </>
  );
};

export default Jobseeker;
