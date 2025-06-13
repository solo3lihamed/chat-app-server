import express from 'express';
import { sendMessage , getMessages} from '../controllers/message.controller.js';
import { protectRoutes } from '../middlewares/protectRoutes.js';



const router = express.Router();



router.post("/send/:userId", protectRoutes,sendMessage);
// router.get("/get/:id", getMessages);
router.get("/:userId", protectRoutes, getMessages);

export default router;


