import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { useNavigate } from "react-router-dom";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween
} from "../../components/Component";
import { Form, Spinner, Alert } from "reactstrap";
// import {  NioIconCard } from "../../../components/Component";
import Icon from "../../components/icon/Icon";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
  // Button,

  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
  DropdownItem, UncontrolledDropdown, DropdownMenu, DropdownToggle, Badge
} from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
import ApiService from '../base/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import "./Job.css"


const Job = ({ ...props }) => {
  // const BASE_URL = "http://skill-sync-api.test/api";
  // const BASE_URL = "127.0.0.1:8000";
  const [viewModal, setViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedResume, setResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [userCanSubmit, setUserCanSubmit] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  const [errorVal, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (errorVal) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: errorVal,
        confirmButtonText: 'OK',
      }).then(() => setError("")); // Clear error after displaying
    }
  }, [errorVal]);
  
  // Show success notification with Swal if success changes
  useEffect(() => {
    if (success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: success,
        confirmButtonText: 'OK',
      }).then(() => setSuccess("")); // Clear success message after displaying
    }
  }, [success]);
  

  const handleView = (row) => {
    // Set the selected job data
    setSelectedJob(row);

    // Open the view modal
    setViewModal(true);

    // // console.log(row.job_already_applied);
    // // console.log(localStorage);
    let userApplied = row.job_already_applied;

    setUserCanSubmit(!userApplied);
  };
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [origJobs, setOrigJobs] = useState([]);
  const [jobs, setJobs] = useState([]); // Set the jobs state to an empty array [
  const [modal, setModal] = useState(false);

  const [softSkills, setSoftSkills] = useState([]);

  const token = localStorage.getItem('accessToken');
  const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: null,
    slot: "",
    due_date: "",
    requirements: "",
    facebook: "",
    available_slot: "",
    soft_sskill: "",
    job_category: 1,
  });


  const handleSubmitResume = () => {
    let data = [];

    data.push(user.id, selectedJob.id);

    // check if file is empty
    apiService.submitApplication(data).then((response) => {
      // console.log(response);

      if (response.status == 0) {
        setError(response.message);
      } else {
        setSuccess(response.message);
      }
      fetchJobs();
    })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting job', error);
      });

    setViewModal(false);
  }


  const toggle = () => {
    setModal(!modal)
    setFormData({
      title: "",
      description: "",
      location: "",
      salary: null,
      slot: "",
      due_date: "",
      requirements: "",
      facebook: "",
      soft_sskill: "",
      available_slot: "",
      job_category: 1,
    });
  };

  var columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      hide: 370,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Slots",
      selector: (row) => row.slot,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Available Slot",
      selector: (row) => row.available_slot,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Due date",
      selector: (row) => row.due_date,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Facebook",
      selector: (row) => row.facebook,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Soft Skills",
      selector: (row) => row.soft_sskill,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Requirements",
      selector: (row) => row.requirements,
      sortable: true,
      hide: "md",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button color="info" size="sm" className="me-1" onClick={() => handleEdit(row)}>Edit</Button>
          <Button color="danger" size="sm" onClick={() => handleDelete(row)}>Delete</Button>
        </div>
      ),
    },
  ];

  if (localStorage.getItem("role") != "Employer") {
    columns = [
      {
        name: "Title",
        selector: (row) => row.title,
        sortable: true,
      },
      {
        name: "Description",
        selector: (row) => row.description,
        sortable: true,
        hide: 370,
      },
      {
        name: "Location",
        selector: (row) => row.location,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Salary",
        selector: (row) => row.salary,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Slots",
        selector: (row) => row.slot,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Slots",
        selector: (row) => row.available_slot,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Due date",
        selector: (row) => row.due_date,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Soft Skills",
        selector: (row) => row.soft_sskill,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Facebook",
        selector: (row) => row.facebook,
        sortable: true,
        hide: "sm",
      },
      {
        name: "Requirements",
        selector: (row) => row.requirements,
        sortable: true,
        hide: "md",
      },
    ];
  }


  const handleDelete = (row) => {
    const jobIdToDelete = row.id;
  
    // Show confirmation prompt before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with deletion if confirmed
        apiService.deleteJob(jobIdToDelete)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The job has been deleted successfully.',
              confirmButtonText: 'OK',
            });
            fetchJobs();  // Refresh job list after successful deletion
          })
          .catch((error) => {
            // Handle errors
            console.error('Error deleting job', error);
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the job. Please try again.',
              confirmButtonText: 'OK',
            });
          });
      }
    });
  };


  // const handleDelete = (row) => {
    
  //   const jobIdToDelete = row.id;
  //   apiService.deleteJob(jobIdToDelete)
  //     .then((response) => {
  //       fetchJobs();
  //     })
  //     .catch((error) => {
  //       // Handle errors
  //       console.error('Error deleting job', error);
  //     });
  // };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSoftSkill = () => {
    if (!formData.soft_sskill.trim()) {
      // setError({ ...errorVal, soft_sskill: false });
      return;
    }

    // Add the skill and reset the input field
    setSoftSkills([...softSkills, formData.soft_sskill]);
    setFormData({ soft_sskill: '' });
    // setError({ ...errorVal, soft_sskill: false });

    // Show success notification using Swal
    Swal.fire({
      title: 'Success!',
      text: 'Soft skill added successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const removeSoftSkill = (index) => {
    const updatedSkills = softSkills.filter((_, i) => i !== index);
    setSoftSkills(updatedSkills);
  };

  

  

  // Call the function
  const handleFormSubmit = () => {
    console.log('Submitting formData:', formData); // Debugging log
  
    apiService.createJob(formData)
      .then((response) => {
        // Job creation success
        Swal.fire({
          icon: 'success',
          title: 'Job Created',
          text: 'The job has been created successfully!',
          confirmButtonText: 'OK',
        }).then(() => {
          setModal(false);  // Close the modal after success
          fetchJobs();       // Refresh the job list
        });
      })
      .catch((error) => {
        // Error handling
        console.error('Error creating job', error);
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue creating the job. Please try again later.',
          confirmButtonText: 'OK',
        });
      });
  };


  const [editModal, setEditModal] = useState(false);
  const [viewResumeModal, setViewResume] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [editFormData, setEditFormData] = useState({
    id: null,
    title: '',
    description: '',
    location: '',
    salary: null,
    slot: '',
    due_date: '',
    requirements: '',
    facebook: '',
    soft_sskill: "",
    job_category: 1,
  });
  

  const handleEdit = (row) => {
    // Set the edit form data based on the selected job
    setEditFormData({
      id: row.id,
      title: row.title,
      description: row.description,
      location: row.location,
      salary: row.salary,
      slot: row.slot,
      due_date: row.due_date,
      requirements: row.requirements,
      facebook: row.facebook,
      soft_sskill: row.soft_sskill,
      job_category: row.category_id,
    });

    // Open the edit modal
    setEditModal(true);
  };

  let resumeAge = null;
  
  const handleViewResume = (id) => {
    setViewModal(false);
    setViewResume(true);
    console.log(selectedJob.applications);

    apiService.fetchUser({"id":id})
      .then((response) => {

        const birthDate = new Date(response.data.birthdate);
        const today = new Date();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        response.data.age = age;

        console.log(response.data);

        setResume(response.data);
        setImagePreview(`http://localhost:8000`+response.data.profile);

        
      })
      .catch((error) => {
        console.error('Error fetching resume', error);
      });
  }

  const handleEditFormSubmit = () => {
    apiService.updateJob(editFormData.id, editFormData)
      .then((response) => {
        // Close the edit modal and refresh the job list
        setEditModal(false);
        fetchJobs();
  
        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Updated!',
          text: 'The job has been updated successfully.',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        // Handle errors
        console.error('Error editing job', error);
  
        // Show error notification
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'There was an issue updating the job. Please try again.',
          confirmButtonText: 'OK',
        });
      });
  };
  

  // const handleEditFormSubmit = () => {
  //   apiService.updateJob(editFormData.id, editFormData)
  //     .then((response) => {
  //       setEditModal(false);
  //       fetchJobs();
  //     })
  //     .catch((error) => {
  //       console.error('Error editing job', error);
  //     });
  // };

  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    // console.log(e.target.value);
    // console.log(e.target.value == '' || e.target.value == null)

    if (e.target.value == '' || e.target.value == null) {
      setJobs(origJobs);
    } else {
      var newData = jobs.filter((job) => {
        return job.title.toLowerCase().includes(e.target.value.toLowerCase());
      });
      setJobs(newData);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  useEffect(() => {
    // Fetch jobs data when the component mounts
    fetchJobs();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchJobs = async () => {
    // var finalData = [];
    apiService.fetchJobs()
      .then((response) => {
        // console.log('Jobs fetched successfully', response);
        // for (let i = 0; i < response.data.length; i++) {
        //     finalData.push({
        //         id: response.data.data[i].id,
        //         title: response.data.data[i].title,
        //         description: response.data.data[i].description,
        //         location: response.data.data[i].location,
        //         salary: response.data.data[i].salary,
        //         requirements: response.data.data[i].requirements,
        //     });
        // }
        setJobs(response.data);
        setOrigJobs(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error fetching jobs', error);
      });
  };

  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Job Posting</BlockTitle>
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
                      <li className="nk-block-tools-opt">
                        {localStorage.getItem("role") === "Employer" ? (
                          <>
                            <Button
                              className="toggle btn-icon d-md-none"
                              color="primary"
                              onClick={toggle}
                            >
                              <Icon name="plus"></Icon>
                            </Button>
                            <Button
                              className="toggle d-none d-md-inline-flex"
                              color="primary"
                              onClick={toggle}
                            >
                              <Icon name="plus"></Icon>
                              <span>Add Job</span>
                            </Button>
                          </>
                        ) : null}

                      </li>
                    </ul>
                  </div>
                
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>

          <div className="row">
            {jobs.length === 0 ? <p>There are no Job posted.</p> : ""}
            {jobs.map((job) => (
              <Col key={job.id} xs="12" sm="6" md="6" lg="6" xl="6">
                <Card className="card-bordered" style={{ border: '2px solid #ccc', margin: '10px', borderLeft: '5px solid #088e54' }}>
                  <CardBody className="card-inner">
                    <CardTitle tag="h5">{job.title}</CardTitle>
                    <CardSubtitle tag="h5" className="mb-2 ff-base">
                      <Icon name={"building"}></Icon> {job.company}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 ff-base">
                      <Icon name={"money"} > Php</Icon> {job.salary}
                      
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 ff-base">
                      <Icon name={"location"}></Icon> {job.location}
                    </CardSubtitle>
                    <CardSubtitle tag="h6" className="mb-2 ff-base">
                      <Icon name={"tags-fill"}></Icon> {job.category}
                    </CardSubtitle>
                    {/* <CardText>{job.description}</CardText>
                                <CardLink href="javascript:void(0);" onClick={() => handleView(job)}>View</CardLink>
                                {
                                    localStorage.getItem("role") === "Employer" ? (
                                        <>
                                            <CardLink href="javascript:void(0);" onClick={() => handleEdit(job)}>Edit</CardLink>
                                            <CardLink href="javascript:void(0);" onClick={() => handleDelete(job)}>Delete</CardLink>
                                        </>
                                    ) : null
                                } */}
                    <CardText>{job.description}</CardText>
                      <button onClick={() => handleView(job)} 
                       style={{ 
                         backgroundColor: '#088e54', 
                         color: 'white', 
                         border: 'none', 
                         padding: '5px 15px', 
                         cursor: 'pointer', 
                         borderRadius: '5px',
                         marginRight: '3px',
                         transition: 'background-color 0.3s ease'   
                       }}
                       onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}
                     >
                       <FontAwesomeIcon icon={faEye} /> View
                     </button>
                                 
                    
                    {
                      localStorage.getItem("role") === "Employer" ? (
                        <>
                          <button href="javascript:void(0);"
                            onClick={() => handleEdit(job)} 
                            style={{ 
                              backgroundColor: '#5897EE', 
                              color: 'white', 
                              border: 'none', 
                              padding: '5px 15px', 
                              cursor: 'pointer', 
                              borderRadius: '5px',
                              marginRight: '3px',
                              transition: 'background-color 0.3s ease'   
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#5897EE'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#5BA4FC'}
                          >
                            <FontAwesomeIcon icon={faEdit} /> Edit
                          </button>
                          <button href="javascript:void(0);"
                            onClick={() => handleDelete(job)} 
                            style={{ 
                              backgroundColor: '#E33437', 
                              color: 'white', 
                              border: 'none', 
                              padding: '5px 15px', 
                              cursor: 'pointer', 
                              borderRadius: '5px',
                              transition: 'background-color 0.3s ease' 
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#E33437'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#FC3D39'}
                          >
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </button>
                                                   
                        </>
                      ) : null
                    }
                  </CardBody>
                </Card>
              </Col>
            ))}
          </div>
        </Block>
      </Content>

      {/* View Modal */}
      <Modal isOpen={viewResumeModal} toggle={() => setViewResume(false)} size="lg">
        <ModalHeader toggle={() => setViewResume(false)}>Jobseeker Resume</ModalHeader>
        <ModalBody>
  {selectedResume && (
    <>
      <div className="resume-container">
        {/* Image section */}
        <div className="image-section">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="image-preview" 
          />
        </div>

        {/* Information section */}
        <div className="info-section">
          <p><strong>Full Name:</strong> {selectedResume.fullname}</p>
          <p><strong>Sex:</strong> {selectedResume.sex}, <strong>Age:</strong> {selectedResume.age}</p>
          <p><strong>Contact No:</strong> {selectedResume.contact}</p>
          <p><strong>Email:</strong> {selectedResume.email}</p>
          <p><strong>Birthdate:</strong> {selectedResume.birthdate}</p>
          <p><strong>Citizenship:</strong> {selectedResume.citizenship}</p>
          <p><strong>Birth Place:</strong> {selectedResume.birth_place}</p>
          <p><strong>Civil Status:</strong> {selectedResume.civil_status}</p>
          <br />
          <h6 className="">Government ID's</h6>
          <p><strong>SSS No:</strong> {selectedResume.sss ? selectedResume.sss : 'N/A'}</p>
          <p><strong>Pag-Ibig No:</strong> {selectedResume.pagibig ? selectedResume.pagibig : 'N/A'}</p>
          <p><strong>Philhealth No:</strong> {selectedResume.philhealth ? selectedResume.philhealth : 'N/A'}</p>
          <p><strong>TIN No:</strong> {selectedResume.tin ? selectedResume.tin : 'N/A'}</p>
          <br />
          <h6 className="">Address Details</h6>
          <p><strong>Address #:</strong> {selectedResume.address}</p>
          <p><strong>Street:</strong> {selectedResume.street}</p>
          <p><strong>Barangay:</strong> {selectedResume.barangay}</p>
          <p><strong>City:</strong> {selectedResume.city}</p>
          <p><strong>Province:</strong> {selectedResume.province}</p>
          <p><strong>Region:</strong> {selectedResume.region}</p>
          <p><strong>Country:</strong> {selectedResume.country}</p>
          <p><strong>Zip code:</strong> {selectedResume.zipcode}</p>

          <br />
          <p><strong>Educational Attainment:</strong> {selectedResume.educational_attainment}</p>
          <p><strong>Experience:</strong> {selectedResume.experience} <strong>Year:</strong> {selectedResume.experience_years}</p>
        </div>
      </div>

      <ModalFooter></ModalFooter>
    </>
  )}
</ModalBody>


      </Modal>

      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} size="xl">
        <ModalHeader toggle={() => setViewModal(false)}>Job Posting</ModalHeader>
        <ModalBody>
          {/* Display job details here */}
          {selectedJob && (
            <>
              <h3><Icon name={"briefcase"}></Icon>{" " + selectedJob.title}</h3>
              <p className="lead"><Icon name={"building"} style={{ marginRight: '5px' }}></Icon>{selectedJob.company}</p>
              <p className="lead"><Icon name={"tags-fill"} style={{ marginRight: '5px' }}></Icon>{selectedJob.category}</p>
              <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
              <p><strong>Descriptions:</strong> {selectedJob.description}</p>
              <p><strong>Slot:</strong> {selectedJob.available_slot}</p>
              <p><strong>Due Date:</strong> {selectedJob.due_date}</p>
              <p><strong>Soft Skills:</strong> {selectedJob.soft_sskill}</p>

              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                <p style={{ marginRight: '15px' }}><Icon name={"user"} style={{ marginRight: '5px' }}></Icon>{selectedJob.fullname} ({selectedJob.position})</p>
                <p style={{ marginRight: '15px' }}><Icon name={"money"} style={{ marginRight: '5px' }}></Icon>{selectedJob.salary}</p>
                <p style={{ marginRight: '15px' }}><Icon name={"location"} style={{ marginRight: '5px' }}></Icon>{selectedJob.location}</p>
                <p style={{ marginRight: '15px' }}><Icon name={"telegram"} style={{ marginRight: '5px' }}></Icon>{selectedJob.contact_number}</p>
                <p style={{ marginRight: '15px' }}><Icon name={"mail"} style={{ marginRight: '5px' }}></Icon>{selectedJob.email}</p>
                <a href={selectedJob.facebook} style={{ marginRight: '15px' }}><Icon name={"facebook-circle"} style={{ marginRight: '5px' }}></Icon>{selectedJob.facebook}</a>

              </div>
              {/* Add more details as needed */}

            </>
          )}
        </ModalBody>
        {localStorage.getItem("role") !== "Employer" ? (
          <ModalFooter>
            {userCanSubmit && (
              <>
                {/* Other job details */}
                {/* <div className="form-group">
                      <label>Submit Resume</label>
                      <input
                          type="file"
                          className="form-control"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                      />
                  </div> */}
              </>
            )}
            {/* onClick={handleSubmitResume} */}
            {userCanSubmit ? (
              <Button color="primary" onClick={handleSubmitResume} >Apply</Button>) : <Button color="secondary" disabled={true}> Already Applied </Button>}
            <Button color="secondary" onClick={() => setViewModal(false)}>Close</Button>
          </ModalFooter>) : (
          <ModalFooter>
            {selectedJob && selectedJob.applications != null && <table className="table table-bordered mt-3">
              <thead>
                <tr>
                  <th>Job Seekers Applied</th>
                  <th>Action</th>
                  {/* Add more columns if needed */}
                </tr>
              </thead>
              <tbody>
                {selectedJob.applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.name}</td>
                    <td>
                      {/* <a href={`${process.env.PUBLIC_URL}/resume`} target="_blank" rel="noreferrer">View Resume</a> */}
                      <Button onClick={() => handleViewResume(application.id)} style={{ 
                         backgroundColor: '#088e54', 
                         color: 'white', 
                         border: 'none', 
                         padding: '5px 5px', 
                         cursor: 'pointer', 
                         borderRadius: '5px',
                         transition: 'background-color 0.3s ease'   
                       }}
                       onMouseEnter={(e) => e.target.style.backgroundColor = '#077947'}
                       onMouseLeave={(e) => e.target.style.backgroundColor = '#088e54'}

                       >View Resume</Button>

                    </td>
                    {/* Add more columns if needed */}
                  </tr>
                ))}
              </tbody>
            </table>}
          </ModalFooter>)}
      </Modal>





      {/* Add Job Post */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create Job</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. IT Specialist"
              />
              {errorVal.title && <p className="invalid">This field is required</p>}
            </div>
            
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. We are seeking a skilled Marketing Manager to lead our marketing efforts and drive brand growth. In this role, you will develop and implement marketing strategies, manage campaigns, and analyze performance to ensure we meet our business goals."
              ></textarea>
              {errorVal.description && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. Olongapo City, Zambales"
              />
              {errorVal.location && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary || ''}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. 10,000 - 20,000"
              />
              {errorVal.salary && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Slot</label>
              <input
                type="number"
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. 10"
                min="0"
                max="999"
              />
              {errorVal.slot && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. Professionalism and strong work ethic."
              />
              {errorVal.requirements && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Required Soft Skills</label>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="text"
                  name="soft_sskill"
                  id="soft_sskill"
                  value={formData.soft_sskill}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="e.g. computer literate."
                />
                <Button color="primary" onClick={addSoftSkill} style={{ marginLeft: '10px' }}>
                  Add
                </Button>
              </div>
              {errorVal.soft_sskill && <p className="invalid">This field is required</p>}

              <ul style={{ listStyleType: 'none', padding: 0, marginTop: '5px'}}>
                {softSkills.map((skill, index) => (
                  <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px' }}>
                    {skill}
                    <Button color="danger" onClick={() => removeSoftSkill(index)} style={{ marginLeft: '10px' }}>
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label htmlFor="due_date">Due Date</label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                onChange={handleInputChange}
                className="form-control"
                value={formData.due_date}
                min={today}
              />
              {errorVal.due_date && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Facebook Link</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="form-control"
                placeholder="e.g. https://www.facebook.com/"
              />
              {errorVal.facebook && <p className="invalid">This field is required</p>}
            </div>

            <div className="form-group">
              <label>Job Category</label>
              <select
                name="job_category"
                value={formData.job_category}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="1" disabled>Select a Job category</option>
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
                <option value="16">Real Estate</option>
                <option value="17">Retail</option>
                <option value="18">Seaport</option>
                <option value="19">Shipyard</option>
                <option value="20">Trucking</option>
                <option value="21">Wholesale Trade</option>
              </select>
              {errorVal.job_category && <p className="invalid">This field is required</p>}
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="primary" onClick={handleFormSubmit}>
            Add New Job
          </Button>
        </ModalFooter>
      </Modal>









      {/* Edit Job Post */}
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Edit Job</ModalHeader>
        <ModalBody>
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editFormData.title}
                onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                className="form-control"
                
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="form-control"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editFormData.location}
                onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={editFormData.salary}
                onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Facebook Link</label>
              <input
                type="text"
                name="facebook"
                value={editFormData.facebook}
                onChange={(e) => setEditFormData({ ...editFormData, facebook: e.target.value })}
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Soft Skill</label>
              <input
                type="text"
                name="location"
                value={editFormData.soft_sskill}
                onChange={(e) => setEditFormData({ ...editFormData, soft_sskill: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Slot</label>
              <input
                type="number"
                name="slot"
                value={editFormData.slot}
                onChange={(e) => setEditFormData({ ...editFormData, slot: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Due date</label>
              <input
                type="date"
                name="due_date"
                value={editFormData.due_date}
                onChange={(e) => setEditFormData({ ...editFormData, due_date: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={editFormData.requirements}
                onChange={(e) => setEditFormData({ ...editFormData, requirements: e.target.value })}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Job Category</label>
              <select
                id="job_category"
                className="form-control"
                name="job_category"
                value={editFormData.job_category}
                onChange={(e) => setEditFormData({ ...editFormData, job_category: e.target.value })}
              >
                <option value="1" disabled>Select a Job category</option>
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
                <option value="16">Real Estate</option>
                <option value="17">Retail</option>
                <option value="18">Seaport</option>
                <option value="19">Shipyard</option>
                <option value="20">Trucking</option>
                <option value="21">Wholesale Trade</option>
              </select>
              {errorVal.job_category && <p className="invalid">This field is required</p>}
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditFormSubmit}>Save</Button>
          <Button color="danger" onClick={() => setEditModal(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Job;
