const router = require("express").Router();
const multer = require("multer");
const os = require("os");
const { policy_check } = require("../../middlewares/middleware");

const productController = require("./controller");
const upload = multer({ dest: os.tmpdir() });

router.get("/", productController.index);
router.post("/", upload.single("image"), policy_check("create", "Product"), productController.store);
router.put("/:id", upload.single("image"), policy_check("update", "Product"), productController.update);
router.delete("/:id", upload.single("image"), policy_check("delete", "Product"), productController.destroy);

module.exports = router;
