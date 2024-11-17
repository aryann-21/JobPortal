const express = require('express');
const Job = require('../models/jobModel');
const { verifyToken } = require('./authRoutes');

const router = express.Router();

// Route to get all available jobs (requires verification)
router.get('/', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
});

// Route to get a specific job by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
});

// Route to apply for a job
router.post('/:id/apply', verifyToken, async (req, res) => {
  const { name, email, resume } = req.body;
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }

    // Here, you can save the application details in a database or send an email
    console.log('Job Application Received:', {
      jobTitle: job.title,
      applicantName: name,
      applicantEmail: email,
      resumeText: resume,
    });

    res.status(200).json({ msg: 'Application submitted successfully!' });
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error });
  }
});

module.exports = router;
