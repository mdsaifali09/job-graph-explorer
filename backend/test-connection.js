import neo4j from "neo4j-driver";
import dotenv from "dotenv";

dotenv.config();

const driver = neo4j.driver(
  "bolt+s://db-7543fa47.databases.cognodb.com",
  neo4j.auth.basic(
    "cognodb",
    process.env.COGNODB_PASSWORD
  )
);

try {
  await driver.verifyConnectivity();
  console.log("✅ CognoDB Connected Successfully!");
} catch (error) {
  console.error("❌ Connection Failed");
  console.error(error);
} finally {
  await driver.close();
}