import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockBetween, PreviewCard } from "../../components/Component";
import ApiService from '../../web_modules/base/axios';
import { BASE_URL } from "../axios/auth";
import Icon from "./Icon.js";
import { Button, Modal, ModalBody, ModalHeader, Col, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { useForm } from "react-hook-form";
import ReactDataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";

// Expandable Row Component
const ExpandableRowComponent = ({ row }) => (
  <ul className="dtr-details p-2 border-bottom ms-1">
    <li className="d-block d-sm-none">
      <span className="dtr-title">Job Category:</span> 
      <span className="dtr-data">{row?.category ?? 'N/A'}</span> {/* Safe access and fallback */}
    </li>
    <li className="d-block d-sm-none">
      <span className="dtr-title">Due Date:</span> 
      <span className="dtr-data">{row?.due_date ?? 'N/A'}</span>
    </li>
    <li>
      <span className="dtr-title">Status:</span> 
      <span className="dtr-data">{row?.status ?? 'N/A'}</span>
    </li>
    <li>
      <span className="dtr-title">Action:</span> 
      <span className="dtr-data">
        <Button color="primary" size="sm" onClick={() => handleView(row)}>
          View
        </Button>
      </span>
    </li>
  </ul>
);


const Employer = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('accessToken');
  const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
  const [applicants, setApplicants] = useState([]); 
  const [origApplicants, setOrigApplicants] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mobileView, setMobileView] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [userCanSubmit, setUserCanSubmit] = useState(false);
  const [origJobs, setOrigJobs] = useState([]);
  const [jobs, setJobs] = useState([]); // Set the jobs state to an empty array [
  const [modal, setModal] = useState(false);


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
    job_category: "",
  });

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

  const header = [
    {
      name: "Job Title",
      selector: (row) => row.name,
      grow: 2,
      style: { paddingRight: "20px" },
      sortable: true,
    },
    {
      name: "Job Category",
      selector: (row) => row.job_category,
      sortable: true,
      hide: "md",
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date,
      minWidth: "140px",
      sortable: true,
      hide: 480,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      hide: "sm",
    },
    {
      name: "Action",
      cell: (row) => (
        <Button color="primary" size="sm" onClick={() => handleView(row)}>
          View
        </Button>
      ),
      sortable: false,
      hide: "sm",
    },
  ];


  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await apiService.fetchApplicant(user);
      setApplicants(response.data);
      setOrigApplicants(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === '') {
      setApplicants(origApplicants);
    } else {
      const filteredApplicants = origApplicants.filter((job) =>
        job.name.toLowerCase().includes(value.toLowerCase())
      );
      setApplicants(filteredApplicants);
    }
  };

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 960);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // const handleView = (row) => {
  //   if (!row) {
  //     console.error("Row data is undefined");
  //     return;
  //   }
  
  //   // Set the selected job data
  //   setSelectedJob(row);
  
  //   // Open the view modal
  //   setViewModal(true);
  
  //   // Check if the user has already applied
  //   setUserCanSubmit(!row.job_already_applied);
  // };
  
  

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


  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  useEffect(() => {
    // Fetch jobs data when the component mounts
    fetchJobs();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // const fetchJobs = async () => {
  //   apiService.fetchJobs()
  //     .then((response) => {
  //       setJobs(response.data);
  //       setOrigJobs(response.data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching jobs', error);
  //     });
  // };

  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockBetween>
              <BlockHeadContent>
                <BlockTitle>Jobs Applied</BlockTitle>
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
                          type="search"
                          className="form-control form-control-sm"
                          placeholder="Search by Jobs Applied"
                          value={searchTerm}
                          onChange={handleSearch}
                        />
                      </div>
                    </li>
                  </ul>
                </div>
              </BlockHeadContent>
            </BlockBetween>
          </BlockHead>
          <PreviewCard>
            <ReactDataTable
              data={applicants}
              columns={header}
              pagination
              className="nk-tb-list"
              expandableRows={mobileView}
              expandableRowsComponent={ExpandableRowComponent}
              noDataComponent={<div className="p-2">There are no records found</div>}
            />
          </PreviewCard>
        </Block>
      </Content>

      {viewModal && selectedJob && (
        <Modal isOpen={viewModal} size="xl">
          <ModalHeader toggle={() => setViewModal(false)}>Job Applied Details</ModalHeader>
          <ModalBody>
            <>
              <h3><Icon name={"briefcase"}></Icon>{" " + selectedJob.name}</h3>
              <p className="lead"><Icon name={"building"} style={{ marginRight: '5px' }}></Icon>{selectedJob.company}</p>
              <p className="lead"><Icon name={"tags-fill"} style={{ marginRight: '5px' }}></Icon>{selectedJob.job_category}</p>
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
                <a href={formData.facebook} style={{ marginRight: '15px' }}><Icon name={"facebook-circle"} style={{ marginRight: '5px' }}></Icon>{selectedJob.facebook}</a>
              </div>
            </>
          </ModalBody>
          {localStorage.getItem("role") !== "Employer" ? (
            <ModalFooter>
              {userCanSubmit && (
                <>
                  {/* Other job details */}
                </>
              )}
              {userCanSubmit ? (
                <Button color="secondary" disabled={true}>Already Applied</Button>
                
              ) : (
                <Button color="primary" onClick={handleSubmitResume}>Apply</Button>
              )}
              <Button color="secondary" onClick={() => setViewModal(false)}>Close</Button>
            </ModalFooter>
          ) : (
            <ModalFooter>
              {/* Add additional employer-specific content here if needed */}
            </ModalFooter>
          )}
        </Modal>
      )}

    </>
  );
};

export default Employer;
