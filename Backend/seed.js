const mongoose = require('mongoose');
const Job = require('./models/jobModel');

// Replace with your MongoDB URI
mongoose.connect('mongodb://localhost:27017/jobPortal');

const jobs = [
  { title: 'Software Engineer', company: 'Google', description: 'Develop software', location: 'San Francisco' },
  { title: 'Product Manager', company: 'Amazon', description: 'Manage product lifecycle', location: 'Seattle' },
  { title: 'Data Analyst', company: 'Facebook', description: 'Analyze data', location: 'Menlo Park' },
  { title: 'UI/UX Designer', company: 'Apple', description: 'Design user interfaces', location: 'Cupertino' },
  { title: 'DevOps Engineer', company: 'Microsoft', description: 'Maintain infrastructure', location: 'Redmond' },
  { title: 'Marketing Specialist', company: 'Tesla', description: 'Develop marketing strategies', location: 'Palo Alto' },
  { title: 'Sales Representative', company: 'Netflix', description: 'Handle client sales', location: 'Los Angeles' },
  { title: 'Web Developer', company: 'Spotify', description: 'Develop websites', location: 'New York' },
  { title: 'HR Manager', company: 'IBM', description: 'Handle employee relations', location: 'Armonk' },
  { title: 'Cybersecurity Expert', company: 'Oracle', description: 'Ensure cybersecurity', location: 'Austin' },
];

const seedJobs = async () => {
  try {
    await Job.deleteMany();  // Clear existing jobs
    await Job.insertMany(jobs);  // Insert new job listings
    console.log('Job listings added!');
  } catch (err) {
    console.error('Error seeding jobs:', err);
  } finally {
    mongoose.connection.close();  // Close the connection
  }
};

seedJobs();
