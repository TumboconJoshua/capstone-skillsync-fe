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

const Dashboard = ({ ...props }) => {
  const [jobCount, setJobCount] = useState(0);
  const [jobSeekerCount, setJobSeekerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [jobYrCount, setJobYrCount] = useState(0);
  const [jobSeekersByCategory, setJobSeekersByCategory] = useState([]);
  const [jobsByCategory, setJobsByCategory] = useState([]);
  const [usersByCategory, setUsersByCategory] = useState([]);
  const [yearlyJobsByCategory, setYearlyJobsByCategory] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("jobSeekers");
  const [selectedChartType, setSelectedChartType] = useState("Bar");

  const categories = [
    { id: 1, name: "Office Work", color: "#ff7300"},
    { id: 2, name: "Production", color: "#00c49f"},
    { id: 3, name: "Skilled", color: "#ffbb28"},
    { id: 4, name: "Hospitality", color: "#0088fe"},
    { id: 5, name: "BPO", color: "#ff8042"},
    { id: 6, name: "Logistic", color: "#00c49f"},
    { id: 7, name: "Construction", color: "#d0ed57"},
    { id: 8, name: "Delivery Service", color: "#a4de6c"},
    { id: 9, name: "Distributor", color: "#8884d8"},
    { id: 10, name: "Government Institute", color: "#82ca9d"},
    { id: 11, name: "Heavy Equipment", color:"#d8888d"},
    { id: 12, name: "IT Solutions", color: "#00c49f"},
    { id: 13, name: "Language School" , color: "#c4e0e5"},
    { id: 14, name: "Manufacturing", color: "#6a82fb"},
    { id: 15, name: "Mining", color: "#8884d8"},
    { id: 16, name: "Real Estate", color: "#d0ed57"},
    { id: 17, name: "Retail", color:"#a4de6c"},
    { id: 18, name: "Seaport", color: "#00c49f"},
    { id: 19, name: "Shipyard", color: "#ff7300"},
    { id: 20, name: "Trucking" ,color: "#00c49f"},
    { id: 21, name: "Wholesale Trade" , color: "#00c49f" },
  ];

  useEffect(() => {
    fetchMetrics();
    fetchJobSeekers();
    fetchJobs();
    fetchUsers();
    fetchYearlyJobs();
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
      categorizeData(response.data.data, setJobSeekersByCategory);
    } catch (error) {
      console.error("Error fetching job seekers:", error);
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/jobs`);
      categorizeData(response.data.data, setJobsByCategory);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`);
      categorizeData(response.data.data, setUsersByCategory);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchYearlyJobs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/yearly-jobs`);
      categorizeData(response.data.data, setYearlyJobsByCategory);
    } catch (error) {
      console.error("Error fetching yearly jobs:", error);
    }
  };

  const categorizeData = (data, setCategoryState) => {
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

    setCategoryState(categorizedData);
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
      case "users":
        data = usersByCategory;
        break;
      case "yearlyJobs":
        data = yearlyJobsByCategory;
        break;
      default:
        data = [];
    }
    return Object.keys(data).map((key) => ({
      name: key,
      count: data[key],
    }));
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
            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">No. of Job Seekers</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      direction="left"
                      id="invest-deposit"
                      text="No. of Job Seekers"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {jobSeekerCount}
                    <Icon name="users" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
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
                    <Icon name="grid-alt" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Yearly Job Posts</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      direction="left"
                      id="invest-deposit"
                      text="Yearly Job Posts"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {jobYrCount}
                    <Icon name="bar-chart" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>

            <Col md="3">
              <PreviewAltCard className="card-full p-2">
                <div className="card-title-group align-start mb-0">
                  <div className="card-title">
                    <h6 className="subtitle">Yearly User Count</h6>
                  </div>
                  <div className="card-tools">
                    <TooltipComponent
                      iconClass="card-hint"
                      direction="left"
                      id="invest-deposit"
                      text="Yearly User Count"
                    />
                  </div>
                </div>
                <div className="card-amount">
                  <span className="amount" style={{ fontSize: "50px" }}>
                    {userCount}
                    <Icon name="bar-chart" className="mx-2" />
                  </span>
                </div>
              </PreviewAltCard>
            </Col>
          </Row>

          <div className="row">
            <div className="col-md-4">
              <label htmlFor="metricSelect">Select Metric:</label>
              <select id="metricSelect" value={selectedMetric} onChange={handleMetricChange}>
                <option value="jobSeekers">Job Seekers</option>
                <option value="jobs">Jobs</option>
                <option value="users">Users</option>
                <option value="yearlyJobs">Yearly Jobs</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="chartTypeSelect">Select Chart Type:</label>
              <select id="chartTypeSelect" value={selectedChartType} onChange={handleChartTypeChange}>
                <option value="Bar">Bar</option>
                <option value="Line">Line</option>
                <option value="Pie">Pie</option>
              </select>
            </div>
          </div>

          <Row className="g-gs">
            <Col lg="12">
              <PreviewAltCard className="card-full">
                <div className="card-inner">
                  <div className="card-title-group">
                    <div className="card-title">
                      <h6 className="title">Job Seekers by Category</h6>
                    </div>
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <div style={{ width: '1000px', height: '500px' }}>
                      <ResponsiveContainer>
                        {selectedChartType === "Bar" && (
                          <BarChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                          </BarChart>
                        )}
                        {selectedChartType === "Line" && (
                          <LineChart data={getChartData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                          </LineChart>
                        )}
                        {selectedChartType === "Pie" && (
                          <PieChart>
                            <Pie
                              data={getChartData().map((item, index) => ({
                                name: item.name,
                                value: item.count,
                                color: categories[index].color,
                              }))}
                              cx="50%"
                              cy="50%"
                              outerRadius={200}
                              fill="#8884d8"
                              dataKey="value"
                              label={(entry) => entry.value > 0 ? `${entry.name} (${entry.value})` : null}
                            >
                              {getChartData().map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={categories[index].color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
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
