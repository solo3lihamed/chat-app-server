
import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import connectToMongoDB from './db/connectToMongoDB.js';



dotenv.config();
const app = express();
const port = process.env.PORT ||3000; 
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
}
);


app.use("/api/auth",authRoutes);

app.listen(port, () => {
    connectToMongoDB();
  console.log(`Server is running at http://localhost:${port}`);
}
);
// Export the app for testing purposes