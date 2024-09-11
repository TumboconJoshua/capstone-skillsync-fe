import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  BlockBetween,
  PreviewCard,
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
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ReactDataTable from "react-data-table-component";

const Jobseeker = ({ ...props }) => {
  const [jobSeekers, setJobSeekers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJobSeeker, setSelectedJobSeeker] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const [viewModal, setViewModal] = useState(false);
  const [viewResumeModal, setViewResume] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedResume, setResume] = useState(null);

  useEffect(() => {
    // Fetch job seekers data
    fetchJobSeekers();
    
    // Update the screen size
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetchJobSeekers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/jobseekers`);
      setJobSeekers(response.data.data);
    } catch (error) {
      setError('Failed to fetch job seekers');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (jobSeeker) => {
    setSelectedJobSeeker(jobSeeker);
    setModalOpen(true);
    axios.get(`${BASE_URL}/jobseekers/${jobSeeker.id}`)
      .then((response) => {
        const birthDate = new Date(response.data.birthdate);
        const today = new Date();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        response.data.age = age;

        setSelectedJobSeeker(response.data);
        setImagePreview(`http://127.0.0.1:8000/${response.data.profile}`);
      })
      .catch((error) => {
        console.error('Error fetching job seeker details', error);
      });
  };

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


  // Define categories and create a map for category IDs to names
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

const categoryMap = categories.reduce((map, category) => {
  map[category.id] = category.name;
  return map;
}, {});

// Define columns for ReactDataTable
const columns = [
  {
    name: "Full Name",
    selector: row => `${row.last_name}, ${row.first_name}`,
    sortable: true,
  },
  {
    name: "Job Category",
    selector: row => categoryMap[row.category_id] || 'Unknown Category',
    sortable: true,
  },
  {
    name: "Age",
    selector: row => `${row.sex}`,
  },
  {
    name: "Birthdate",
    selector: row => `${row.birthdate}`,
  },
  {
    name: "Citizenship",
    selector: row => `${row.citizenship}`,
  },
  {
    name: "Action",
    cell: row => (
      <Button color="primary" onClick={() => setViewResume(row)}>
        <FontAwesomeIcon icon={faEye} />
      </Button>
    ),
  }
];

// Expandable Row Component
const ExpandableRowComponent = ({ data }) => (
  <div className="expandable-row-content p-3 border-top">
    <p><strong>Full Name:</strong> {`${data.last_name}, ${data.first_name}`}</p>
    <p><strong>Job Category:</strong> {categoryMap[data.category_id] || 'Unknown Category'}</p>
    <p><strong>Address:</strong> {`${data.address}, ${data.street}, ${data.barangay}, ${data.city}`}</p>
    <p><strong>Additional Details:</strong></p>
    <ul>
      <li><strong>Birthdate:</strong> {data.birthdate || 'N/A'}</li>
      <li><strong>Citizenship:</strong> {data.citizenship || 'N/A'}</li>
      <li><strong>Experience:</strong> {data.experience || 'N/A'}</li>
      <li><strong>Education:</strong> {data.education || 'N/A'}</li>
      <li><strong>Skills:</strong> {data.skills || 'N/A'}</li>
    </ul>
    <Button color="primary" onClick={() => setViewResume(data)}>View Details</Button>
  </div>
);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value === '' || e.target.value === null) {
      fetchJobSeekers();
    } else {
      const filteredData = jobSeekers.filter((jobSeeker) =>
        jobSeeker.first_name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        jobSeeker.last_name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setJobSeekers(filteredData);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;


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
                          placeholder="Quick search by Name"
                          onChange={handleSearch}
                          value={searchTerm}
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
              data={jobSeekers}
              columns={columns}
              pagination
              expandableRows={isSmallScreen} // Only enable expandable rows on small screens
              expandableRowsComponent={isSmallScreen ? ExpandableRowComponent : null} // Render expandable row component conditionally
              noDataComponent={<div className="p-2">There are no records found</div>}
            />
          </PreviewCard>

          {/* View Modal */}
          <Modal isOpen={viewResumeModal} toggle={() => setViewResume(false)} size="lg">
            <ModalHeader toggle={() => setViewResume(false)}>Jobseeker Resume</ModalHeader>
            <ModalBody>
              {selectedJobSeeker && (
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
                      <p><strong>Full Name:</strong> {selectedJobSeeker.fullname}</p>
                      <p><strong>Sex:</strong> {selectedResume.sex}, <strong>Age:</strong> {selectedJobSeeker.age}</p>
                      <p><strong>Contact No:</strong> {selectedJobSeeker.contact}</p>
                      <p><strong>Email:</strong> {selectedJobSeeker.email}</p>
                      <p><strong>Birthdate:</strong> {selectedJobSeeker.birthdate}</p>
                      <p><strong>Citizenship:</strong> {selectedJobSeeker.citizenship}</p>
                      <p><strong>Birth Place:</strong> {selectedJobSeeker.birth_place}</p>
                      <p><strong>Civil Status:</strong> {selectedJobSeeker.civil_status}</p>
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
        </Block>
      </Content>
    </>
  );
};

export default Jobseeker;
