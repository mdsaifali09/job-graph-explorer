import driver from "../config/db.js";

import {
  getAllDevelopersQuery,
  getDeveloperByIdQuery,
  getDevelopersBySkillQuery,
  getDevelopersByTechnologyQuery,
  getDeveloperRecommendationsQuery,
} from "../queries/graphQueries.js";

export const getAllDevelopers = async (req, res) => {
  const session = driver.session();

  try {
    const result = await session.run(getAllDevelopersQuery);

    const developers = result.records.map((record) => {
      const developer = record.get("d");

      return developer.properties;
    });

    res.json({
      success: true,
      count: developers.length,
      data: developers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch developers",
    });
  } finally {
    await session.close();
  }
};

export const getDeveloperById = async (req, res) => {
  const session = driver.session();

  try {
    const { id } = req.params;

    const result = await session.run(getDeveloperByIdQuery, {
      id,
    });

    if (result.records.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Developer not found",
      });
    }

    const record = result.records[0];

    const developer = record.get("d").properties;

    const skills = record
      .get("skills")
      .map((skill) => skill.properties);

    const projects = record
      .get("projects")
      .map((project) => project.properties);

    res.json({
      success: true,
      data: {
        developer,
        skills,
        projects,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch developer",
    });
  } finally {
    await session.close();
  }
};

export const getDevelopersBySkill = async (req, res) => {
  const session = driver.session();

  try {
    const { skill } = req.params;

    const result = await session.run(getDevelopersBySkillQuery, {
      skill,
    });

    const developers = result.records.map((record) => ({
      developer: record.get("d").properties,
      skill: record.get("s").properties,
    }));

    res.json({
      success: true,
      count: developers.length,
      data: developers,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to search developers",
    });
  } finally {
    await session.close();
  }
};

export const getDevelopersByTechnology = async (req, res) => {
  const session = driver.session();

  try {
    const { technology } = req.params;

    const result = await session.run(
      getDevelopersByTechnologyQuery,
      {
        technology,
      }
    );

    const data = result.records.map((record) => ({
      developer: record.get("d").properties,
      project: record.get("p").properties,
      technology: record.get("t").properties,
    }));

    res.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to search technology",
    });
  } finally {
    await session.close();
  }
};

export const getRecommendations = async (req, res) => {
  const session = driver.session();

  try {
    const { id } = req.params;

    const result = await session.run(
      getDeveloperRecommendationsQuery,
      { id }
    );

    const recommendations = result.records.map((record) => ({
      developer: record.get("other").properties,
      commonSkills: record.get("commonSkills").toNumber(),
    }));

    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate recommendations",
    });
  } finally {
    await session.close();
  }
};