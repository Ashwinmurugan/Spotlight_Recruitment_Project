import Job from "../models/Jobs.js"; 
import JobApplication from "../models/jobApplication.js"; 

// Creating a Job (Only Directors can Post Jobs)
export async function createJob(req, res) {
  try {
    // Ensure that only directors can post jobs
    if (req.user.role !== "director") {
      return res.status(403).json({ message: "Only Directors can post Jobs" });
    }

    const { title, description, requirements, deadline } = req.body;

    // Create a new job and save it to the database
    const newJob = new Job({
      directorId: req.user.id,
      title,
      description,
      requirements,
      deadline,
    });

    await newJob.save();

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

// Get All Jobs
export async function getAllJobs(req, res) {
  try {
    const jobs = await Job.find(); // Retrieve all jobs
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

// Jobs Posted by a Specific Director
export async function getDirectorJobs(req, res) {
  try {
    // Check if the user is a director or production team member
    if (req.user.role !== "director" && req.user.role !== "production team") {
      return res.status(403).json({ message: "Unauthorized access!" });
    }

    // Get jobs posted by the director or production team member
    const jobs = await Job.find({ directorId: req.user.id });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

// Apply for a job (Only Actors can apply)
export async function applyJob(req, res) {
  try {
    // Ensure that only actors can apply for jobs
    if (req.user.role !== "actor") {
      return res
        .status(403)
        .json({ message: "Only Actors can apply for jobs" });
    }

    const { jobId } = req.body;

    // Check if the actor has already applied for this job
    const existingApplication = await JobApplication.findOne({
      jobId,
      actorId: req.user.id,
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    // Create a new job application
    const newApplication = new JobApplication({
      jobId,
      actorId: req.user.id,
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

// Get Applications for a Job (Only Directors can view applicants)
export async function getJobApplications(req, res) {
  try {
    // Ensure that only directors or production team members can view applications
    if (req.user.role !== "director" && req.user.role !== "production team") {
      return res
        .status(403)
        .json({ message: "Only directors can view job applications" });
    }

    const { jobId } = req.params;

    // Find the job by ID to ensure the director has permission to view applications
    const job = await Job.findById(jobId);
    if (!job || job.directorId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this job's applications" });
    }

    // Get all applications for the job and populate actor details (name, email)
    const applications = await JobApplication.find({ jobId }).populate(
      "actorId",
      "name email"
    );

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}
