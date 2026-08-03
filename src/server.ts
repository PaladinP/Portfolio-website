import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import contactRoutes from "./routes/contactRoutes";
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import dataRoutes from './routes/dataRoutes';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Endpoint (useful for Render deployment)
app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "API is running securely." });
});

// Register Routes
app.use("/api/contact", contactRoutes);
// get projects route
app.use('/api/projects', projectRoutes);
// login admin for portfolio
app.use('/api/auth', authRoutes);
// writes and reads json database
app.use('/api/data', dataRoutes);

// Tell Express to serve the static files from the public folder
app.use(express.static(path.join(__dirname, '../public')));

// Catch-all route: If they visit /admin, let React Router handle it
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
// Start Server
app.listen(PORT, () => {
  console.log(`Server executing on http://localhost:${PORT}`);
});
