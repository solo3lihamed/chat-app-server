
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';
import messageRoutes from './routes/message.routes.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
const port = process.env.PORT ||3000; 
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);

app.listen(port, () => {
    connectToMongoDB();
  console.log(`Server is running at http://localhost:${port}`);
}
);
// Export the app for testing purposes