import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/dbConnection.js';
// import authRouter from "./routes/user.route.js"
import productRoutes from './routes/product.routes.js'
import { errorHandler, notFound } from './middlewares/errorHandler.js';
dotenv.config();

const PORT = process.env.PORT || 3300

const app = express();
dbConnection();

// middlewares 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use("/api/auth",authRouter);
app.use("/api/v1",productRoutes);




// app.use(notFound)
app.get("*", notFound);

// app.use(errorHandler);
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});