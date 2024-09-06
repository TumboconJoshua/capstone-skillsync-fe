import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import { Block, BlockHead, BlockHeadContent, BlockTitle, BlockBetween, PreviewCard } from "../../components/Component";
import ApiService from '../../web_modules/base/axios';
import { BASE_URL } from "../axios/auth";
import Icon from "./Icon.js";
import { Button, Modal, ModalBody, ModalHeader, Col } from "reactstrap";
import ReactDataTable from "react-data-table-component";
import exportFromJSON from "export-from-json";
import CopyToClipboard from "react-copy-to-clipboard";

// Export Component
const Export = ({ data }) => {
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      setTimeout(() => setModal(false), 2000);
    }
  }, [modal]);

  const fileName = "user-data";

  const exportCSV = () => {
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  const exportExcel = () => {
    const exportType = exportFromJSON.types.xls;
    exportFromJSON({ data, fileName, exportType });
  };

  const copyToClipboard = () => {
    setModal(true);
  };

  return (
    <React.Fragment>
      {/* <div className="dt-export-buttons d-flex align-center">
        <div className="dt-export-title d-none d-md-inline-block">Export</div>
        <div className="dt-buttons btn-group flex-wrap">
          <CopyToClipboard text={JSON.stringify(data)}>
            <Button className="buttons-copy buttons-html5" onClick={copyToClipboard}>
              <span>Copy</span>
            </Button>
          </CopyToClipboard>
          <Button className="btn btn-secondary buttons-csv buttons-html5" onClick={exportCSV}>
            <span>CSV</span>
          </Button>
          <Button className="btn btn-secondary buttons-excel buttons-html5" onClick={exportExcel}>
            <span>Excel</span>
          </Button>
        </div>
      </div>
      <Modal isOpen={modal} className="modal-dialog-centered text-center" size="sm">
        <ModalBody className="text-center m-2">
          <h5>Copied to clipboard</h5>
        </ModalBody>
        <div className="p-3 bg-light">
          <div className="text-center">Copied {data.length} rows to clipboard</div>
        </div>
      </Modal> */}
    </React.Fragment>
  );
};

// Expandable Row Component
const ExpandableRowComponent = ({ data }) => (
  <ul className="dtr-details p-2 border-bottom ms-1">
    <li className="d-block d-sm-none">
      <span className="dtr-title">Job Category:</span> <span className="dtr-data">{data.job_category}</span>
    </li>
    <li className="d-block d-sm-none">
      <span className="dtr-title">Due Date:</span> <span className="dtr-data">{data.due_date}</span>
    </li>
    <li>
      <span className="dtr-title">Status:</span> <span className="dtr-data">{data.status}</span>
    </li>
    <li>
      <span className="dtr-title">Action:</span> 
      <span className="dtr-data">
        <Button color="primary" size="sm" onClick={() => handleView(data)}>
          View
        </Button>
      </span>
    </li>
  </ul>
);

const Employer = () => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));

  const [apiService] = useState(new ApiService(BASE_URL, token)); 
  const [applicants, setApplicants] = useState([]); 
  const [origApplicants, setOrigApplicants] = useState([]); 
  const [searchTerm, setSearchTerm] = useState(''); 
  const [mobileView, setMobileView] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

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

  const handleView = (row) => {
    setSelectedJob(row);
    setViewModal(true);
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
                <Col sm="8" className="text-end">
                  <Export data={applicants} />
                </Col>
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

      <Modal isOpen={viewModal} toggle={() => setViewModal(false)} size="xl">
        <ModalHeader toggle={() => setViewModal(false)}>Job Applied</ModalHeader>
        <ModalBody>
          {selectedJob && (
            <>
              <h3><Icon name={"briefcase"}></Icon>{" " + selectedJob.name}</h3>
              <p className="lead"><Icon name={"building"} style={{ marginRight: '5px' }}></Icon>{selectedJob.company}</p>
              <p className="lead"><Icon name={"tags-fill"} style={{ marginRight: '5px' }}></Icon>{selectedJob.job_category}</p>
              <p><strong>Requirements:</strong> {selectedJob.requirements}</p>
              <p><strong>Descriptions:</strong> {selectedJob.description}</p>
              <p><strong>Slot:</strong> {selectedJob.slot}</p>
              <p><strong>Due Date:</strong> {selectedJob.due_date}</p>
              <p><strong>Soft Skill:</strong> {selectedJob.soft_skill}</p>
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                <p style={{ marginRight: '15px' }}><Icon name={"user"} style={{ marginRight: '5px' }}></Icon>{selectedJob.fullname} ({selectedJob.position})</p>
                <p style={{ marginRight: '15px' }}><Icon name={"money"} style={{ marginRight: '5px' }}></Icon>{selectedJob.salary}</p>
                <p style={{ marginRight: '15px' }}><Icon name={"map"} style={{ marginRight: '5px' }}></Icon>{selectedJob.location}</p>
              </div>
            </>
          )}
        </ModalBody>
      </Modal>
    </>
  );
};

export default Employer;
