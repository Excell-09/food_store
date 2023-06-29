const router = require("express").Router();
const { policy_check } = require("../../middlewares/middleware");

const orderController = require("./controller");

router.get("/", policy_check("view", "Order"), orderController.index);
router.post("/", policy_check("create", "Order"), orderController.store);

module.exports = router;
