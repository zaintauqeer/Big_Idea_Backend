import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import userRoutes from './src/routes/userRoutes.js';
import logoRoutes from './src/routes/logoRoutes.js';
import videoRoutes from './src/routes/videoRoutes.js';
import visualRoutes from './src/routes/visualRoutes.js';
import aboutRoutes from './src/routes/aboutRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import clientRoutes from './src/routes/clientRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import footerLogoRoutes from './src/routes/footerLogoRoutes.js';
import footerTextRoutes from './src/routes/footerTextRoutes.js';
import portfolioRoutes from './src/routes/portfolioRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: "json" };


await connectDB();


const app = express(); 
app.use(express.json());

app.use(   
  cors({
    origin: "*",      
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/user", userRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/video", videoRoutes);
app.use("/api/visual", visualRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footerLogo", footerLogoRoutes);
app.use("/api/footerText", footerTextRoutes);
app.use("/api/portfolio", portfolioRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req, res) => {
  res.send("API is running ");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});