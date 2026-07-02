import Registration from "../models/Registration.js";

export const createRegistration = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      college,
      course,
      semester,
      agree,
    } = req.body;

    const skills = req.body.skills
      ? JSON.parse(req.body.skills)
      : [];

    const photo = req.files?.photo
      ? req.files.photo[0].filename
      : "";

    const resume = req.files?.resume
      ? req.files.resume[0].filename
      : "";

    const registration = await Registration.create({
      fullName,
      email,
      phone,
      gender,
      dob,
      address,
      college,
      course,
      semester,
      skills,
      photo,
      resume,
      agree,
    });

    res.status(201).json({
      success: true,
      message: "Registration Successful",
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    res.status(200).json({
      success: true,
      data: registration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found",
      });
    }

    await registration.deleteOne();

    res.status(200).json({
      success: true,
      message: "Registration Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};