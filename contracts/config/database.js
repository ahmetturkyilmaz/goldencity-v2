const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const MONGO_URI = process.env.MONGO_URI;

let mongoServer;

const connectDatabase = async () => {
  try {
    let mongoUri = MONGO_URI;

    if (!mongoUri) {
      mongoServer = await MongoMemoryServer.create();
      mongoUri = mongoServer.getUri();
      console.log("In-memory MongoDB started ", mongoUri);
    }

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Mongoose Connected");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};

const closeDatabase = async () => {
  if (mongoServer) {
    await mongoServer.stop();
    console.log("In-memory MongoDB stopped");
  }
  await mongoose.connection.close();
};

module.exports = { connectDatabase, closeDatabase };
