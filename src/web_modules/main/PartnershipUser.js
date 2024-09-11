import React, { useEffect, useState } from 'react';
import ApiService from '../base/axios';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Form, FormGroup, Label } from 'reactstrap';

const apiService = new ApiService('http://localhost:8000/api');

const PartnershipsList = () => {
    const [partnerships, setPartnerships] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        partner_name: '',
        partner_type: '',
        description: '',
        partner_photo: null, // Initialize partner_photo with null
    });
    const [formError, setFormError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state

    useEffect(() => {
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setForm({
            ...form,
            partner_photo: e.target.files[0], // Set the selected file to partner_photo
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        const formData = new FormData();
        formData.append('partner_name', form.partner_name);
        formData.append('partner_type', form.partner_type);
        formData.append('description', form.description);
        if (form.partner_photo) {
            formData.append('partner_photo', form.partner_photo); // Append the file to the form data
        }

        try {
            const newPartnership = await apiService.makeRequest('POST', 'partnerships', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setPartnerships([...partnerships, newPartnership]);
            setForm({
                partner_name: '',
                partner_type: '',
                description: '',
                partner_photo: null,
            });
            setModalIsOpen(false); // Close the modal on successful form submission
        } catch (err) {
            setFormError('Failed to add partnership');
        }
    };

    return (
        <div>
            <br/><br/><br/>
            <h1>Partnerships</h1>
           
            {error && <p>{error}</p>}
            {formError && <p>{formError}</p>}

            

            {/* Modal */}
            <Modal isOpen={modalIsOpen} toggle={() => setModalIsOpen(false)}>
                <ModalHeader toggle={() => setModalIsOpen(false)}>Add Partnership</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Label for="partner_name">Partner Name:</Label>
                            <Input
                                type="text"
                                name="partner_name"
                                id="partner_name"
                                value={form.partner_name}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="partner_type">Partner Type:</Label>
                            <Input
                                type="text"
                                name="partner_type"
                                id="partner_type"
                                value={form.partner_type}
                                onChange={handleInputChange}
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description:</Label>
                            <Input
                                type="textarea"
                                name="description"
                                id="description"
                                value={form.description}
                                onChange={handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="partner_photo">Partner Photo:</Label>
                            <Input
                                type="file"
                                name="partner_photo"
                                id="partner_photo"
                                onChange={handleFileChange} // Handle file change separately
                            />
                        </FormGroup>
                        <ModalFooter>
                            <Button color="primary" type="submit">Add Partnership</Button>
                            <Button color="secondary" onClick={() => setModalIsOpen(false)}>Close</Button>
                        </ModalFooter>
                    </Form>
                </ModalBody>
            </Modal>

            <ul>
                {partnerships.map(partnership => (
                    <li key={partnership.id}>
                        {partnership.partner_name} - {partnership.partner_type}
                        {partnership.partner_photo && (
                            <div>
                                <img 
                                    src={`http://localhost:8000/storage/${partnership.partner_photo}`} 
                                    alt={partnership.partner_name} 
                                    style={{ width: '100px', height: '100px' }} 
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>



        </div>
    );
};

export default PartnershipsList;
