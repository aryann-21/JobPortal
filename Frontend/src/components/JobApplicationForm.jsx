import React, { useState } from 'react';
import axios from 'axios';

const JobApplicationForm = ({ jobId }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: '',
  });
  const [submissionResponse, setSubmissionResponse] = useState(null);

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
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
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
      {submissionResponse && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          <h4 className="font-semibold">Application Response:</h4>
          <p>{submissionResponse.msg}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;
