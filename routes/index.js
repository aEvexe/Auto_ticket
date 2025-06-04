const router = require('express').Router()
const driverRouter = require("./drivers.routes")
const busesRouter = require("./buses.routes")
const regionRouter = require("./region.routes")
const districtRouter = require("./district.routes")
const userRouter = require("./user.routes")
const authRouter = require("./auth.routes")
// const userAddressRouter = require("./user-address.routes")
const busDriverRouter = require("./bus-driver.routes")
// const imageRouter = require("./image.routes")
const roleRouter = require("./role.routes")
// const contractRouter = require("./contract.routes")
// const statusRouter = require("./status.routes")
// const paymentRouter = require("./payment.routes")
// const reviewRouter = require("./review.routes")
const userRoleRouter = require("./user-role.routes")

router.use("/driver", driverRouter);
router.use("/buses", busesRouter);
router.use("/region", regionRouter);
router.use("/district", districtRouter);
router.use("/user", userRouter);
router.use("/auth", authRouter);
// router.use("/user-address", userAddressRouter);
router.use("/bus-driver", busDriverRouter);
// router.use("/image", imageRouter);
router.use("/role", roleRouter);
// router.use("/contract", contractRouter);
// router.use("/status", statusRouter);
// router.use("/payment", paymentRouter);
// router.use("/review", reviewRouter);
router.use("/user-role", userRoleRouter);

module.exports = router