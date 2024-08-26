import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockDes,
  BackTo,
  PreviewCard,
  ReactDataTable,
} from "../../components/Component";
import Icon from "../../components/icon/Icon";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,

  Nav,
  NavLink,
  NavItem,
  TabContent,
  TabPane,
} from "reactstrap";
import { DataTableData, dataTableColumns, dataTableColumns2, userData } from "./TableData";
import axios from 'axios';
import { BASE_URL } from "../axios/auth";
const Job = ({ ...props }) => {
  const [jobs, setJobs] = useState([]); // Set the jobs state to an empty array [
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
    requirements: "",
  });
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
        name: "Requirements",
        selector: (row) => row.requirements,
        sortable: true,
        hide: "md",
      },
    ];
  }
  const handleDelete = (row) => {
    // Implement the logic for deleting a job
    console.log('Deleting job:', row);

    // Add your delete logic using the job id, for example
    const jobIdToDelete = row.id;

    axios.delete(BASE_URL + `/jobs/${jobIdToDelete}`)
      .then((response) => {
        // Handle the response from the server
        console.log('Job deleted successfully', response.data);

        // Fetch jobs again after deletion to update the table
        fetchJobs();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error deleting job', error);
      });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // setFormData({ ...formData, user_id: localStorage.getItem('user_id') });
  };
  const verifyToken = async () => {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await axios.get(BASE_URL + '/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log(response.data.message); // Output: Token is valid
    } catch (error) {
      console.error('Token verification failed', error);
    }
  };

  // Call the function

  const handleFormSubmit = () => {
    // Get the token from local storage
    const token = localStorage.getItem('accessToken');
    // console.log(token);
    // axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    // console.log(axios.defaults.headers.common['Authorization']);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Add logic to submit the form data to the server using Axios
    const userId = localStorage.getItem('user_id');
    const formDataWithUserId = { ...formData, user_id: userId };

    axios.post(BASE_URL + '/jobs', formDataWithUserId)
      .then((response) => {
        // Handle the response from the server
        console.log('Job created successfully', response.data);
        toggle(); // Close the modal after successful creation
        fetchJobs(); // Fetch jobs again to update the table
      })
      .catch((error) => {
        // Handle errors
        console.error('Error creating job', error);
      });

    //   verifyToken();
  };


  const [editModal, setEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState({
    id: null,
    title: '',
    description: '',
    location: '',
    salary: '',
    requirements: '',
  });

  const handleEdit = (row) => {
    // Set the edit form data based on the selected job
    setEditFormData({
      id: row.id,
      title: row.title,
      description: row.description,
      location: row.location,
      salary: row.salary,
      requirements: row.requirements,
    });

    // Open the edit modal
    setEditModal(true);
  };

  const handleEditFormSubmit = () => {
    // Implement the logic to submit the edited form data to the server
    console.log('Editing job with data:', editFormData);

    // Add your edit logic using the job id, for example
    const jobIdToEdit = editFormData.id;

    axios.put(BASE_URL + `/jobs/${jobIdToEdit}`, editFormData)
      .then((response) => {
        // Handle the response from the server
        console.log('Job edited successfully', response.data);

        // Close the edit modal
        setEditModal(false);

        // Fetch jobs again after editing to update the table
        fetchJobs();
      })
      .catch((error) => {
        // Handle errors
        console.error('Error editing job', error);
      });
  };


  useEffect(() => {
    // Fetch jobs data when the component mounts
    fetchJobs();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const fetchJobs = async () => {
    try {
      const response = await axios.get(BASE_URL + '/jobs');
      // console.log(response.data);
      // var finalData = [];
      // for (let i = 0; i < response.data.length; i++) {
      //     finalData.push()
      //     response.data[i].id = i + 1;
      // }
      var finalData = [];
      for (let i = 0; i < response.data.data.length; i++) {
        finalData.push({
          id: response.data.data[i].id,
          title: response.data.data[i].title,
          description: response.data.data[i].description,
          location: response.data.data[i].location,
          salary: response.data.data[i].salary,
          requirements: response.data.data[i].requirements,
        });
      }
      setJobs(finalData); // Assuming the response.data is an array of jobs
      // console.log(jobs);
      // console.log(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  console.log(jobs);
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Job Postings</BlockTitle>
              {localStorage.getItem("role") == "Employer" ? <p>Post a job</p> : <p>Choose a job</p>}
            </BlockHeadContent>
            {localStorage.getItem("role") == "Employer" ? <Button color="primary" style={{ marginTop: "1rem" }} onClick={toggle}>
              Add
            </Button> : ""}
          </BlockHead>

          <PreviewCard>
            <ReactDataTable data={jobs} columns={columns} expandableRows pagination />
          </PreviewCard>
        </Block>
      </Content>
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
                type="text"
                name="salary"
                value={formData.salary}
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
                type="text"
                name="salary"
                value={editFormData.salary}
                onChange={(e) => setEditFormData({ ...editFormData, salary: e.target.value })}
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
