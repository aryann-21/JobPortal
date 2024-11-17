import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/jobs', {
          headers: {
            'x-auth-token': token,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-800">Available Jobs</h2>
        <ul className="space-y-4">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <li key={job._id} className="p-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md">
                <Link
                  to={`/jobs/${job._id}`}
                  className="text-xl font-semibold text-blue-600 hover:underline"
                >
                  {job.title} - <span className="text-gray-700">{job.company}</span>
                </Link>
              </li>
            ))
          ) : (
            <p className="text-center text-gray-600">No jobs available at the moment.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default JobListPage;
