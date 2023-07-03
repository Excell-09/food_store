const router = require("express").Router();
const { policy_check } = require("../../middlewares/middleware");

const deliveryAddressController = require("./controller");

router.get("/", policy_check("view", "DeliveryAddress"), deliveryAddressController.index);
router.post("/", policy_check("create", "DeliveryAddress"), deliveryAddressController.store);
router.put("/:id", deliveryAddressController.update);
router.delete("/:id", deliveryAddressController.destroy);

module.exports = router;
