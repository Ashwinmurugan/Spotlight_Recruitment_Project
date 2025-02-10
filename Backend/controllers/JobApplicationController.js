import JobApplication from "../models/jobApplication.js"; 
import Job from "../models/Jobs.js";  
import ActorUser from "../models/actorUser.js"; 

// Apply for a Job
export async function applyForJob(req, res) {
  try {
    const { jobId } = req.body;
    const actorId = req.user.id;

    // Checking if Job exists
    const job = await Job.findById(jobId); // Use findById directly on Job model
    if (!job) return res.status(404).json({ message: "Job Not Found!!" });

    // Check if actor has already applied
    const existingApplication = await JobApplication.findOne({
      jobId, 
      actorId, 
    });
    if (existingApplication)
      return res.status(400).json({ message: "Already Applied" });

    // Create job application
    const application = new JobApplication({ jobId, actorId });
    await application.save();

    // Update actor's applied jobs **THIS PUSHES jobs INTO user applied_jobs Array**
    await ActorUser.findByIdAndUpdate(actorId, { $push: { applied_jobs: jobId } });
    res.status(201).json({ message: "Application Submitted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

// Withdraw Applications
export async function withdrawApplication(req, res) {
  try {
    const { jobId } = req.body;
    const actorId = req.user.id;

    // Checking whether Application exists in jobApplication DB
    const application = await JobApplication.findOneAndDelete({
      jobId,
      actorId,
    });
    if (!application)
      return res.status(401).json({ message: "Application Not Found" });

    // Remove from actor's Applied Jobs Array
    await ActorUser.findByIdAndUpdate(actorId, { $pull: { applied_jobs: jobId } });

    res.status(200).json({ message: "Application Withdrawn Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}

// Get Applications for a specific Job(for Directors)
export async function getApplicationsForJob(req, res) {
  try {
    const { jobId } = req.params;
    const applications = await JobApplication.find({ jobId })
      .populate("actorId", "name email");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}

// Get Actor's Applied Jobs
export async function getActorApplications(req, res) {
  try {
    const actorId = req.user.id;
    const applications = await JobApplication.find({ actorId })
      .populate("jobId", "title description");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
}
