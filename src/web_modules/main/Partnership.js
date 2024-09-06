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
import Icon from "../../components/icon/Icon";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardLink,
} from "reactstrap";
import { BASE_URL } from "../axios/auth";
import ApiService from '../base/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Partnership = ({ ...props }) => {
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


  const navigate = useNavigate();

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

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        apiService.deleteJob(jobIdToDelete)
          .then((response) => {
            fetchJobs();
            setSuccess("Job has been deleted successfully!"); // Set success message
          })
          .catch((error) => {
            console.error('Error deleting job', error);
            setError("Failed to delete job. Please try again."); // Set error message
          });
      }
    });
  };

  const handleInputChange = (e) => {
    // console.log(e.target);
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  
  

  // Call the function

  const handleFormSubmit = () => {
    console.log('Submitting formData:', formData); // Log the form data

    apiService.createJob(formData)
      .then((response) => {
        console.log('Job created successfully', response.data);
        setModal(false); // Close the modal on success
        fetchJobs(); // Fetch updated job list
        setSuccess("Job has been added successfully!"); // Set success message
      })
      .catch((error) => {
        console.error('Error creating job', error);
        setError("Failed to add job. Please try again."); // Set error message
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
        setImagePreview(`http://127.0.0.1:8000/`+response.data.profile);

        
      })
      .catch((error) => {
        console.error('Error fetching resume', error);
      });
  }

  const handleEditFormSubmit = () => {
    apiService.updateJob(editFormData.id, editFormData)
      .then((response) => {
        setEditModal(false); // Close the modal on success
        fetchJobs(); // Refresh the job list
        setSuccess("Job has been updated successfully!"); // Set success message
      })
      .catch((error) => {
        console.error('Error editing job', error);
        setError("Failed to update job. Please try again."); // Set error message
      });
  };

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
    <Head title="Partnership" />
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
            {jobs.length === 0 ? <p>There are no jobs.</p> : ""}
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
      <Modal isOpen={viewResumeModal} toggle={() => setViewResume(false)} size="xl">
        <ModalHeader toggle={() => setViewResume(false)}>Jobseeker Resume</ModalHeader>
          <ModalBody>
            {selectedResume && (
              <>
                <div>
                  <div style={{textAlign: 'center'}}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="image-preview" 
                      style={{ width: '200px', height: '150px', alignContent: 'center' }} 
                    />
                    </div>
                  <br></br>
                  
                  <p><strong>Full Name: </strong>{selectedResume.fullname }&nbsp;&nbsp;&nbsp;
                  <strong>Age: </strong>{selectedResume.age}&nbsp;&nbsp;&nbsp;
                  <strong>Sex: </strong>{selectedResume.sex}</p>
                  <p><strong>Contact No: </strong>{selectedResume.contact}&nbsp;&nbsp;&nbsp;
                  <strong>Email: </strong>{selectedResume.email}</p><p>
                  <strong>Birthdate: </strong>{selectedResume.birthdate}&nbsp;&nbsp;&nbsp;
                  <strong>Citizenship: </strong>{selectedResume.citizenship}</p>
                  <p><strong>Birth Place: </strong>{selectedResume.birth_place}&nbsp;&nbsp;&nbsp;
                  <strong>Civil Status: </strong>{selectedResume.civil_status}</p>
                  <p><strong>SSS No: </strong>{selectedResume.sss}&nbsp;&nbsp;&nbsp;
                  <strong>Pag-Ibig No: </strong>{selectedResume.pagibig}&nbsp;&nbsp;&nbsp;
                  <strong>Philhealth No: </strong>{selectedResume.philhealth}&nbsp;&nbsp;&nbsp;
                  <strong>Tin No: </strong>{selectedResume.tin}
                  </p>
                  <br></br>
                  <h6>Address Details</h6>
                  <p><strong>Address #:</strong> { selectedResume.address}</p>
                  <p><strong>Street:</strong> { selectedResume.street}</p>
                  <p><strong>Barangay:</strong> { selectedResume.barangay}</p>
                  <p><strong>City:</strong> { selectedResume.city}</p>
                  <p><strong>Province:</strong> { selectedResume.province}</p>
                  <p><strong>Region:</strong> { selectedResume.region}</p>
                  <p><strong>Country:</strong> { selectedResume.country}</p>
                  <p><strong>Zip code:</strong> { selectedResume.zipcode}</p>
                  <p><strong>Educational Attainment:</strong> { selectedResume.educational_attainment}</p>
                  <p><strong>Experience:</strong> { selectedResume.experience} <strong>Year:</strong> { selectedResume.experience_years}</p>
                  {/* <p><strong>Years:</strong> { selectedResume.experience_years}</p> */}
                  <br></br>
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
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
                toggle={toggle}
                close={
                  <button className="close" onClick={toggle} style={{marginLeft: '72%'}}>
                    <Icon name="cross" />
                  </button>
                }
        >Create Job</ModalHeader>

        <ModalBody>
          {/* FORM HERE */}
          <form>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '6%' }}
              >(Required)</span>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. IT Specialist"
              />
            </div>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '16%' }}
              >(Required)</span>
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. We are seeking a skilled Marketing Manager to lead our marketing efforts 
                and drive brand growth. In this role, you will develop and implement marketing strategies, 
                manage campaigns, and analyze performance to ensure we meet our business goals."
              ></textarea>
            </div>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '12%' }}
              >(Required)</span>
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. Olongapo City, Zambales"
              />
            </div>
            <div className="form-group">
              <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '18%' }}
              >(Optional)</span>
              <label>Salary Range</label>
              <input
                type="text"
                name="salary"
                value={formData.salary || ''}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. 30,000 - 50,000 "
              />
            </div>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '6%' }}
              >(Required)</span>
              <label>Slot</label>
              <input
                type="number"
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. 10"
              />
            </div>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '19%' }}
              >(Required)</span>
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. Professionalism and strong work ethic."
              />
            </div>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '13%' }}
              >(Required)</span>
              <label htmlFor="dueDate">Due Date</label>
              <input
                type="date"
                id="due_date"
                name="due_date"
                onChange={handleInputChange}
                className="form-control"
                value={formData.due_date}
              />
            </div>


            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '19%' }}
              >(Optional)</span>
              <label>Soft Skills</label>
              <input
                type="text"
                name="soft_sskill"
                id="soft_sskill"
                value={formData.soft_sskill}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. computer literate."
              />
            </div>

            

            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '20%' }}
              >(Required)</span>
              <label>Facebook Link</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="form-control"
                placeholder="ex. https://www.facebook.com/"
              />
            </div>
            {/* <div className="form-group">
              <label>Due date and time</label>
              <input
                type="text"
                name="due"
                value={formData.slot}
                onChange={handleInputChange}
                className="form-control"
              />
            </div> */}
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '18%' }}
              >(Required)</span>
              <label>
                Job Category
              </label>
              <select
                id="job_category"
                className="form-control"
                name="job_category"
                value={formData.job_category} // Set default value to an empty string
                onChange={handleInputChange}
              >
                {/* Map through the list of job categories and render options */}
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
            </div>
          </form>
        </ModalBody>
        <ModalFooter className="bg-light">
          <Button color="primary" onClick={handleFormSubmit}>
            Add New Job
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
        <ModalHeader toggle={() => setEditModal(false)}>Edit Job</ModalHeader>
        <ModalBody>
          {/* Edit form goes here */}
          <form>
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '7%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '16%' }}>
                (Required)
              </span>
              <label>Description</label>
              <textarea
                name="description"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="form-control"
              ></textarea>
            </div>
            {/* <div className="form-group">
                            <label>Available slot</label>
                            <textarea
                                name="slot"
                                value={editFormData.slot}
                                onChange={(e) => setEditFormData({ ...editFormData, slot: e.target.value })}
                                className="form-control"
                            ></textarea>
                        </div> */}
            <div className="form-group">
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '12%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '18%' }}>
                (Optional)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '20%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '12%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '6%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '13%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '19%' }}>
                (Required)
              </span>
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
            <span
                className="text-muted"
                style={{ fontSize: '10px', color: 'red', display: 'block', marginBottom: '-18px', marginLeft: '18%' }}>
                (Required)
              </span>
              <label>Job Category</label>
              <select
                id="job_category"
                className="form-control"
                name="job_category"
                value={editFormData.job_category} // Set default value to an empty string
                onChange={(e) => setEditFormData({ ...editFormData, job_category: e.target.value })}
              >
                
                {/* Map through the list of job categories and render options */}
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
export default Partnership;