const router = require("express").Router();

const {policy_check} = require("../../middlewares/middleware");
const invoiceController = require("./controller");

router.get("/", policy_check("view", "Invoice"), invoiceController.index);
router.get(
    "/invoices",
    policy_check("view", "Invoice"),
    invoiceController.getAllInvoices
);
router.get("/:order_id", invoiceController.view);
router.put("/:order_id", invoiceController.update);

module.exports = router;
