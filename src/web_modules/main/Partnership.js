import React, { useEffect, useState } from 'react';
import ApiService from '../base/axios';

// Create an instance of ApiService with the base URL
const apiService = new ApiService('http://localhost:8000/api');

const PartnershipsList = () => {
    const [partnerships, setPartnerships] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Retrieve token from local storage or other means
        const token = localStorage.getItem('accessToken');
        if (token) {
            apiService.setToken(token);
        }

        const fetchPartnerships = async () => {
            try {
                const data = await apiService.fetchPartnerships();
                setPartnerships(data);
            } catch (err) {
                setError('Failed to fetch partnerships');
            } finally {
                setLoading(false);
            }
        };

        fetchPartnerships();
    }, []);

    return (
        <div>
            <br/><br/><br/>
            <h1>Partnerships</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {partnerships.map(partnership => (
                    <li key={partnership.id}>
                        {partnership.partner_name} - {partnership.partner_type}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PartnershipsList;
