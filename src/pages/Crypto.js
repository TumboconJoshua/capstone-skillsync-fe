import React, { useState,useEffect  }  from "react";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween
} from "../components/Component";
import Icon from "../components/icon/Icon";
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
import { BASE_URL  } from "../web_modules/axios/auth";
import ApiService from '../web_modules/base/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';



const Job = ({ ...props }) => {
   //  const// BASE_URL = "http://skillsync/api";
    // const BASE_URL = "127.0.0.1:8000";
    const [viewModal, setViewModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
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
        salary: "",
        slot: "",
        soft_sskill: "",
        due_date: "",
        requirements: "",
        facebook: "",
        available_slot: "",
        job_category: 1,
      });

      
    const handleSubmitResume = () => {
        let data = [];

        data.push(user.id,selectedJob.id);

        // check if file is empty
        apiService.submitApplication(data) .then((response) => {
          // console.log(response);
         
          if (response.status == 0) {
            setError(response.message);
          } else{
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

  const toggle = () => setModal(!modal);
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
        // Implement the logic for deleting a job
        // console.log('Deleting job:', row);

        // Add your delete logic using the job id, for example
        const jobIdToDelete = row.id;
        apiService.deleteJob(jobIdToDelete)
            .then((response) => {
              fetchJobs();
            })
            .catch((error) => {
                
                console.error('Error deleting job', error);
            });
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    

    const handleFormSubmit = () => {
        console.log('Submitting formData:', formData); // Add this line
        apiService.createJob(formData)
            .then((response) => {
                
                setModal(false);
                fetchJobs();
            })
            .catch((error) => {
                console.error('Error creating job', error);
            });
    };


    const [editModal, setEditModal] = useState(false);
    const [editFormData, setEditFormData] = useState({
        id: null,
        title: '',
        description: '',
        location: '',
        salary: '',
        slot: '',
        due_date: '',
        requirements: '',
        facebook: '',
        slot: '',
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

    const handleEditFormSubmit = () => {
        apiService.updateJob(editFormData.id, editFormData)
            .then((response) => {
                setEditModal(false);
                fetchJobs();
            })
            .catch((error) => {
                console.error('Error editing job', error);
            });
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);

        // console.log(e.target.value);
        // console.log(e.target.value == '' || e.target.value == null)

        if(e.target.value == '' || e.target.value == null) {
          setJobs(origJobs);
        }else{
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
        fetchJobs();
    }, []); 

    const fetchJobs = async () => {
        
        apiService.fetchGeneralJobs()
            .then((response) => {
                console.log('Jobs fetched successfully', response);
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
              <BlockTitle>Job Post</BlockTitle>
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
                                    <Icon name={"money"}></Icon> {job.salary}
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
                                 <CardLink onClick={() => handleEdit(job)}>Edit</CardLink>
                                 <CardLink onClick={() => handleDelete(job)}>Delete</CardLink>
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
    <Modal isOpen={viewModal} toggle={() => setViewModal(false)} size="xl" >
    <ModalHeader toggle={() => setViewModal(false)}>Job Postings </ModalHeader>
    <ModalBody >
        {/* Display job details here */}
        {selectedJob && (
            <>
                <h3><Icon name={"briefcase"}></Icon>{" " + selectedJob.title}</h3>
                <p className="lead"><Icon name={"building"} style={{ marginRight: '5px' }}></Icon>{selectedJob.company}</p>
                <p className="lead"><Icon name={"tags-fill"} style={{ marginRight: '5px' }}></Icon>{selectedJob.category}</p>
                <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
                <p><strong>Descriptions:</strong> {selectedJob.description}</p>
                <p><strong>Slot:</strong> {selectedJob.slot}</p>
                <p><strong>Due Date:</strong> {selectedJob.due_date}</p>
                <p><strong>Soft Skill:</strong> {selectedJob.soft_sskill}</p>
               
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>

                   <p style={{ marginRight: '15px' }}><Icon name={"user"} style={{ marginRight: '5px' }}></Icon>{selectedJob.fullname} ({selectedJob.position})</p>
                   <p style={{ marginRight: '15px' }}><Icon name={"money"} style={{ marginRight: '5px' }}></Icon> Php {selectedJob.salary}</p>
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
    </ModalFooter>) :   (
    <ModalFooter>
        {selectedJob && selectedJob.applications != null && <table className="table table-bordered mt-3">
            <thead>
                <tr>
                    <th>Job Seeker</th>
                    <th>Action</th>
                    {/* Add more columns if needed */}
                </tr>
            </thead>
            <tbody>
                {selectedJob.applications.map((application) => (
                    <tr key={application.id}>
                        <td>{application.name}</td>
                        <td>

                            <a href={`http://localhost:8000/api/${application.resume}`} target="_blank" rel="noreferrer">View Resume</a>
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
            <button className="close" onClick={toggle}>
              <Icon name="cross" />
            </button>
          }
        >
          Create New
        </ModalHeader>
        <ModalBody>
          {/* FORM HERE */}
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Slot</label>
              <input
                type="number"
                name="slot"
                value={formData.slot}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Requirements</label>
              <input
                type="text"
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                className="form-control"
              />
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
                />
            </div>
            <div className="form-group">
              <label>Facebook Link</label>
              <input
                type="text"
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
  
            <div className="form-group">
                <label>
                    Job Category
                </label>
                <select
                    id="job_category"
                    className="form-control"
                    name="job_category"
                    value={formData.job_category} 
                    onChange={handleInputChange}
                >
                    
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
            Save
          </Button>
          <span className="sub-text">New Job</span>
        </ModalFooter>
      </Modal>
      <Modal isOpen={editModal} toggle={() => setEditModal(false)}>
                <ModalHeader toggle={() => setEditModal(false)}>Edit Job</ModalHeader>
                <ModalBody>
                    {/* Edit form goes here */}
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
                            <label>Salary</label>
                            <input
                                type="number"
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
                                <label>
                                    Job Category
                                </label>
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
                    <Button color="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
                </ModalFooter>
            </Modal>
    </>
  );
};

export default Job;
