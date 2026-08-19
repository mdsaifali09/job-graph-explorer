export const getAllDevelopersQuery = `
  MATCH (d:Developer)
  RETURN d
  ORDER BY d.name
`;

export const getDeveloperByIdQuery = `
  MATCH (d:Developer {id: $id})
  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
  RETURN d,
         collect(DISTINCT s) AS skills,
         collect(DISTINCT p) AS projects
`;

export const getDevelopersBySkillQuery = `
  MATCH (d:Developer)-[:HAS_SKILL]->(s:Skill {name: $skill})
  RETURN d, s
  ORDER BY d.name
`;

export const getDevelopersByTechnologyQuery = `
  MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology {name: $technology})
  RETURN DISTINCT d, p, t
  ORDER BY d.name
`;

export const getDeveloperRecommendationsQuery = `
  MATCH (d:Developer {id: $id})-[:HAS_SKILL]->(s:Skill)
  MATCH (other:Developer)-[:HAS_SKILL]->(s)
  WHERE other.id <> d.id
  WITH other, count(DISTINCT s) AS commonSkills
  RETURN other, commonSkills
  ORDER BY commonSkills DESC
`;

export const getRelatedDevelopersQuery = `
  MATCH (d1:Developer)-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(d2:Developer)
  WHERE d1.id <> d2.id
  WITH d1, d2, collect(s.name) AS commonSkills
  RETURN d1.name AS developer,
         d2.name AS relatedDeveloper,
         commonSkills
  ORDER BY size(commonSkills) DESC
  LIMIT 20
`;