import { Router } from 'express';
import { redirectController } from '../controllers/redirect.js';
const router = Router();

router.get("/", (req, res) => res.send("Hello!"))
router.get("/test", (req, res) => res.send("Testado!"))

// /redirect/test
router.get('/redirect/:projectName', redirectController)

// router.get('/alert')

export default router