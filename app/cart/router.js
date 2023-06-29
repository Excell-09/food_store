const router = require("express").Router();
const cartController = require("./controller");
const { policy_check } = require("../../middlewares/middleware");

router.get("/", policy_check("read", "Cart"), cartController.index);
router.put("/", policy_check("update", "Cart"), cartController.update);

module.exports = router;
