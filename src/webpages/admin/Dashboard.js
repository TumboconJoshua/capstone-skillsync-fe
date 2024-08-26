import React, { useState, useEffect } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";
import {
  Block,
  Row,
  Col,
  PreviewAltCard,
  TooltipComponent,
} from "../../components/Component";
import Icon from "../../components/icon/Icon";
import axios from "axios";
import { BASE_URL } from "../axios/auth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
} from "recharts";

import './Dash.css'





const Dashboard = ({ ...props }) => {
  const [jobCount, setJobCount] = useState(0);
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [jobYrCount, setJobYrCount] = useState(0);

  const [jobSeekersByCategory, setJobSeekersByCategory] = useState({});
  const [jobsByCategory, setJobsByCategory] = useState({});


  const [selectedMetric, setSelectedMetric] = useState("jobSeekers");
  
  const [selectedChartType, setSelectedChartType] = useState("Bar");

 
  const token = localStorage.getItem('accessToken');
  

  const categories = [
    { id: 1, name: "Office Work", color: "#8532a8" },
    { id: 2, name: "Production", color: "#328ba8" },
    { id: 3, name: "Skilled", color: "#ffbb28" },
    { id: 4, name: "Hospitality", color: "#0088fe" },
    { id: 5, name: "BPO", color: "#ff8042" },
    { id: 6, name: "Logistic", color: "#00c49f" },
    { id: 7, name: "Construction", color: "#d0ed57" },
    { id: 8, name: "Delivery Service", color: "#a4de6c" },
    { id: 9, name: "Distributor", color: "#06bd73" },
    { id: 10, name: "Government Institute", color: "#82ca9d" },
    { id: 11, name: "Heavy Equipment", color: "#d8888d" },
    { id: 12, name: "IT Solutions", color: "#f58105" },
    { id: 13, name: "Language School", color: "#7df505" },
    { id: 14, name: "Manufacturing", color: "#6a82fb" },
    { id: 15, name: "Mining", color: "#8884d8" },
    { id: 16, name: "Real Estate", color: "#add411" },
    { id: 17, name: "Retail", color: "#f54c0f" },
    { id: 18, name: "Seaport", color: "#b51859" },
    { id: 19, name: "Shipyard", color: "#ff7300" },
    { id: 20, name: "Trucking", color: "#183fb5" },
    { id: 21, name: "Wholesale Trade", color: "#0f853e" },
  ];

  useEffect(() => {
    fetchMetrics();
    fetchJobSeekers();
    fetchJobs();

  }, []);

  const fetchMetrics = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/metrics`);
      setJobCount(response.data.data.job_count);
      setJobSeekerCount(response.data.data.jobseeker_count);
      setUserCount(response.data.data.userCount);
      setJobYrCount(response.data.data.jobYrCount);
    } catch (error) {
      console.error("Error fetching metrics:", error);
    }
  };


  const fetchJobSeekers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobseekers`);
      categorizeJobSeekersData(response.data.data);
    } catch (error) { 
      console.error("Error fetching job seekers:", error);
    }
  };

  
  const fetchJobs = async () => {
    const token = localStorage.getItem('accessToken'); // Get the token from localStorage
  
    try {
      const response = await axios.get(`${BASE_URL}/jobs`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      categorizeJobsData(response.data.data); // Ensure this matches your API's data structure
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };


  const categorizeJobSeekersData = (data) => {
    const categorizedData = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {});

    data.forEach((item) => {
      const categoryName = categories.find(
        (category) => category.id === item.category_id
      )?.name;
      if (categoryName) {
        categorizedData[categoryName]++;
      }
    });

    setJobSeekersByCategory(categorizedData);
  };

  const categorizeJobsData = (data) => {
    // Initialize a dictionary with category names as keys and counts as values
    const categorizedData = categories.reduce((acc, category) => {
      acc[category.name] = 0;
      return acc;
    }, {});
  
    // Iterate over the data, mapping each job to its category
    data.forEach((job) => {
      // Replace 'job_category_id' with the correct field name if different
      const categoryName = categories.find(
        (category) => category.id === job.job_category_id
      )?.name;
  
      if (categoryName) {
        categorizedData[categoryName]++;
      }
    });
  
    // Update the state with the categorized job data
    setJobsByCategory(categorizedData);
  };

  

  const getChartData = () => {
    let data = [];
    switch (selectedMetric) {
      case "jobSeekers":
        data = jobSeekersByCategory;
        break;
      case "jobs":
        data = jobsByCategory;
        break;
      default:
        data = [];
    }
    return Object.keys(data).map((key) => ({
      name: key,
      count: data[key],
    }));
  };

  const pieChartData = {
    jobSeekers: jobSeekersByCategory,
    jobs: jobsByCategory,
    
  };

  const getPieChartData = (type) => {
    const data = pieChartData[type] || {};
    return Object.keys(data).map((key) => {
      const category = categories.find((cat) => cat.name === key);
      return {
        name: key,
        value: data[key],
        color: category ? category.color : "#8884d8", // Default color if not found
      };
    });
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
    if (value <= 0) return null; // Return null if the value is zero or less

    const radius = 25;
    const x = cx + (outerRadius + radius) * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + (outerRadius + radius) * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="#333" textAnchor="middle" dominantBaseline="central">
        {name}
      </text>
    );
  };

  const handleMetricChange = (e) => {
    setSelectedMetric(e.target.value);
  };

  const handleChartTypeChange = (e) => {
    setSelectedChartType(e.target.value);
  };

  return (
    <>
      <Head title="Dashboard" />
      <Content>
        <Block>
          <Row className="g-gs">
            <Col md="3" >
              <PreviewAltCard className="card-full p-2" >
             
                <div className="card-title-group align-start mb-0" >
                  <div className="card-title">
                    <h6 className="subtitle">No. of Job Seekers</h6>
                  </div>
                  <div className="card-tools" >
                    <TooltipComponent
                      iconClass="card-hint"
                      
                      direction="left"
                      id="invest-deposit"
                      text="No. of Job Seekers"
                      
                    />
                  </div>
                </div>
            
                <div className="card-amount" >
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {jobSeekerCount}
                    <Icon name="users" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2" >
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">No. of Jobs</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      
                      direction="left"
                      id="invest-deposit"
                      text="No. of Jobs"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {jobCount}
                    <Icon name="briefcase" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Yearly Users</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      
                      direction="left"
                      id="invest-deposit"
                      text="Yearly Users"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {userCount}
                    <Icon name="users" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Yearly Jobs</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      
                      direction="left"
                      id="invest-deposit"
                      text="Yearly Jobs"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {jobYrCount}
                    <Icon name="briefcase" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>
          </Row>

          <Row className="g-gs mt-4 d-flex justify-content-center align-items-center">
            <Col md="6" >
              <PreviewAltCard >
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">No. of Jobseekers by Category</h6>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={getPieChartData("jobSeekers")}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={renderCustomizedLabel}
                    >
                      {getPieChartData("jobSeekers").map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </PreviewAltCard>
            </Col>

            {/* <Col md="6">
            <PreviewAltCard>
              <div className="card-title-group align-start mb-0">
                <div className="card-title">
                  <h6 className="subtitle">Jobs by Category</h6>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={getPieChartData("jobs")}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#82ca9d"
                    label
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </PreviewAltCard>
            </Col> */}
          </Row>

          <Row className="g-gs mt-4">
            <Col md="12">
              <PreviewAltCard>
              <div className="d-flex justify-content-between p-3">
                <div>
                  <label htmlFor="metric-select">Select Metric: </label>
                  <select
                    id="metric-select"
                    value={selectedMetric}
                    onChange={handleMetricChange}
                  >
                    <option value="jobSeekers">Job Seekers</option>
                    {/* <option value="jobs">Jobs</option> */}
                    {/* <option value="users">Users</option>
                    <option value="yearlyJobs">Yearly Jobs</option> */}
                  </select>
                </div>
                <div>
                  <label htmlFor="chart-type-select">Select Chart Type:</label>
                  <select
                    id="chart-type-select"
                    value={selectedChartType}
                    onChange={handleChartTypeChange}
                  >
                    <option value="Bar">Bar Chart</option>
                    <option value="Line">Line Chart</option>
                  </select>
                </div>
              </div>
              
                
              <div style={{ overflowX: 'auto' }}>
                <div className="responsive-chart-container">
                  <ResponsiveContainer width="100%" height={400}>
                    {selectedChartType === "Bar" && (
                      <BarChart
                        data={getChartData()}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 80,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          interval={0}
                          height={80}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        
                        <Bar dataKey="count" fill="#8884d8" />
                      </BarChart>
                    )}
                    {selectedChartType === "Line" && (
                      <LineChart
                        data={getChartData()}
                        margin={{
                          top: 20,
                          right: 30,
                          left: 20,
                          bottom: 80,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="name"
                          angle={-45}
                          textAnchor="end"
                          interval={0}
                          height={80}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="count" stroke="#8884d8" />
                      </LineChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>

              </PreviewAltCard>
            </Col>
          </Row>
        </Block>
      </Content>
    </>
  );
};

export default Dashboard;
