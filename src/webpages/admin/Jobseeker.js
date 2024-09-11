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
  const [imagePreview, setImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchJobSeekers();
    
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
        setImagePreview(`http://localhost:8000`+response.data.profile);
      })
      .catch((error) => {
        console.error('Error fetching job seeker details', error);
      });
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

  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category.name;
    return map;
  }, {});

  const header = [
    {
      name: "Full Name",
      selector: row => `${row.last_name}, ${row.first_name}`,
      grow: 2,
      style: { paddingRight: "24px" },
      sortable: true,
    },
    {
      name: "Job Category",
      selector: row => categoryMap[row.category_id] || 'Unknown Category',
      sortable: true,
      hide: "md",
    },
    {
      name: "Sex",
      selector: row => `${row.sex || 'N/A'}`,
      minWidth: "100px",
      sortable: true,
      hide: 480,
    },
    {
      name: "Birthdate",
      selector: row => `${row.birthdate || 'N/A'}`,
      minWidth: "140px",
      sortable: true,
      hide: 480,
    },
    {
      name: "Citizenship",
      selector: row => `${row.citizenship || 'N/A'}`,
      minWidth: "140px",
      sortable: true,
      hide: 480,
    },
    {
      name: "Action",
      cell: (row) => (
        <Button color="primary" size="sm" onClick={() => openModal(row)}>
          <FontAwesomeIcon icon={faEye} />
        </Button>
      ),
      sortable: false,
      hide: "sm",
    },
  ];

  const ExpandableRowComponent = ({ data }) => (
    <ul className="dtr-details p-2 border-bottom ms-1">
      <li className="d-block d-sm-none">
        <span className="dtr-title">Job Category: </span>
        <span className="dtr-data">{categoryMap[data.category_id] || 'Unknown Category'}</span>
      </li>
      <li>
        <span className="d-block d-sm-none">Birthdate: </span>
        <span className="dtr-data">{data.birthdate || 'N/A'}</span>
      </li>
      <li>
        <span className="d-block d-sm-none">Citizenship: </span>
        <span className="dtr-data">{data.citizenship || 'N/A'}</span>
      </li>
      <li>
        <span className="dtr-title">Action:</span> 
        <span className="dtr-data">
          <Button color="primary" size="sm" onClick={() => openModal(data)}>
            View
          </Button>
        </span>
      </li>
    </ul>
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

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

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSearchTerm(value);

  //   if (value === '') {
  //     setApplicants(origApplicants);
  //   } else {
  //     const filteredApplicants = origApplicants.filter((job) =>
  //       job.name.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setApplicants(filteredApplicants);
  //   }
  // };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
                          <Icon name="search" />
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
              data={jobSeekers}
              columns={header}
              pagination
              className="nk-tb-list"
              expandableRows={isSmallScreen}
              expandableRowsComponent={isSmallScreen ? ExpandableRowComponent : null}
              defaultSortFieldId={0}
              defaultSortAsc={false}
              striped={true}
              highlightOnHover={true}
              pointerOnHover={true}
            />
          </PreviewCard>
        </Block>

          <Modal isOpen={modalOpen} toggle={() => setModalOpen(false)} size="lg">
            <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
              {selectedJobSeeker ? `${selectedJobSeeker.first_name} ${selectedJobSeeker.last_name}` : 'Job Seeker Details'}
            </ModalHeader>
            <ModalBody>
                {selectedJobSeeker && (
                  <>
                    <div>
                      <div style={{textAlign: 'center'}}>
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="image-preview" 
                          style={{ width: '200px', height: '150px', alignContent: 'left' }} 
                        />
                        </div>
                      <br></br>
                      
                      <p>
                      <strong>Age: </strong>{selectedJobSeeker.age}&nbsp;&nbsp;&nbsp;
                      <strong>Sex: </strong>{selectedJobSeeker.sex}</p>
                      <p><strong>Contact No: </strong>{selectedJobSeeker.contact_number}&nbsp;&nbsp;&nbsp;
                      <strong>Email: </strong>{selectedJobSeeker.email}</p><p>
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
      </Content>
    </>
  );
};

export default Jobseeker;
