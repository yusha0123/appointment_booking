const express = require("express");
const {
  getAllData,
  createData,
  updateByid,
  deleteByid,
} = require("../controllers/index");

const router = express.Router();

router.route("/").get(getAllData);
router.route("/").post(createData);
router.route("/:id").put(updateByid);
router.route("/:id").delete(deleteByid);

module.exports = router;
