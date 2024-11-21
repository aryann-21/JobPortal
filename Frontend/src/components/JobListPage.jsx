import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const JobListPage = () => {
  const [jobs, setJobs] = useState([]);

  // Create refs for scrolling
  const aboutUsRef = useRef(null);
  const contactUsRef = useRef(null);
  const topRef = useRef(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("http://localhost:5000/api/jobs", {
          headers: {
            "x-auth-token": token,
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  // Scroll handler
  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-20" ref={topRef}>
      {/* Navbar */}
      <nav className="bg-black text-white py-6 px-8 shadow-md fixed left-0 right-0 top-0 h-24">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between px-4">
          <h1 className="text-3xl font-semibold mb-4 sm:mb-0">JobPortal</h1>
          <ul className="flex flex-wrap justify-center sm:space-x-6 space-y-2 sm:space-y-0 text-lg font-semibold mt-3">
            <li>
              <button
                onClick={() => scrollToSection(topRef)}
                className="hover:text-gray-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(aboutUsRef)}
                className="hover:text-gray-200"
              >
                About Us
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection(contactUsRef)}
                className="hover:text-gray-200"
              >
                Contact
              </button>
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
            <li className="text-red-600">
              <Link to="/" className="hover:text-red-700">
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* About Us Section */}
      <div
        className="container mx-auto py-12 px-4 bg-white shadow-lg rounded-lg my-8"
        ref={aboutUsRef}
      >
        <div className="flex flex-col md:flex-row items-center">
          {/* Image on the Left */}
          <div className="w-full md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Replace with your image URL
              alt="About JobPortal"
              className="w-full h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Text on the Right */}
          <div className="w-full md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold text-center md:text-left text-gray-800 mb-14">
              About Us
            </h2>
            <p className="text-gray-600 text-center w-[560px] md:text-left max-w-3xl mb-10">
              Welcome to JobPortal, your trusted platform for finding the best
              job opportunities. We are dedicated to connecting talented
              individuals with reputable companies across a wide range of
              industries. Our mission is to simplify the job search process,
              making it easier for you to find positions that match your skills
              and aspirations.
            </p>
            <p className="text-gray-600 text-center w-[560px] md:text-left max-w-3xl">
              At JobPortal, we partner with top companies to bring you a diverse
              range of career options. Whether you're a fresh graduate looking
              to kickstart your career or a seasoned professional aiming for new
              challenges, we are here to support your journey. Join our growing
              community and take the next step in your professional life today!
            </p>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="container mx-auto py-8 px-4 bg-white shadow-lg rounded-lg my-8">
        <div className="text-3xl font-bold text-center pt-5 text-gray-800 mb-16">
          Available Jobs
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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

      {/* Contact Form */}
      <div
        className="container mx-auto py-12 px-4 bg-white shadow-lg rounded-lg my-8"
        ref={contactUsRef}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <form className="max-w-xl mx-auto space-y-6">
          <div>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Your Message"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              rows="5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-500"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 JobPortal. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default JobListPage;
