import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const JobApplicationForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
  });
  const [submissionResponse, setSubmissionResponse] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`http://localhost:5000/api/jobs/${jobId}/apply`, formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      setSubmissionResponse(response.data);
      console.log('Application submitted:', response.data); // Log to console
      
      // Wait for 1 second before navigating to '/jobs'
      setTimeout(() => {
        navigate('/jobs'); // Redirect to jobs page
      }, 1000); // Delay of 1 second (1000 milliseconds)
      
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-opacity-50"
        style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1667668223846-19af07e08851?q=80&w=1900&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }} // Random job-related image
      ></div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-50">
        <div className="w-full max-w-lg mx-auto p-6 bg-gray-200 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Apply for this Job</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <textarea
                name="resume"
                placeholder="Your Resume"
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                rows="5"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
            >
              Submit Application
            </button>
          </form>

          {/* Submission Response */}
          {submissionResponse && (
            <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
              <h4 className="font-semibold">Application Response:</h4>
              <p>{submissionResponse.msg}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobApplicationForm;
