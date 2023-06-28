const router = require("express").Router();
const tagController = require("./controller");
const { policy_check } = require("../../middlewares/middleware");

router.get("/", tagController.index);
router.post("/", policy_check("create", "Tag"), tagController.store);
router.put("/:id", policy_check("update", "Tag"), tagController.update);
router.delete("/:id", policy_check("delete", "Tag"), tagController.destroy);

module.exports = router;
