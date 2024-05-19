const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const { createHistory, updateHistory, fetchHistory , getSummury, getPageNumber} = require("../controllers/historyController");
const { authUser } = require("../controllers/userController");

const router = express.Router()

router.post('/create',protect,createHistory)
router.patch("/update",protect,updateHistory)
router.get("/get",protect,fetchHistory)
router.post("/get-summury",protect,getSummury)
router.post("/get-pageno",protect,getPageNumber)

module.exports = router;