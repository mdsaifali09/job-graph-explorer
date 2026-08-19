import express from "express";

import {
  getAllDevelopers,
  getDeveloperById,
  getDevelopersBySkill,
  getDevelopersByTechnology,
  getRecommendations,
} from "../controllers/developerController.js";

const router = express.Router();

router.get("/", getAllDevelopers);

router.get("/skill/:skill", getDevelopersBySkill);

router.get("/technology/:technology", getDevelopersByTechnology);

router.get("/:id/recommendations", getRecommendations);

router.get("/:id", getDeveloperById);

export default router;