import { Router } from 'express'
import { redirectController } from '../controllers/redirect.js'
import { alertControleer } from '../controllers/alert.js'
const router = Router()

router.get("/", (req, res) => res.send("Hello!"))
router.get("/test", (req, res) => res.send("Testado!"))

router.get('/alert/:projectName', alertControleer)

// /test
router.get('/:projectName', redirectController)

export default router