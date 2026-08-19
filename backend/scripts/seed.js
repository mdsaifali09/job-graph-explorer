import dotenv from "dotenv";
import neo4j from "neo4j-driver";

dotenv.config();

const driver = neo4j.driver(
  process.env.COGNODB_URI,
  neo4j.auth.basic(
    process.env.COGNODB_USERNAME,
    process.env.COGNODB_PASSWORD
  )
);

const session = driver.session();

try {
  console.log("🌱 Seeding database...");

  await session.run(`
    MATCH (n)
    DETACH DELETE n
  `);

  await session.run(`
    CREATE
      (saif:Developer {id: "dev1", name: "Saif Ali"}),
      (rahul:Developer {id: "dev2", name: "Rahul Sharma"}),
      (aman:Developer {id: "dev3", name: "Aman Verma"}),

      (react:Skill {name: "React"}),
      (node:Skill {name: "Node.js"}),
      (mongodb:Skill {name: "MongoDB"}),
      (javascript:Skill {name: "JavaScript"}),
      (python:Skill {name: "Python"}),

      (movie:Project {id: "project1", name: "Movie Booking App"}),
      (medicine:Project {id: "project2", name: "Medicine Delivery App"}),
      (task:Project {id: "project3", name: "Task Management App"}),

      (mongoTech:Technology {name: "MongoDB"}),
      (expressTech:Technology {name: "Express.js"}),
      (reactTech:Technology {name: "React"}),
      (nodeTech:Technology {name: "Node.js"}),

      (saif)-[:HAS_SKILL]->(react),
      (saif)-[:HAS_SKILL]->(node),
      (saif)-[:HAS_SKILL]->(mongodb),
      (saif)-[:HAS_SKILL]->(javascript),

      (rahul)-[:HAS_SKILL]->(react),
      (rahul)-[:HAS_SKILL]->(javascript),
      (rahul)-[:HAS_SKILL]->(python),

      (aman)-[:HAS_SKILL]->(node),
      (aman)-[:HAS_SKILL]->(mongodb),
      (aman)-[:HAS_SKILL]->(javascript),

      (saif)-[:WORKED_ON]->(movie),
      (saif)-[:WORKED_ON]->(medicine),

      (rahul)-[:WORKED_ON]->(task),

      (aman)-[:WORKED_ON]->(movie),

      (movie)-[:USES]->(reactTech),
      (movie)-[:USES]->(nodeTech),
      (movie)-[:USES]->(mongoTech),

      (medicine)-[:USES]->(reactTech),
      (medicine)-[:USES]->(expressTech),
      (medicine)-[:USES]->(mongoTech),

      (task)-[:USES]->(reactTech),
      (task)-[:USES]->(nodeTech)
  `);

  console.log("✅ Database seeded successfully!");
} catch (error) {
  console.error("❌ Seed failed:", error);
} finally {
  await session.close();
  await driver.close();
}