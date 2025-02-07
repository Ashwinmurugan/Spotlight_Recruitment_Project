const JobApplication = require("../models/jobApplication");
const Job = require("../models/Job");
const Actor = require("../models/actorUser");

// Apply for a Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const actorId = req.user.id;

    // checking If Job exist
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job Not Found!!" });

    // check if actor already Applied
    const existingApplication = await JobApplication.findOne({
      job: jobId,
      actor: actorId,
    });
    if (existingApplication)
      return res.status(400).json({ message: "Already Applied" });

    // Create job application
    const application = new JobApplication({ job: jobId, actor: actorId });
    await application.save();

    // Update actor's applied jobs **THIS PUSHES jobs INTO user applied_jobs Array**
    await Actor.findByIdAndUpdate(actorId, { $push: { applied_jobs: jobId } });
    res.status(201).json({ message: "Application Submitted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Withdraw Applications
exports.withdrawApplication = async (req, res) => {
  try {
    const { jobId } = req.body;
    const actorId = req.user.id;

    // Checking Whether Application is exist in jobApplication DB
    const application = await JobApplication.findOneAndDelete({
      job: jobId,
      actor: actorId,
    });
    if (!application)
      return res.status(401).json({ message: "Application Not Found" });

    // Remove From actor's Applied Jobs Array
    await Actor.findByIdAndUpdate(actorId, { $pull: { applied_jobs: jobId } });

    res.status(200).json({ message: "Application Withdrawn Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Applications for a specific Job(for Directors)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const applications = await JobApplication.find({ job: jobId }).populate(
      "actor",
      "name email"
    );

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};

// Get Actor's Applied Jobs
exports.getActorApplications = async (req, res) => {
  try {
    const actorId = req.user.id;
    const applications = await JobApplication.find({ actor: actorId }).populate(
      "job",
      "title description"
    );

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server Error!", error });
  }
};
