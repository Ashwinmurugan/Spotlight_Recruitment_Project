const Job = require("../models/Jobs");
const JobApplication = require("../models/jobApplication");

// Creating a Job (Only For Directors can Post Jobs)

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "director")
      return res.status(403).json({ message: "Only Directors can post Jobs" });

    const { title, description, requirements, deadline } = req.body;
    const newJob = new Job({
      directorId: req.user.id,
      title,
      description,
      requirements,
      deadline,
    });
    await newJob.save();

    res.status(201).json({ message: "Job posted Successfullt", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

// Get All Jobs
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error!!", error });
  }
};

// Jobs Posted By Specific Director

exports.getDirectorJobs = async (req, res) => {
  try {
    if (req.user.role !== "director" || req.user.role !== "production team")
      return res.status(403).json({ message: "Unauthorized access!" });

    const jobs = await Job.find({ directorId: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ mesaage: "Server Error", error });
  }
};

// Apply for a job(Only Actors can apply)
exports.applyJob = async (req, res) => {
  try {
    if (req.user.role !== "actor")
      return res
        .status(403)
        .json({ message: "Only Actors can apply for jobs" });

    const { jobId } = req.body;
    const existingApplication = await JobApplication.findOne({
      jobId,
      actorId: req.user.id,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }
    const newApplication = new JobApplication({
      jobId,
      actorId: req.user.id,
    });
    await newApplication.save();
    res.status(201).json({ message: "Application submitted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Application for a job (Only Directors can view Applicants)
exports.getJobApplications = async (req, res) => {
  try {
    if (req.user.role !== "director" || req.user.role !== "production team")
      return res
        .status(403)
        .json({ message: "Only directors can view job applications" });

    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job || job.directorId.toString() !== req.user.id)
      return res
        .status(403)
        .json({ message: "Unauthorized access to this job's applications" });

    const applications = await JobApplication.find({ jobId }).populate(
      "actorId",
      "name email"
    );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
