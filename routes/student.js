const {
  getAccountData,
  getAllstudents,
  addInformation,
  addPassword,
} = require("../controllers/account");
const {
  getAuthorisedStudents,
  getStudentId,
  deleteUserInformation,
} = require("../controllers/login");

const router = require("express").Router();

router.get("/", getAllstudents);
router.post("/student", getAuthorisedStudents);
router.post("/student/information", addInformation);
router.post("/student/password", addPassword);
router.get("/account", getAccountData);
router.get("/me", getStudentId);
router.post("/logout", deleteUserInformation);

module.exports = router;
