const router = require("express").Router();
const auth = require("../middleware/auth");
const authRoute = require("./auth");
const userRoute = require("./user");
const AdminAttendanceRoute = require("./admin-attendance");
const studentAttendanceRoutes = require("./student-attendance");

router.use("/api/v1/auth", authRoute);

router.use("/api/v1/users", auth, userRoute);

router.use("/api/v1/admin/attendance", auth, AdminAttendanceRoute);

router.use("/api/v1/student/attendance", auth, studentAttendanceRoutes);

module.exports = router;
