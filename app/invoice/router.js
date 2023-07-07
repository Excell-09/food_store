const router = require("express").Router();

const { policy_check } = require("../../middlewares/middleware");
const invoiceController = require("./controller");

router.get("/", policy_check("view", "Invoice"), invoiceController.index);
router.get("/:order_id", invoiceController.view);

module.exports = router;
