require("dotenv").config();
const { MongoClient } = require("mongodb");
const { tasks, users, excuses, motivations, stats } = require("./seed-data");

// Get MongoDB URI from environment variables or use the default one
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://your_username:your_password@your_cluster.mongodb.net/procrastinator_todo?retryWrites=true&w=majority";

// Display a warning if using the default URI
if (!process.env.MONGO_URI) {
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Warning: Using default MongoDB URI. Set MONGO_URI in .env file for your actual connection string."
  );
  console.warn(
    "\x1b[33m%s\x1b[0m",
    "Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/procrastinator_todo?retryWrites=true&w=majority"
  );
}

async function seedDatabase() {
  let client;

  try {
    // Connect to MongoDB Atlas
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Get database reference
    const db = client.db("procrastinator_todo");

    // Drop existing collections if they exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    for (const name of ["tasks", "users", "excuses", "motivations", "stats"]) {
      if (collectionNames.includes(name)) {
        await db.collection(name).drop();
        console.log(`Dropped existing collection: ${name}`);
      }
    }

    // Insert data into collections
    if (tasks.length > 0) {
      const tasksResult = await db.collection("tasks").insertMany(tasks);
      console.log(
        `Inserted ${tasksResult.insertedCount} documents into tasks collection`
      );
    }

    if (users.length > 0) {
      const usersResult = await db.collection("users").insertMany(users);
      console.log(
        `Inserted ${usersResult.insertedCount} documents into users collection`
      );
    }

    if (excuses.length > 0) {
      const excusesResult = await db.collection("excuses").insertMany(excuses);
      console.log(
        `Inserted ${excusesResult.insertedCount} documents into excuses collection`
      );
    }

    if (motivations.length > 0) {
      const motivationsResult = await db
        .collection("motivations")
        .insertMany(motivations);
      console.log(
        `Inserted ${motivationsResult.insertedCount} documents into motivations collection`
      );
    }

    if (stats.length > 0) {
      const statsResult = await db.collection("stats").insertMany(stats);
      console.log(
        `Inserted ${statsResult.insertedCount} documents into stats collection`
      );
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
      console.log("MongoDB connection closed");
    }
  }
}

// Run the function
seedDatabase().catch(console.error);
