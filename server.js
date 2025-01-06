const express = require("express");
const connectDb = require("./config/db");
const authRoutes=require("./routes/auth");
const app = express();
 // Middleware to parse JSON
 app.use(express.json());

app.use("/auth",authRoutes);
app.get("/health",(req,res)=>{
    return res.send("health route");
})

const startServer = async () => {
    try {
        // Attempt to connect to the database
        await connectDb();
        console.log("Connected to MongoDB successfully");
        // Start the server
        app.listen(3000, () => {
            console.log("App is running on port 3000");
        });
    } catch (error) {
        // Log an error if database connection fails
        console.error("Failed to connect to MongoDB:", error.message);
        process.exit(1); // Exit the application with an error
    }
};

// Start the application
startServer();
