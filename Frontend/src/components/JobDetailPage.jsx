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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
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
  );
};

export default JobDetailPage;
