const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDb = async () => {
    try {

        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

    } catch (error) {
        console.error("Error connecting to the local database:", error.message);
        process.exit(1); // Exit the application on failure
    }
};

module.exports = connectDb;
