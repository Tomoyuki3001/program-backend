const router = require("express").Router();
const {
  getInstructorAvailability,
  getAllOfInstructors,
  bookNewTimeSpot,
  getAllOfAppointments,
  cancelSpot,
} = require("../controllers/schedule");

router.post("/", getInstructorAvailability);
router.get("/instructors", getAllOfInstructors);
router.post("/book", bookNewTimeSpot);
router.post("/appointments", getAllOfAppointments);
router.post("/cancel", cancelSpot);

module.exports = router;
