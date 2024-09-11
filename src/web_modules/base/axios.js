import axios from 'axios';

class ApiService {
    constructor(baseURL, token) {
        this.baseURL = baseURL;
        this.token = token;
    }
    setToken(token) {
        this.token = token;
    }

    async authenticate(email, password) {
        try {
            const response = await axios.post(`${this.baseURL}/login`, { "email" : email, "password" : password });
            this.token = response.data.access_token;
            return response.data;
        } catch (error) {
            console.error('Authentication failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async logout() {
        try {
            const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
            await axios.post(`${this.baseURL}/logout`, null, { headers });
            this.token = null;
            return 'Logged out successfully';
        } catch (error) {
            console.error('Logout failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async makeRequest(method, endpoint, data = {}) {
        try {
            const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

            const response = await axios({
                method: method,
                url: `${this.baseURL}/${endpoint}`,
                headers: headers,
                data: data,
            });

            return response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async profileImage(method,endpoint, data = {}){
        try {
            const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};

            const response = await axios({
                method: method,
                url: `http://localhost:8000`+ endpoint,
                headers: headers,
                data: data,
            })
            return response.data;
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async getImage(fileName){
        return this.profileImage('GET', fileName);
    }

    async fetchUser(formData) {
        const endpoint = `user-resume`;
        return this.makeRequest('POST', endpoint,formData);
    }

    async fetchJobs() {
        const endpoint = 'jobs';
        return this.makeRequest('GET', endpoint);
    }

    async fetchGeneralJobs() {
        const endpoint = 'jobs-general';
        return this.makeRequest('GET', endpoint);
    }
    
    async fetchApplicant(formData) {
        const endpoint = `application`;
        return this.makeRequest('POST', endpoint,formData);
    }

    async submitApplication(formData) {
        const endpoint = 'submit-application';
        return this.makeRequest('POST', endpoint, formData);
    }

    async submitResume(formData) {
        const endpoint = 'submit-resume';
        return this.makeRequest('POST', endpoint, formData);
    }

    async createJob(jobData) {
        const endpoint = 'jobs';
        return this.makeRequest('POST', endpoint, jobData);
    }

    async updateJob(jobId, jobData) {
        const endpoint = `jobs/${jobId}`;
        return this.makeRequest('PUT', endpoint, jobData);
    }

    async deleteJob(jobId) {
        const endpoint = `jobs/${jobId}`;
        return this.makeRequest('DELETE', endpoint);
    }

    async updateProfileJobseeker(jobseekerData) {
        const endpoint = 'update-profile-jobseeker';
        return this.makeRequest('PUT', endpoint, jobseekerData);
    }

    async updateProfileEmployer(employerData) {
        const endpoint = 'update-profile-employer';
        return this.makeRequest('PUT', endpoint, employerData);
    }

    async updatePassword(passwordData) {
        const endpoint = 'update-password';
        return this.makeRequest('PUT', endpoint, passwordData);
    }

    async registerJobseeker(userData) {
        try {
            const response = await axios.post(`${this.baseURL}/register-jobseeker`, userData);
            return response.data;
        } catch (error) {
            console.error('Jobseeker registration failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async registerEmployee(userData) {
        try {
            const response = await axios.post(`${this.baseURL}/register-employee`, userData);
            return response.data;
        } catch (error) {
            console.error('Employee registration failed:', error.response ? error.response.data : error.message);
            throw error;
        }
    }

    async fetchPartnerships() {
        const endpoint = 'partnerships';
        return this.makeRequest('GET', endpoint);
    }
    
}

export default ApiService;
