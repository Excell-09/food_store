const router = require("express").Router();
const categoryController = require("./controller");
const { policy_check } = require("../../middlewares/middleware");

router.get("/", categoryController.index);
router.post("/", policy_check("create", "Category"), categoryController.store);
router.put("/:id", policy_check("update", "Category"), categoryController.update);
router.delete("/:id", policy_check("delete", "Category"), categoryController.destroy);

module.exports = router;
