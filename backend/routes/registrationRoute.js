import express from "express";
import upload from "../middleware/upload.js";
import {
  createRegistration,
  getAllRegistrations,
  getRegistrationById,
  deleteRegistration,
} from "../controllers/registrationController.js";

const router = express.Router();

router.post(
  "/",
  upload.fields([
    {
      name: "photo",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  createRegistration
);

router.get("/", getAllRegistrations);

router.get("/:id", getRegistrationById);

router.delete("/:id", deleteRegistration);

export default router;