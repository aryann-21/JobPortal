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
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white py-6 px-8 shadow-md">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
          <h1 className="text-3xl font-semibold mb-4 sm:mb-0">JobPortal</h1>
          <ul className="flex flex-wrap justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-lg font-semibold">
            <li>
              <Link to="/jobs" className="hover:text-gray-200">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-gray-200">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-gray-200">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-gray-200">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-gray-200">
                Jobs
              </Link>
            </li>
            <li className='text-red-600'>
              <Link to="/" className="hover:text-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Job List */}
      <div className="container mx-auto py-8 px-4">
        <div className="text-3xl font-bold text-center pt-5 text-gray-800 mb-10 bg-gray-200 h-20">Available Jobs</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden"
              >
                <img
                  src={job.photo} // Placeholder for missing images
                  alt={job.title}
                  className="w-full h-50 object-cover"
                />
                <div className="p-4 h-32">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {job.title}
                  </h3>
                  <p className="text-gray-600">{job.company}</p>
                  <Link
                    to={`/jobs/${job._id}`}
                    className="inline-block mt-4 text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No jobs available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobListPage;
