import express from 'express';
import { getAllUsersSideBar } from '../controllers/user.controller.js';
import { protectRoutes } from '../middlewares/protectRoutes.js';

const router = express.Router();



router.get('/',protectRoutes, getAllUsersSideBar);


export default router;