const router = require("express").Router();

const invoiceController = require("./controller");

router.get("/:order_id", invoiceController.index);

module.exports = router;
