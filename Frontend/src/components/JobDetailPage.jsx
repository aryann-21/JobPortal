import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import JobApplicationForm from './JobApplicationForm';

const JobDetailPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`http://localhost:5000/api/jobs/${id}`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;

  return (
    <div className="relative min-h-screen bg-gray-100">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-opacity-90"
        style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1667668224834-3c47b3233fd3?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }} // Example random job-related image
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen bg-gray-900 bg-opacity-70">
        <div className="w-full max-w-3xl p-8 bg-gray-200 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h2>
          <p className="mb-4 text-gray-700">{job.description}</p>
          <p className="mb-2 text-gray-600">
            <span className="font-semibold">Company:</span> {job.company}
          </p>
          <p className="mb-6 text-gray-600">
            <span className="font-semibold">Location:</span> {job.location}
          </p>
          
          <div className="mb-6">
            <JobApplicationForm jobId={id} />
          </div>

          <Link
            to="/jobs"
            className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
