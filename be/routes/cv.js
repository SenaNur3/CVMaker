const express = require('express');
const cvController = require('../controllers/cv.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();

router.post("/", cvController.save);
router.get("/", cvController.index);
router.get("/:username", cvController.show);
router.post("/:username", checkAuthMiddleware.checkAuth, cvController.update);
router.delete("/:username", checkAuthMiddleware.checkAuth, cvController.destroy);

module.exports = router;
