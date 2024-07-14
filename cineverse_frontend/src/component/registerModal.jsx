// src/components/RegisterModal.jsx
import React, { useState } from 'react';
import { Button, Form, Modal, CloseButton } from 'react-bootstrap';
import { createUserApi } from '../api/Api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import '../style/loginModal.css'; // Import the CSS file

const RegisterModal = ({ show, handleClose }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const response = await createUserApi({ name: fullName, email, password });
            console.log('Registration successful:', response.data);
            toast.success("Registration successful");
            handleClose();
        } catch (error) {
            console.error('Error during registration:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Register</h5>
                    <CloseButton onClick={handleClose} className="close-btn" />
                </div>
                <div className="modal-body">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter your full name" value={formData.fullName} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={handleChange} />
                        </Form.Group>
                        <div className="modal-footer">
                            <Button className="btn-orange" type="submit">
                                Register
                            </Button>
                        </div>
                    </Form>
                </div>
                <div className="signup-text">
                    Already have an account? <a href="#login">Login</a>
                </div>
            </div>
        </Modal>
    );
};

export default RegisterModal;
