const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const uri = "mongodb://localhost:27017/role"; // Replace myDatabase with your DB name

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Error connecting to the local database:", error.message);
        process.exit(1); // Exit the application on failure
    }
};

module.exports = connectDb;
