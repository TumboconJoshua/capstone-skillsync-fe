import React , {useState,useEffect} from "react";
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
import ApiService from '../../web_modules/base/axios';
import { BASE_URL  } from "../axios/auth";


const Employer = ({ ...props }) => {


  const token = localStorage.getItem('accessToken');
  const user =  JSON.parse(localStorage.getItem('user'));
  
  const [apiService, setApiService] = useState(new ApiService(BASE_URL, token));
  const [applicants, setApplicants] = useState([]);;
        
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
      name: "Due date",
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
  ];
  
  useEffect(() => {
    // Fetch jobs data when the component mounts
    fetchJobs();
  }, []); // Empty dependency array ensures this effect runs only once on mount
  
 
  const fetchJobs = async () => {
    // var finalData = [];
    apiService.fetchApplicant(user)
        .then((response) => {
          setApplicants(response.data);
        })
        .catch((error) => {
            // Handle errors
            console.error('Error fetching jobs', error);
        });
  };
  console.log(applicants);
  
  return (
    <>
      <Head title="Employers" />
      <Content page="component">
        <Block size="lg">
          <BlockHead>
            <BlockHeadContent>
              <BlockTitle tag="h4">Job Applied</BlockTitle>
            </BlockHeadContent>
          </BlockHead>

          <PreviewCard>
            <ReactDataTable
              data={applicants}
              columns={header}
              pagination
              className="nk-tb-list"
              
            />
          </PreviewCard>
        </Block>
      </Content>
    </>
  );
};

export default Employer;
