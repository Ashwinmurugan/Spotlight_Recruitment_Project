import ProductionUser from "../models/productionUser.js"; 

// Automatic Verification
export default async function verifyDirector(req, res) {
  try {
    const { id } = req.user; // Assuming user is authenticated

    const director = await ProductionUser.findById(id);
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    // Check if all required fields are present
    if (
      director.license &&
      director.social_links?.instagram &&
      director.social_links?.youtube &&
      director.social_links?.facebook
    ) {
      director.verified = true;
      await director.save();
      return res
        .status(200)
        .json({ message: "Director verified", verified: true });
    }

    res.status(400).json({
      message:
        "Verification failed. Ensure license and all social links are provided.",
      verified: false,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
}
