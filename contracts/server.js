const app = require('./app');
const { connectDatabase, closeDatabase } = require('./config/database');
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 3099;

// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

connectDatabase().catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(PORT, () => {
    console.log(`Server running`)
});

process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
});

process.on('SIGINT', async () => {
    await closeDatabase();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await closeDatabase();
    process.exit(0);
});
